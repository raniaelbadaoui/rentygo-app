<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Berline', 'description' => 'Voitures confortables pour famille'],
            ['name' => 'SUV', 'description' => 'Spacieux pour voyages'],
            ['name' => 'Économique', 'description' => 'Économique en carburant'],
            ['name' => 'Luxe', 'description' => 'Voitures haut de gamme'],
            ['name' => 'Utilitaire', 'description' => 'Pour transport de marchandises'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}