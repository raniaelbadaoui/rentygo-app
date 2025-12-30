// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VehiclesPage from './pages/VehiclesPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import UserBookingsPage from './pages/UserBookingsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import BookingVehiclesPage from './pages/booking/BookingVehiclesPage';
import Footer from './components/Footer';

// Import des pages booking
import InsurancePage from './pages/booking/InsurancePage';
import OptionsPage from './pages/booking/OptionsPage';
import SummaryPage from './pages/booking/SummaryPage';
import PaymentPage from './pages/booking/PaymentPage';
import ConfirmationPage from './pages/booking/ConfirmationPage';

// Import des nouvelles pages
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking/vehicles" element={<BookingVehiclesPage />} />
          
          {/* Routes booking */}
          <Route path="/booking/insurance" element={
            <ProtectedRoute>
              <InsurancePage />
            </ProtectedRoute>
          } />
          
          <Route path="/booking/options" element={
            <ProtectedRoute>
              <OptionsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/booking/summary" element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          } />
          
          <Route path="/booking/payment" element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } />
          
          <Route path="/booking/confirmation" element={
            <ProtectedRoute>
              <ConfirmationPage />
            </ProtectedRoute>
          } />
          
          {/* Routes utilisateur */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <UserBookingsPage />
            </ProtectedRoute>
          } />
          
          {/* Routes admin */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* 404 */}
          <Route path="*" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600">Page non trouvée</p>
            </div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;