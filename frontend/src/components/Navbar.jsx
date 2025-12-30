// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import logo from '../assets/navbar.png'; // Assurez-vous que le chemin est correct

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo à gauche */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="RentyGo Logo" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150x40?text=RentyGo';
                }}
              />
            </Link>
          </div>

          {/* Menu central */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium transition">
              Accueil
            </Link>
            <Link to="/vehicles" className="text-gray-800 hover:text-blue-600 font-medium transition">
              Véhicules
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-blue-600 font-medium transition">
              Qui sommes-nous
            </Link>
            <Link to="/faq" className="text-gray-800 hover:text-blue-600 font-medium transition">
              FAQs
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-blue-600 font-medium transition">
              Contact
            </Link>
          </div>

          {/* Boutons de droite */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {/* Menu Admin */}
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                    Admin
                  </Link>
                )}
                
                <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600 font-medium">
                  Mes réservations
                </Link>

                {/* Dropdown Profil */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 focus:outline-none"
                  >
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium">{user?.name?.split(' ')[0] || 'Utilisateur'}</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
                      >
                        👤 Mon profil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
                      >
                        🚪 Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-blue-600 font-medium transition"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-800 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 py-2">
                Accueil
              </Link>
              <Link to="/vehicles" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 py-2">
                Véhicules
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 py-2">
                Qui sommes-nous
              </Link>
              <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 py-2">
                FAQs
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 py-2">
                Contact
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 py-2">
                    Mes réservations
                  </Link>
                  
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 py-2">
                      Admin
                    </Link>
                  )}
                  
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 py-2">
                    Mon profil
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-800 hover:text-red-600 py-2"
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 py-2">
                    Connexion
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700">
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;