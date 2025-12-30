<?php

namespace Database\Seeders;

use App\Models\Option;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $options = [
            ['name' => 'GPS', 'description' => 'Navigation GPS', 'daily_rate' => 10.00],
            ['name' => 'Siège bébé', 'description' => 'Siège pour enfant', 'daily_rate' => 8.00],
            ['name' => 'Conducteur supplémentaire', 'description' => 'Ajout d\'un conducteur', 'daily_rate' => 15.00],
            ['name' => 'Wi-Fi mobile', 'description' => 'Connexion internet', 'daily_rate' => 12.00],
        ];

        foreach ($options as $option) {
            Option::create($option);
        }
    }
}
