// src/pages/admin/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = {
    totalUsers: 124,
    totalVehicles: 45,
    activeBookings: 18,
    totalRevenue: 125400,
  };

  const recentBookings = [
    { id: 1, user: 'Ahmed Benali', vehicle: 'Toyota Corolla', date: '2024-01-15', amount: 2500 },
    { id: 2, user: 'Fatima Zohra', vehicle: 'Renault Clio', date: '2024-01-14', amount: 1800 },
    { id: 3, user: 'Karim Alami', vehicle: 'Mercedes Classe A', date: '2024-01-13', amount: 4500 },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord Administrateur</h1>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600 mb-2">{stats.totalUsers}</div>
          <div className="text-gray-600">Utilisateurs</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600 mb-2">{stats.totalVehicles}</div>
          <div className="text-gray-600">Véhicules</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-yellow-600 mb-2">{stats.activeBookings}</div>
          <div className="text-gray-600">Réservations actives</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600 mb-2">{stats.totalRevenue.toLocaleString()} MAD</div>
          <div className="text-gray-600">Revenu total</div>
        </div>
      </div>
      
      {/* Actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Gestion Véhicules</h2>
          <div className="space-y-3">
            <Link to="/admin/vehicles" className="block bg-blue-50 text-blue-700 px-4 py-3 rounded hover:bg-blue-100">
              Voir tous les véhicules
            </Link>
            <button className="w-full bg-green-50 text-green-700 px-4 py-3 rounded hover:bg-green-100">
              Ajouter un véhicule
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Gestion Réservations</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-50 text-blue-700 px-4 py-3 rounded hover:bg-blue-100">
              Voir toutes les réservations
            </button>
            <button className="w-full bg-yellow-50 text-yellow-700 px-4 py-3 rounded hover:bg-yellow-100">
              Réservations en attente
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Gestion Utilisateurs</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-50 text-blue-700 px-4 py-3 rounded hover:bg-blue-100">
              Voir tous les utilisateurs
            </button>
            <button className="w-full bg-red-50 text-red-700 px-4 py-3 rounded hover:bg-red-100">
              Gérer les rôles
            </button>
          </div>
        </div>
      </div>
      
      {/* Dernières réservations */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Dernières réservations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Client</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Véhicule</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Montant</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4">#{booking.id}</td>
                  <td className="px-6 py-4">{booking.user}</td>
                  <td className="px-6 py-4">{booking.vehicle}</td>
                  <td className="px-6 py-4">{booking.date}</td>
                  <td className="px-6 py-4 font-medium">{booking.amount} MAD</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm mr-3">
                      Voir
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-sm">
                      Confirmer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;