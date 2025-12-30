<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!$request->user()->isAdmin()) {
                return response()->json(['message' => 'Accès non autorisé'], 403);
            }
            return $next($request);
        });
    }

    public function dashboardStats()
    {
        $stats = [
            'total_bookings' => Booking::count(),
            'pending_bookings' => Booking::where('status', 'pending')->count(),
            'active_bookings' => Booking::whereIn('status', ['confirmed'])->count(),
            'total_users' => User::count(),
            'total_vehicles' => Vehicle::count(),
            'available_vehicles' => Vehicle::where('available', true)->count(),
            'total_revenue' => Booking::where('status', 'confirmed')->sum('total_price'),
            'monthly_revenue' => Booking::where('status', 'confirmed')
                ->whereMonth('created_at', now()->month)
                ->sum('total_price'),
        ];

        // Véhicules les plus populaires
        $popularVehicles = Booking::select('vehicle_id', DB::raw('COUNT(*) as bookings_count'))
            ->with('vehicle')
            ->groupBy('vehicle_id')
            ->orderBy('bookings_count', 'desc')
            ->limit(5)
            ->get();

        // Réservations récentes
        $recentBookings = Booking::with(['user', 'vehicle'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'stats' => $stats,
            'popular_vehicles' => $popularVehicles,
            'recent_bookings' => $recentBookings,
        ]);
    }

    public function manageUsers(Request $request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        $users = $query->paginate(15);

        return response()->json($users);
    }

    public function updateUserRole(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        
        $request->validate([
            'role' => 'required|in:admin,user'
        ]);

        $user->update(['role' => $request->role]);

        return response()->json([
            'user' => $user,
            'message' => 'Rôle utilisateur mis à jour'
        ]);
    }

    public function allBookings(Request $request)
    {
        $query = Booking::with(['user', 'vehicle', 'insurance']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $bookings = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($bookings);
    }

    public function updateBookingStatus(Request $request, $bookingId)
    {
        $booking = Booking::findOrFail($bookingId);

        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed'
        ]);

        $booking->update(['status' => $request->status]);

        return response()->json([
            'booking' => $booking,
            'message' => 'Statut de réservation mis à jour'
        ]);
    }
}