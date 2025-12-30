import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../features/vehicles/vehicleSlice';
import { Link } from 'react-router-dom';

const VehiclesPage = () => {
  const dispatch = useDispatch();
  const { vehicles, loading, error } = useSelector((state) => state.vehicles);

  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    min_price: '',
    max_price: '',
    transmission: '',
  });

  useEffect(() => {
    dispatch(fetchVehicles(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const displayVehicles = vehicles && vehicles.data ? vehicles.data : (Array.isArray(vehicles) ? vehicles : []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Chargement des véhicules...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-red-800 mb-2">Erreur</h3>
          <p className="text-red-600">
            {typeof error === 'string' ? error : 'Une erreur est survenue'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Véhicules</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez notre large sélection de voitures modernes et fiables, parfaitement entretenues pour vous offrir une expérience de conduite exceptionnelle.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Filtrer les véhicules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marque</label>
              <select 
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Toutes les marques</option>
                <option value="Renault">Renault</option>
                <option value="Peugeot">Peugeot</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes">Mercedes</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select 
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Toutes les catégories</option>
                <option value="économique">Économique</option>
                <option value="SUV">SUV</option>
                <option value="luxe">Luxe</option>
                <option value="berline">Berline</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix min (MAD/jour)</label>
              <input
                type="number"
                name="min_price"
                value={filters.min_price}
                onChange={handleFilterChange}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select 
                name="transmission"
                value={filters.transmission}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Tous</option>
                <option value="manuelle">Manuelle</option>
                <option value="automatique">Automatique</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setFilters({ category: '', brand: '', min_price: '', max_price: '', transmission: '' })}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Vehicle List */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {displayVehicles.length} véhicule{displayVehicles.length > 1 ? 's' : ''} disponible{displayVehicles.length > 1 ? 's' : ''}
            </h2>
          </div>

          {displayVehicles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Aucun véhicule trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    {vehicle.image_url ? (
                      <img 
                        src={vehicle.image_url} 
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-5xl mb-2">🚗</div>
                          <p className="text-gray-600">{vehicle.brand} {vehicle.model}</p>
                        </div>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {vehicle.category ? vehicle.category.name : 'Standard'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{vehicle.brand} {vehicle.model}</h3>
                        <p className="text-gray-500">{vehicle.year}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-500">{vehicle.price_per_day} MAD</div>
                        <div className="text-gray-500 text-sm">par jour</div>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-3 mb-6 text-gray-600">
                      <div className="flex items-center">
                        <span className="mr-2">🗓️</span>{vehicle.year}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">💺</span>{vehicle.seats} places
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">⚙️</span>{vehicle.transmission}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">⛽</span>{vehicle.fuel_type}
                      </div>
                    </div>

                    {/* Button */}
                    <Link
                      to={`/vehicles/${vehicle.id}`}
                      className="block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition"
                    >
                      Voir ce véhicule
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-gray-100 rounded-xl p-10 mt-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8 text-gray-800">Pourquoi choisir RentyGo ?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
                <div className="text-4xl mb-4">✅</div>
                <h4 className="font-semibold mb-2">Réservation facile</h4>
                <p className="text-gray-600">Réservez en ligne en 3 clics</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
                <div className="text-4xl mb-4">🛡️</div>
                <h4 className="font-semibold mb-2">Assurance incluse</h4>
                <p className="text-gray-600">Tous nos véhicules sont assurés</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="font-semibold mb-2">Support 24/7</h4>
                <p className="text-gray-600">Notre équipe est disponible tout le temps</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VehiclesPage;
