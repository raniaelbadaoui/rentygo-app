<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
             $table->id();
             $table->foreignId('user_id')->constrained()->onDelete('cascade');
             $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
             $table->foreignId('insurance_id')->constrained()->onDelete('cascade');
             $table->date('start_date');
             $table->date('end_date');
             $table->integer('days');
             $table->decimal('vehicle_price', 8, 2);
             $table->decimal('insurance_price', 8, 2);
             $table->decimal('options_price', 8, 2)->default(0);
             $table->decimal('total_price', 8, 2);
             $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
             $table->string('pickup_location');
             $table->string('dropoff_location');
             $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
