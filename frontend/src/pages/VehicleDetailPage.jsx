import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicleById, clearCurrentVehicle } from '../features/vehicles/vehicleSlice';
import { setVehicle, setDates, setPickupLocation, setDropoffLocation } from '../features/bookings/bookingSlice';

const VehicleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentVehicle, loading, error } = useSelector((state) => state.vehicles);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingDates, setBookingDates] = useState({
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    dispatch(fetchVehicleById(id));
    
    return () => {
      dispatch(clearCurrentVehicle());
    };
  }, [dispatch, id]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setBookingDates(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Sauvegarder dans Redux
    dispatch(setVehicle(currentVehicle));
    dispatch(setDates(bookingDates));
    dispatch(setPickupLocation('Agence principale'));
    dispatch(setDropoffLocation('Agence principale'));
    
    // Rediriger
    navigate('/booking/insurance');
  };

  if (loading) return <div className="text-center py-10">Chargement du véhicule...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Erreur: {error}</div>;
  if (!currentVehicle) return <div className="text-center py-10">Véhicule non trouvé</div>;

  const images = currentVehicle.images || [currentVehicle.image_url].filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← Retour aux véhicules
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galerie d'images */}
        <div>
          <div className="mb-4">
            {images.length > 0 ? (
              <img 
                src={images[selectedImage]} 
                alt={`${currentVehicle.brand} ${currentVehicle.model}`}
                className="w-full h-96 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">Image non disponible</span>
              </div>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border rounded ${selectedImage === index ? 'border-blue-500' : 'border-gray-300'}`}
                >
                  <img 
                    src={img} 
                    alt={`Vue ${index + 1}`}
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Détails et réservation */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {currentVehicle.brand} {currentVehicle.model}
          </h1>
          
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-blue-600 mr-2">
              {currentVehicle.price_per_day} MAD
            </span>
            <span className="text-gray-500">par jour</span>
          </div>

          {/* CORRECTION ICI : currentVehicle.category -> currentVehicle.category?.name */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Spécifications</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Catégorie:</span> {currentVehicle.category?.name || 'Standard'}
              </div>
              <div>
                <span className="font-medium">Transmission:</span> {currentVehicle.transmission}
              </div>
              <div>
                <span className="font-medium">Carburant:</span> {currentVehicle.fuel_type}
              </div>
              <div>
                <span className="font-medium">Nombre de sièges:</span> {currentVehicle.seats}
              </div>
              <div>
                <span className="font-medium">Année:</span> {currentVehicle.year}
              </div>
              <div>
                <span className="font-medium">Portes:</span> {currentVehicle.doors || 4}
              </div>
            </div>
          </div>

          {/* Description */}
          {currentVehicle.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{currentVehicle.description}</p>
            </div>
          )}

          {/* Options incluses */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Options incluses</h2>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Climatisation</li>
              <li>Direction assistée</li>
              <li>Airbags</li>
              <li>Système audio Bluetooth</li>
            </ul>
          </div>

          {/* Formulaire de réservation */}
          <div className="bg-white border rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Réserver ce véhicule</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Date de début</label>
                <input
                  type="date"
                  name="start_date"
                  value={bookingDates.start_date}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Date de fin</label>
                <input
                  type="date"
                  name="end_date"
                  value={bookingDates.end_date}
                  onChange={handleDateChange}
                  min={bookingDates.start_date || new Date().toISOString().split('T')[0]}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleBookNow}
              disabled={!bookingDates.start_date || !bookingDates.end_date}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isAuthenticated ? 'Réserver maintenant' : 'Se connecter pour réserver'}
            </button>
            
            <p className="text-sm text-gray-500 mt-3 text-center">
              Paiement sécurisé • Annulation gratuite sous 24h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;