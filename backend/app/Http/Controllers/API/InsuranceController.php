<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Insurance;
use Illuminate\Http\Request;

class InsuranceController extends Controller
{
    public function index()
    {
        // Retourne TOUTES les assurances actives
        $insurances = Insurance::where('is_active', true)
            ->orWhereNull('is_active') // Si le champ n'existe pas
            ->get();
        
        return response()->json($insurances);
    }

    public function show($id)
    {
        $insurance = Insurance::findOrFail($id);
        return response()->json($insurance);
    }
}