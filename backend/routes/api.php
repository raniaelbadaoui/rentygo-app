<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\VehicleController;
use App\Http\Controllers\API\BookingController;
use App\Http\Controllers\API\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes véhicules (accessibles sans auth)
Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{id}', [VehicleController::class, 'show']);

// Routes données publiques (accessibles sans auth pour le processus booking)
Route::get('/categories', function() {
    return \App\Models\Category::all();
});

Route::get('/insurances', function() {
    return \App\Models\Insurance::all();
});

Route::get('/options', function() {
    return \App\Models\Option::all();
});

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    // Réservations utilisateur
    Route::apiResource('bookings', BookingController::class)->except(['update', 'destroy']);
    Route::post('/bookings/{id}/cancel', [BookingController::class, 'cancel']);
    
    // Check disponibilité véhicule
    Route::get('/vehicles/{id}/availability', [VehicleController::class, 'checkAvailability']);
});

// Routes ADMIN (vérification du rôle dans les controllers)
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboardStats']);
    
    // Gestion véhicules
    Route::post('/vehicles', [VehicleController::class, 'store']);
    Route::put('/vehicles/{id}', [VehicleController::class, 'update']);
    Route::delete('/vehicles/{id}', [VehicleController::class, 'destroy']);
    
    // Gestion utilisateurs
    Route::get('/users', [AdminController::class, 'manageUsers']);
    Route::put('/users/{id}/role', [AdminController::class, 'updateUserRole']);
    
    // Gestion réservations
    Route::get('/bookings', [AdminController::class, 'allBookings']);
    Route::put('/bookings/{id}/status', [AdminController::class, 'updateBookingStatus']);
    
    // Gestion assurances & options
    // Route::apiResource('insurances', \App\Http\Controllers\API\InsuranceController::class);
    // Route::apiResource('options', \App\Http\Controllers\API\OptionController::class);
    
    // Routes futures pour booking vehicles page (si besoin backend)
    // Route::get('/booking/vehicles', [VehicleController::class, 'bookingIndex']);
});