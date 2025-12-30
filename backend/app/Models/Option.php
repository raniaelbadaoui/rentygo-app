<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'daily_rate'
    ];

    protected $casts = [
        'daily_rate' => 'decimal:2'
    ];

    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_option')
                    ->withPivot('quantity')
                    ->withTimestamps();
    }
}