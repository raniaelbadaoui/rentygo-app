// src/pages/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const UserProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter la mise à jour du profil
    console.log('Update profile:', formData);
    alert('Fonctionnalité à implémenter');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return <div className="text-center py-10">Chargement du profil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informations du profil */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Informations personnelles</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Mettre à jour
              </button>
            </form>
          </div>
        </div>
        
        {/* Actions rapides */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <button
              onClick={handleLogout}
              className="w-full bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 mb-3"
            >
              Se déconnecter
            </button>
            
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
              Changer le mot de passe
            </button>
          </div>
          
          {/* Statut */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Statut du compte</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Rôle :</span>
                <span className="font-medium">{user.role || 'Utilisateur'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Membre depuis :</span>
                <span className="font-medium">
                  {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;