// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0b2a66] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">RentyGo</h2>
            <p className="text-gray-300 text-sm mb-4">
              La solution moderne pour tous vos besoins de location de véhicules.
            </p>
            <div className="flex space-x-4 text-gray-300">
              <a href="#" className="hover:text-white">📘</a>
              <a href="#" className="hover:text-white">🐦</a>
              <a href="#" className="hover:text-white">📸</a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Location courte durée</li>
              <li>Location longue durée</li>
              <li>Véhicules de luxe</li>
              <li>Véhicules utilitaires</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link to="/help" className="hover:text-white">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Conditions générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2">📞 +33 1 23 45 67 89</li>
              <li className="flex items-center gap-2">✉️ contact@rentygo.fr</li>
              <li className="flex items-center gap-2">📍 Paris, France</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} RentyGo. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
