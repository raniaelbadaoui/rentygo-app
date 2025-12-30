// src/pages/booking/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearBooking } from '../../features/bookings/bookingSlice';
import axiosInstance from '../../utils/axiosConfig';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentBooking } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  const { vehicle, insurance, options, dates, calculatedPrices } = currentBooking;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Rediriger si données manquantes
    if (!vehicle || !insurance || !dates.start_date || !dates.end_date) {
      navigate('/vehicles');
    }
  }, [vehicle, insurance, dates, navigate]);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatage automatique
    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validateForm = () => {
    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length !== 16) {
      return 'Numéro de carte invalide (16 chiffres requis)';
    }
    if (!cardDetails.expiry || !cardDetails.expiry.match(/^\d{2}\/\d{2}$/)) {
      return 'Date d\'expiration invalide (MM/AA)';
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      return 'Code CVV invalide (3-4 chiffres)';
    }
    if (!cardDetails.name) {
      return 'Nom sur la carte requis';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Préparer les données pour l'API
      const bookingData = {
        vehicle_id: vehicle.id,
        insurance_id: insurance.id,
        option_ids: options.map(opt => opt.id),
        start_date: dates.start_date,
        end_date: dates.end_date,
        pickup_location: dates.pickup_location || 'Agence principale',
        dropoff_location: dates.dropoff_location || 'Agence principale',
      };

      // Envoyer la réservation à l'API
      const response = await axiosInstance.post('/api/bookings', bookingData);
      
      // Simuler le paiement (dans un vrai projet, intégrer Stripe/autres)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Rediriger après succès
      setTimeout(() => {
        dispatch(clearBooking());
        navigate('/booking/confirmation', { 
          state: { 
            bookingId: response.data.booking.id,
            bookingDetails: response.data.booking 
          } 
        });
      }, 2000);

    } catch (err) {
      console.error('Booking error:', err);
      setError(err.response?.data?.message || 'Erreur lors de la réservation. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const calculateDays = () => {
    if (!dates.start_date || !dates.end_date) return 0;
    const start = new Date(dates.start_date);
    const end = new Date(dates.end_date);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const days = calculateDays();

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold mb-4">Paiement réussi !</h1>
          <p className="text-gray-600 mb-8">Votre réservation est en cours de confirmation...</p>
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

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
            <div className="flex-1 h-1 mx-4 bg-orange-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">5</div>
              <span className="ml-2 font-medium">Paiement</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Paiement sécurisé</h1>
          <p className="text-gray-600 mb-8">
            Finalisez votre réservation en toute sécurité
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold mb-6">Méthode de paiement</h3>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg text-center ${
                      paymentMethod === 'card' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">💳</div>
                    <span className="font-medium">Carte bancaire</span>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 border-2 rounded-lg text-center ${
                      paymentMethod === 'paypal' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">🅿️</div>
                    <span className="font-medium">PayPal</span>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-4 border-2 rounded-lg text-center ${
                      paymentMethod === 'transfer' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">🏦</div>
                    <span className="font-medium">Virement</span>
                  </button>
                </div>

                {/* Card Form */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {/* Card Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Numéro de carte
                        </label>
                        <input
                          type="text"
                          name="number"
                          value={cardDetails.number}
                          onChange={handleCardChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          maxLength="19"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* Expiry Date */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date d'expiration (MM/AA)
                          </label>
                          <input
                            type="text"
                            name="expiry"
                            value={cardDetails.expiry}
                            onChange={handleCardChange}
                            placeholder="MM/AA"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            maxLength="5"
                          />
                        </div>

                        {/* CVV */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Code CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            maxLength="4"
                          />
                        </div>
                      </div>

                      {/* Cardholder Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom sur la carte
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={cardDetails.name}
                          onChange={handleCardChange}
                          placeholder={user?.name || 'Nom complet'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600">{error}</p>
                      </div>
                    )}

                    {/* Security Info */}
                    <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="text-blue-500 mr-3">🔒</div>
                        <div>
                          <p className="text-sm text-blue-700">
                            <strong>Paiement 100% sécurisé</strong> - Vos données sont chiffrées et protégées
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Other Payment Methods */}
                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Vous serez redirigé vers PayPal pour finaliser le paiement</p>
                    <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
                      Payer avec PayPal
                    </button>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="space-y-4">
                    <p className="text-gray-600">Effectuez un virement bancaire aux coordonnées suivantes :</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Banque: CIH Bank</p>
                      <p className="font-medium">IBAN: MA64 1234 5678 9012 3456 7890 123</p>
                      <p className="font-medium">BIC: CIHAMAMCXXX</p>
                      <p className="font-medium">Bénéficiaire: RentyGo SARL</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Une fois le virement effectué, envoyez-nous le justificatif à contact@rentygo.ma
                    </p>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Informations personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Nom complet</p>
                    <p className="font-medium">{user?.name || 'Non spécifié'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-medium">{user?.email || 'Non spécifié'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Téléphone</p>
                    <p className="font-medium">{user?.phone || 'Non spécifié'}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="mt-4 text-orange-500 hover:text-orange-700 font-medium"
                >
                  Modifier mes informations
                </button>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-bold mb-6">Récapitulatif</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      {vehicle?.image_url ? (
                        <img src={vehicle.image_url} alt="" className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <span>🚗</span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold">{vehicle?.brand} {vehicle?.model}</p>
                      <p className="text-sm text-gray-500">{days} jour{days > 1 ? 's' : ''} de location</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Véhicule</span>
                      <span className="font-medium">{calculatedPrices.vehiclePrice || 0} MAD</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Assurance</span>
                      <span className="font-medium">+{calculatedPrices.insurancePrice || 0} MAD</span>
                    </div>
                    {options.length > 0 && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Options</span>
                        <span className="font-medium">+{calculatedPrices.optionsPrice || 0} MAD</span>
                      </div>
                    )}
                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold text-orange-500">
                          {calculatedPrices.totalPrice || 0} MAD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || paymentMethod !== 'card'}
                  className={`w-full py-4 rounded-lg font-bold text-lg mb-4 ${
                    loading || paymentMethod !== 'card'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Traitement en cours...
                    </span>
                  ) : (
                    `Payer ${calculatedPrices.totalPrice || 0} MAD`
                  )}
                </button>

                <p className="text-center text-xs text-gray-500">
                  ⚠️ Ceci est une démonstration. Aucun vrai paiement ne sera effectué.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate('/booking/summary')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              ← Retour au récapitulatif
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;