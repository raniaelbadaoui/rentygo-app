<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        $currentYear = date('Y');

        if ($this->isMethod('post')) {
            return [
                'model' => 'required|string|max:255',
                'brand' => 'required|string|max:255',
                'year' => "required|integer|min:2000|max:{$currentYear}",
                'category_id' => 'required|exists:categories,id',
                'price_per_day' => 'required|numeric|min:0|max:10000',
                'fuel_type' => 'required|in:essence,diesel,electrique,hybride',
                'transmission' => 'required|in:manuelle,automatique',
                'seats' => 'required|integer|min:1|max:9',
                'description' => 'nullable|string',
                'available' => 'boolean',
            ];
        }

        return [
            'model' => 'sometimes|string|max:255',
            'brand' => 'sometimes|string|max:255',
            'year' => "sometimes|integer|min:2000|max:{$currentYear}",
            'category_id' => 'sometimes|exists:categories,id',
            'price_per_day' => 'sometimes|numeric|min:0|max:10000',
            'available' => 'sometimes|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.exists' => 'La catégorie sélectionnée n\'existe pas.',
            'fuel_type.in' => 'Le type de carburant doit être: essence, diesel, electrique ou hybride.',
            'price_per_day.min' => 'Le prix ne peut pas être négatif.',
        ];
    }
}