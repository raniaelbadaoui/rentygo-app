<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
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
            'model' => $this->model,
            'brand' => $this->brand,
            'year' => $this->year,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'price_per_day' => $this->price_per_day,
            'fuel_type' => $this->fuel_type,
            'transmission' => $this->transmission,
            'seats' => $this->seats,
            'description' => $this->description,
            'available' => $this->available,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
