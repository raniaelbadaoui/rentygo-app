<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use App\Models\Category;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $economique = Category::where('name', 'Économique')->first();
        $suv = Category::where('name', 'SUV')->first();
        $luxe = Category::where('name', 'Luxe')->first();
        $berline = Category::where('name', 'Berline')->first();

        if (!$economique) $economique = Category::create(['name' => 'Économique', 'description' => 'Économique']);
        if (!$suv) $suv = Category::create(['name' => 'SUV', 'description' => 'SUV']);
        if (!$luxe) $luxe = Category::create(['name' => 'Luxe', 'description' => 'Luxe']);
        if (!$berline) $berline = Category::create(['name' => 'Berline', 'description' => 'Berline']);

        $vehicles = [
    // Renault Clio
    [
        'model' => 'Clio',
        'brand' => 'Renault',
        'year' => 2023,
        'category_id' => $economique->id,
        'price_per_day' => 250,
        'fuel_type' => 'essence',
        'transmission' => 'manuelle',
        'seats' => 5,
        'description' => 'Renault Clio 2023, citadine agile et économique.',
        'available' => true,
        'image_url' => url ('/assets/RENAULT_Clio-2023_main.jpg'),
    ],
    // Peugeot 208
    [
        'model' => '208',
        'brand' => 'Peugeot',
        'year' => 2024,
        'category_id' => $economique->id,
        'price_per_day' => 280,
        'fuel_type' => 'essence',
        'transmission' => 'automatique',
        'seats' => 5,
        'description' => 'Peugeot 208 2024, design moderne.',
        'available' => true,
        'image_url' => url('/assets/renault.jpg'), // À CHANGER SI VOUS AVEZ 208.jpg
    ],
    // Peugeot 3008
    [
        'model' => '3008',
        'brand' => 'Peugeot',
        'year' => 2024,
        'category_id' => $suv->id,
        'price_per_day' => 450,
        'fuel_type' => 'diesel',
        'transmission' => 'automatique',
        'seats' => 7,
        'description' => 'Peugeot 3008 SUV 2024, spacieux et confortable.',
        'available' => true,
        'image_url' => url('/assets/nouvelle-3008-352.png'), // NOTE: .avi n'est pas une image
    ],
    // Volkswagen Tiguan
    [
        'model' => 'Tiguan',
        'brand' => 'Volkswagen',
        'year' => 2023,
        'category_id' => $suv->id,
        'price_per_day' => 420,
        'fuel_type' => 'diesel',
        'transmission' => 'automatique',
        'seats' => 5,
        'description' => 'Volkswagen Tiguan 2023, SUV allemand robuste.',
        'available' => true,
        'image_url' => url('/assets/volkswagne.webp'),
    ],
    // BMW Serie 3
    [
        'model' => 'Serie 3',
        'brand' => 'BMW',
        'year' => 2024,
        'category_id' => $luxe->id,
        'price_per_day' => 750,
        'fuel_type' => 'essence',
        'transmission' => 'automatique',
        'seats' => 5,
        'description' => 'BMW Serie 3 2024, sportive et élégante.',
        'available' => true,
        'image_url' => url('/assets/bmw-3-series.png'),
    ],
    // Mercedes Classe C
    [
        'model' => 'Classe C',
        'brand' => 'Mercedes',
        'year' => 2023,
        'category_id' => $luxe->id,
        'price_per_day' => 800,
        'fuel_type' => 'diesel',
        'transmission' => 'automatique',
        'seats' => 5,
        'description' => 'Mercedes Classe C 2023, luxe et performance.',
        'available' => true,
        'image_url' => url('/assets/principal.png'),
    ],
];

        foreach ($vehicles as $vehicle) {
            Vehicle::create($vehicle);
        }
    }
}