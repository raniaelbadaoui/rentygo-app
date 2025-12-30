import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SummaryPage = () => {
  const navigate = useNavigate();
  const { currentBooking } = useSelector((state) => state.booking);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const { vehicle, insurance, options, dates, calculatedPrices } = currentBooking;
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    // Rediriger si pas de véhicule, assurance ou dates
    if (!vehicle || !insurance || !dates.start_date || !dates.end_date) {
      navigate('/vehicles');
    }
  }, [vehicle, insurance, dates, navigate]);

  useEffect(() => {
    // Vérifier les dates
    if (dates.start_date && dates.end_date) {
      const start = new Date(dates.start_date);
      const end = new Date(dates.end_date);
      const today = new Date();
      
      if (start < today) {
        setDateError('La date de début ne peut pas être dans le passé');
      } else if (end <= start) {
        setDateError('La date de fin doit être après la date de début');
      } else {
        setDateError('');
      }
    }
  }, [dates]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handleConfirm = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/booking/summary' } });
      return;
    }
    
    if (!dateError) {
      navigate('/booking/payment');
    }
  };

  const calculateDays = () => {
    if (!dates.start_date || !dates.end_date) return 0;
    const start = new Date(dates.start_date);
    const end = new Date(dates.end_date);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const days = calculateDays();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">1</div>
              <span className="ml-2 font-medium">Véhicule</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-orange-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">2</div>
              <span className="ml-2 font-medium">Assurance</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-orange-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">3</div>
              <span className="ml-2 font-medium">Options</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-orange-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">4</div>
              <span className="ml-2 font-medium">Récap</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">5</div>
              <span className="ml-2 text-gray-500">Paiement</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Récapitulatif de votre réservation</h1>
          <p className="text-gray-600 mb-8">
            Vérifiez les détails avant de procéder au paiement
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vehicle Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Véhicule sélectionné</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    {vehicle?.image_url ? (
                      <img 
                        src={vehicle.image_url} 
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-4xl">🚗</span>
                      </div>
                    )}
                  </div>
                  <div className="md:w-2/3">
                    <h4 className="text-2xl font-bold mb-2">{vehicle?.brand} {vehicle?.model}</h4>
                    <div className="grid grid-cols-2 gap-2 mb-4 text-gray-600">
                      <div><span className="font-medium">Année:</span> {vehicle?.year}</div>
                      <div><span className="font-medium">Transmission:</span> {vehicle?.transmission}</div>
                      <div><span className="font-medium">Carburant:</span> {vehicle?.fuel_type}</div>
                      <div><span className="font-medium">Sièges:</span> {vehicle?.seats}</div>
                    </div>
                    <button
                      onClick={() => navigate(`/vehicles/${vehicle?.id}`)}
                      className="text-orange-500 hover:text-orange-700 font-medium"
                    >
                      Modifier ce choix
                    </button>
                  </div>
                </div>
              </div>

              {/* Dates & Locations */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Dates et lieux</h3>
                
                {dateError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-600">{dateError}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Dates de location</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Début:</span>
                        <span className="font-medium">{formatDate(dates.start_date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fin:</span>
                        <span className="font-medium">{formatDate(dates.end_date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Durée:</span>
                        <span className="font-medium">{days} jour{days > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Lieux</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Prise en charge:</span>
                        <span className="font-medium">{dates.pickup_location || 'Non spécifié'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Retour:</span>
                        <span className="font-medium">{dates.dropoff_location || 'Non spécifié'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate(`/vehicles/${vehicle?.id}`)}
                  className="mt-4 text-orange-500 hover:text-orange-700 font-medium"
                >
                  Modifier les dates
                </button>
              </div>

              {/* Insurance */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Assurance</h3>
                    <p className="text-gray-600">{insurance?.name}</p>
                    <p className="text-sm text-gray-500">{insurance?.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-500">
                      +{insurance?.daily_rate * days || 0} MAD
                    </div>
                    <button
                      onClick={() => navigate('/booking/insurance')}
                      className="text-sm text-orange-500 hover:text-orange-700"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </div>

              {/* Options */}
              {options.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">Options supplémentaires</h3>
                  <div className="space-y-3">
                    {options.map((option) => (
                      <div key={option.id} className="flex justify-between items-center py-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-500">+{option.daily_rate * days} MAD</p>
                          <button
                            onClick={() => navigate('/booking/options')}
                            className="text-sm text-orange-500 hover:text-orange-700"
                          >
                            Modifier
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Price Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-bold mb-6">Détails du prix</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Véhicule ({days} jours)</span>
                    <span className="font-medium">{calculatedPrices.vehiclePrice || 0} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assurance ({days} jours)</span>
                    <span className="font-medium">+{calculatedPrices.insurancePrice || 0} MAD</span>
                  </div>
                  {options.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Options ({days} jours)</span>
                      <span className="font-medium">+{calculatedPrices.optionsPrice || 0} MAD</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-orange-500">
                        {calculatedPrices.totalPrice || 0} MAD
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-2 text-blue-800">💡 Bon à savoir</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Annulation gratuite 48h avant</li>
                    <li>• Kilométrage illimité</li>
                    <li>• Assurance tout risque incluse</li>
                    <li>• Assistance 24h/24</li>
                  </ul>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={!!dateError}
                  className={`w-full py-4 rounded-lg font-bold text-lg ${
                    dateError
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isAuthenticated ? 'Confirmer et payer' : 'Se connecter pour réserver'}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  En continuant, vous acceptez nos conditions générales
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate('/booking/options')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              ← Retour aux options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;