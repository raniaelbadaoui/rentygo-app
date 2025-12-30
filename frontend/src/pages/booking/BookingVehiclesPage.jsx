// src/pages/booking/BookingVehiclesPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setVehicle } from '../../features/bookings/bookingSlice';
import axiosInstance from '../../utils/axiosConfig';

const BookingVehiclesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useState(location.state?.searchParams || {});

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/vehicles');
      setVehicles(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVehicle = (vehicle) => {
    dispatch(setVehicle(vehicle));
    navigate('/booking/insurance');
  };

  const handleViewDetails = (vehicleId) => {
    window.open(`/vehicles/${vehicleId}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Chargement des véhicules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Choisissez votre véhicule</h1>
        <p className="text-gray-600 mb-8">
          Sélectionnez le véhicule pour votre réservation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {vehicle.image_url ? (
                  <img src={vehicle.image_url} alt={vehicle.model} className="h-full w-full object-cover" />
                ) : (
                  <div className="text-5xl">🚗</div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-gray-600 text-sm">{vehicle.year} • {vehicle.fuel_type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-500">{vehicle.price_per_day} MAD</div>
                    <div className="text-gray-500 text-sm">/ jour</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{vehicle.description?.substring(0, 80)}...</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleSelectVehicle(vehicle)}
                    className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
                  >
                    Choisir ce véhicule
                  </button>
                  <button
                    onClick={() => handleViewDetails(vehicle.id)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingVehiclesPage;