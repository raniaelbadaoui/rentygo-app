<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $query = Vehicle::with('category')->where('available', true);

        // Filtres CORRIGÉS
        if ($request->has('category') && $request->category != '' && $request->category != 'null') {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->category . '%');
            });
        }

        if ($request->has('brand') && $request->brand != '' && $request->brand != 'null') {
            $query->where('brand', 'like', '%' . $request->brand . '%');
        }

        if ($request->has('transmission') && $request->transmission != '' && $request->transmission != 'null') {
            $query->where('transmission', $request->transmission);
        }

        if ($request->has('min_price') && $request->min_price != '' && $request->min_price != 'null') {
            $query->where('price_per_day', '>=', (float) $request->min_price);
        }

        if ($request->has('max_price') && $request->max_price != '' && $request->max_price != 'null') {
            $query->where('price_per_day', '<=', (float) $request->max_price);
        }

        // Retirer la vérification de dates temporairement (cause problème)
        // if ($request->has(['start_date', 'end_date'])) {
        //     ... code commenté ...
        // }

        $vehicles = $query->paginate(12);

        return response()->json($vehicles);
    }

    public function show($id)
    {
        $vehicle = Vehicle::with('category')->findOrFail($id);
        return response()->json($vehicle);
    }

    // Méthodes ADMIN (garder tel quel)
    public function store(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $validator = Validator::make($request->all(), [
            'model' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:' . date('Y'),
            'category_id' => 'required|exists:categories,id',
            'price_per_day' => 'required|numeric|min:0',
            'fuel_type' => 'required|in:essence,diesel,electrique,hybride',
            'transmission' => 'required|in:manuelle,automatique',
            'seats' => 'required|integer|min:1|max:9',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $vehicle = Vehicle::create($request->all());

        return response()->json([
            'vehicle' => $vehicle,
            'message' => 'Véhicule créé avec succès'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $vehicle = Vehicle::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'model' => 'sometimes|string|max:255',
            'price_per_day' => 'sometimes|numeric|min:0',
            'available' => 'sometimes|boolean',
            'image_url' => 'sometimes|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $vehicle->update($request->all());

        return response()->json([
            'vehicle' => $vehicle,
            'message' => 'Véhicule mis à jour'
        ]);
    }

    public function destroy($id, Request $request)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $vehicle = Vehicle::findOrFail($id);
        $vehicle->delete();

        return response()->json(['message' => 'Véhicule supprimé']);
    }
}