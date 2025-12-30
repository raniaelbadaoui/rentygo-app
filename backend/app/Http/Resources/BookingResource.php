<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'vehicle' => new VehicleResource($this->whenLoaded('vehicle')),
            'insurance' => $this->whenLoaded('insurance'),
            'options' => $this->whenLoaded('options'),
            'start_date' => $this->start_date->format('Y-m-d'),
            'end_date' => $this->end_date->format('Y-m-d'),
            'days' => $this->days,
            'vehicle_price' => $this->vehicle_price,
            'insurance_price' => $this->insurance_price,
            'options_price' => $this->options_price,
            'total_price' => $this->total_price,
            'status' => $this->status,
            'pickup_location' => $this->pickup_location,
            'dropoff_location' => $this->dropoff_location,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
