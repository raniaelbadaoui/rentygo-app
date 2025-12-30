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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('model');
            $table->string('brand');
            $table->integer('year');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->decimal('price_per_day', 8, 2);
            $table->enum('fuel_type', ['essence', 'diesel', 'electrique', 'hybride']);
            $table->enum('transmission', ['manuelle', 'automatique']);
            $table->integer('seats');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('available')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
