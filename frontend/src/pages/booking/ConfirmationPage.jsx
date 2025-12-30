import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearBooking } from '../../features/bookings/bookingSlice';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { bookingId, bookingDetails } = location.state || {};

  useEffect(() => {
    // Vider le panier de réservation
    dispatch(clearBooking());

    // Rediriger si pas de données de confirmation
    if (!bookingId) {
      navigate('/vehicles');
    }
  }, [bookingId, navigate, dispatch]);

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

  const handlePrint = () => {
    window.print();
  };

  const handleNewBooking = () => {
    navigate('/vehicles');
  };

  const handleViewBookings = () => {
    navigate('/my-bookings');
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Chargement des détails de confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 print:bg-white print:py-0">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <div className="text-5xl text-green-500">✅</div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Réservation confirmée !</h1>
            <p className="text-xl text-gray-600 mb-6">
              Votre réservation <strong className="text-orange-500">#{bookingId}</strong> a été confirmée avec succès.
            </p>
            <p className="text-gray-500">
              Un email de confirmation a été envoyé à votre adresse email.
            </p>
          </div>

          {/* Confirmation Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 print:shadow-none print:border">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Confirmation de réservation</h2>
                  <p className="opacity-90">RentyGo • Location de véhicules</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Référence</p>
                  <p className="text-2xl font-bold tracking-wider">RGY-{bookingId?.toString().padStart(6, '0')}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Vehicle Details */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Véhicule loué</h3>
                  <div className="flex items-start">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mr-6">
                      {bookingDetails.vehicle?.image_url ? (
                        <img 
                          src={bookingDetails.vehicle.image_url} 
                          alt="" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-3xl">🚗</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800">
                        {bookingDetails.vehicle?.brand} {bookingDetails.vehicle?.model}
                      </h4>
                      <p className="text-gray-600 mb-2">Année {bookingDetails.vehicle?.year}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {bookingDetails.vehicle?.transmission}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {bookingDetails.vehicle?.fuel_type}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                          {bookingDetails.vehicle?.seats} places
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rental Details */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Détails de location</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Date de début</span>
                      <span className="font-bold">{formatDate(bookingDetails.start_date)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Date de fin</span>
                      <span className="font-bold">{formatDate(bookingDetails.end_date)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Durée</span>
                      <span className="font-bold">{bookingDetails.days} jour{bookingDetails.days > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Lieu de prise en charge</span>
                      <span className="font-bold">{bookingDetails.pickup_location || 'Agence principale'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Détails du paiement</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location véhicule ({bookingDetails.days} jours)</span>
                    <span className="font-medium">{bookingDetails.vehicle_price} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assurance ({bookingDetails.days} jours)</span>
                    <span className="font-medium">+{bookingDetails.insurance_price} MAD</span>
                  </div>
                  {bookingDetails.options_price > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Options supplémentaires</span>
                      <span className="font-medium">+{bookingDetails.options_price} MAD</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-gray-300">
                    <div className="flex justify-between">
                      <span className="text-xl font-bold">Montant total</span>
                      <span className="text-3xl font-bold text-orange-500">{bookingDetails.total_price} MAD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Information */}
              <div className="border border-blue-100 bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-800">📋 Informations importantes</h3>
                <ul className="space-y-3 text-blue-700">
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Présentez votre carte d'identité et permis de conduire à l'agence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Arrivez 15 minutes avant l'heure de prise en charge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Le véhicule vous sera remis avec le plein de carburant</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3">•</span>
                    <span>Assistance 24h/24 au <strong>+212 5 XX XX XX XX</strong></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 p-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-600 text-sm">Merci d'avoir choisi RentyGo</p>
                  <p className="font-medium">contact@rentygo.ma • +212 5 XX XX XX XX</p>
                </div>
                <div className="text-sm text-gray-500 text-center md:text-right">
                  <p>Date de confirmation : {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                  <p>Statut : <span className="text-green-600 font-medium">Confirmée</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 print:hidden">
            <button
              onClick={handlePrint}
              className="px-8 py-4 bg-white border-2 border-orange-500 text-orange-500 rounded-xl font-bold hover:bg-orange-50 transition"
            >
              📄 Imprimer la confirmation
            </button>
            <button
              onClick={handleViewBookings}
              className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition"
            >
              📋 Voir mes réservations
            </button>
            <button
              onClick={handleNewBooking}
              className="px-8 py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition"
            >
              🚗 Nouvelle réservation
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 print:hidden">
            <h3 className="text-2xl font-bold mb-6">Prochaines étapes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">1️⃣</div>
                <h4 className="font-bold mb-2">Préparation des documents</h4>
                <p className="text-gray-300 text-sm">Préparez votre carte d'identité et permis de conduire</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">2️⃣</div>
                <h4 className="font-bold mb-2">Récupération du véhicule</h4>
                <p className="text-gray-300 text-sm">Présentez-vous à l'agence avec votre confirmation</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">3️⃣</div>
                <h4 className="font-bold mb-2">Bon voyage !</h4>
                <p className="text-gray-300 text-sm">Profitez de votre location en toute sérénité</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;