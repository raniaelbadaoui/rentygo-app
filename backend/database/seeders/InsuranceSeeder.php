<?php

namespace Database\Seeders;

use App\Models\Insurance;
use Illuminate\Database\Seeder;

class InsuranceSeeder extends Seeder
{
    public function run(): void
    {
        $insurances = [
            [
                'name' => 'Assurance Basique',
                'description' => 'Couverture minimale obligatoire',
                'daily_rate' => 25.00,
                'coverage_details' => 'Responsabilité civile uniquement - Franchise: 5000 DH'
            ],
            [
                'name' => 'Assurance Confort',
                'description' => 'Couverture intermédiaire recommandée',
                'daily_rate' => 45.00,
                'coverage_details' => 'Tierce complète + bris de glace + vol - Franchise: 2500 DH'
            ],
            [
                'name' => 'Assurance Premium',
                'description' => 'Couverture totale tranquillité d\'esprit',
                'daily_rate' => 75.00,
                'coverage_details' => 'Tous risques avec franchise réduite + assistance 24/7 - Franchise: 1000 DH'
            ],
            [
                'name' => 'Assurance Zéro Risque',
                'description' => 'Pour les plus exigeants',
                'daily_rate' => 120.00,
                'coverage_details' => 'Tous risques avec franchise 0 DH + véhicule de remplacement'
            ],
        ];

        foreach ($insurances as $insurance) {
            Insurance::create($insurance);
        }
    }
}