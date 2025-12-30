<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'vehicle_id', 'insurance_id', 'start_date', 'end_date',
        'days', 'vehicle_price', 'insurance_price', 'options_price',
        'total_price', 'status', 'pickup_location', 'dropoff_location'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'vehicle_price' => 'decimal:2',
        'insurance_price' => 'decimal:2',
        'options_price' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function insurance()
    {
        return $this->belongsTo(Insurance::class);
    }

    public function options()
    {
        return $this->belongsToMany(Option::class, 'booking_option')
                    ->withPivot('quantity')
                    ->withTimestamps();
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}