<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class BookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // L'autorisation est gérée dans le controller
    }

    public function rules(): array
    {
        $today = Carbon::today()->format('Y-m-d');

        return [
            'vehicle_id' => 'required|exists:vehicles,id',
            'insurance_id' => 'required|exists:insurances,id',
            'start_date' => "required|date|after_or_equal:{$today}",
            'end_date' => 'required|date|after:start_date',
            'pickup_location' => 'required|string|max:255',
            'dropoff_location' => 'required|string|max:255',
            'option_ids' => 'nullable|array',
            'option_ids.*' => 'exists:options,id',
        ];
    }

    public function messages(): array
    {
        return [
            'start_date.after_or_equal' => 'La date de début ne peut pas être dans le passé.',
            'end_date.after' => 'La date de fin doit être après la date de début.',
            'vehicle_id.exists' => 'Le véhicule sélectionné n\'existe pas.',
            'insurance_id.exists' => 'L\'assurance sélectionnée n\'existe pas.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // Vérifier que la durée ne dépasse pas 30 jours
            if ($this->start_date && $this->end_date) {
                $start = Carbon::parse($this->start_date);
                $end = Carbon::parse($this->end_date);
                $days = $start->diffInDays($end);

                if ($days > 30) {
                    $validator->errors()->add(
                        'end_date', 
                        'La location ne peut pas excéder 30 jours.'
                    );
                }
            }
        });
    }
}