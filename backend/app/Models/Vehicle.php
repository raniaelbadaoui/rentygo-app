<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'model', 'brand', 'year', 'category_id', 'price_per_day',
        'fuel_type', 'transmission', 'seats', 'description', 'available' , 'image_url'
    ];

    protected $casts = [
        'available' => 'boolean',
        'price_per_day' => 'decimal:2',
    ];

    // Relations
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}