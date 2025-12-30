<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Vehicle;
use App\Models\Insurance;
use App\Models\Option;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isAdmin()) {
            $bookings = Booking::with(['user', 'vehicle', 'insurance', 'options'])
                ->orderBy('created_at', 'desc')
                ->paginate(20);
        } else {
            $bookings = Booking::with(['vehicle', 'insurance', 'options'])
                ->where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(10);
        }

        return response()->json($bookings);
    }

    public function show($id, Request $request)
    {
        $booking = Booking::with(['user', 'vehicle', 'insurance', 'options'])->findOrFail($id);
        
        if (!$request->user()->isAdmin() && $booking->user_id != $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        return response()->json($booking);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'vehicle_id' => 'required|exists:vehicles,id',
            'insurance_id' => 'required|exists:insurances,id',
            'start_date' => 'required|date|after:today',
            'end_date' => 'required|date|after:start_date',
            'pickup_location' => 'required|string|max:255',
            'dropoff_location' => 'required|string|max:255',
            'option_ids' => 'nullable|array',
            'option_ids.*' => 'exists:options,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Vérifier disponibilité du véhicule
        $isAvailable = Booking::where('vehicle_id', $request->vehicle_id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->where(function($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                      ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                      ->orWhere(function($q) use ($request) {
                          $q->where('start_date', '<=', $request->start_date)
                            ->where('end_date', '>=', $request->end_date);
                      });
            })->doesntExist();

        if (!$isAvailable) {
            return response()->json(['message' => 'Véhicule non disponible pour ces dates'], 409);
        }

        // Calcul des prix
        $vehicle = Vehicle::findOrFail($request->vehicle_id);
        $insurance = Insurance::findOrFail($request->insurance_id);
        
        $start = Carbon::parse($request->start_date);
        $end = Carbon::parse($request->end_date);
        $days = $start->diffInDays($end) + 1;

        $vehiclePrice = $vehicle->price_per_day * $days;
        $insurancePrice = $insurance->daily_rate * $days;
        
        $optionsPrice = 0;
        if ($request->has('option_ids')) {
            $options = Option::whereIn('id', $request->option_ids)->get();
            $optionsPrice = $options->sum('daily_rate') * $days;
        }

        $totalPrice = $vehiclePrice + $insurancePrice + $optionsPrice;

        // Création de la réservation
        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'vehicle_id' => $request->vehicle_id,
            'insurance_id' => $request->insurance_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'days' => $days,
            'vehicle_price' => $vehiclePrice,
            'insurance_price' => $insurancePrice,
            'options_price' => $optionsPrice,
            'total_price' => $totalPrice,
            'status' => 'pending',
            'pickup_location' => $request->pickup_location,
            'dropoff_location' => $request->dropoff_location,
        ]);

        // Attacher les options
        if ($request->has('option_ids')) {
            $booking->options()->attach($request->option_ids);
        }

        return response()->json([
            'booking' => $booking->load(['vehicle', 'insurance', 'options']),
            'message' => 'Réservation créée avec succès'
        ], 201);
    }

    public function cancel($id, Request $request)
    {
        $booking = Booking::findOrFail($id);

        if (!$request->user()->isAdmin() && $booking->user_id != $request->user()->id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        if ($booking->status != 'pending') {
            return response()->json(['message' => 'Impossible d\'annuler cette réservation'], 400);
        }

        $booking->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Réservation annulée']);
    }
}