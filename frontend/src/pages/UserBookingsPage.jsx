// src/pages/UserBookingsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler chargement des réservations
    setTimeout(() => {
      setBookings([
        {
          id: 1,
          vehicle: { brand: 'Toyota', model: 'Corolla', image: null },
          dates: { start: '2024-01-15', end: '2024-01-20' },
          total: 2500,
          status: 'confirmed',
          statusLabel: 'Confirmée',
        },
        {
          id: 2,
          vehicle: { brand: 'Renault', model: 'Clio', image: null },
          dates: { start: '2024-02-01', end: '2024-02-05' },
          total: 1800,
          status: 'pending',
          statusLabel: 'En attente',
        },
        {
          id: 3,
          vehicle: { brand: 'Mercedes', model: 'Classe A', image: null },
          dates: { start: '2023-12-10', end: '2023-12-15' },
          total: 4500,
          status: 'completed',
          statusLabel: 'Terminée',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-10">Chargement des réservations...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes Réservations</h1>
        <Link
          to="/vehicles"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Nouvelle réservation
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <p className="text-gray-500 mb-4">Vous n'avez aucune réservation</p>
          <Link
            to="/vehicles"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Réserver un véhicule
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Véhicule</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dates</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Montant</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center mr-4">
                        {booking.vehicle.image ? (
                          <img src={booking.vehicle.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-gray-400 text-xs">Image</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{booking.vehicle.brand} {booking.vehicle.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div>Du {booking.dates.start}</div>
                      <div>Au {booking.dates.end}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{booking.total} MAD</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.statusLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">
                      Voir détails
                    </button>
                    {booking.status === 'pending' && (
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Annuler
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserBookingsPage;