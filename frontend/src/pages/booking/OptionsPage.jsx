// src/pages/booking/OptionsPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  toggleOption,
  setAvailableOptions,
  calculatePrices
} from '../../features/bookings/bookingSlice';
import axiosInstance from '../../utils/axiosConfig';

const OptionsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentBooking, availableOptions } = useSelector(
    (state) => state.booking
  );

  const { vehicle, insurance, options } = currentBooking;
  const [loading, setLoading] = useState(true);

  /* ================= FETCH OPTIONS ================= */
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axiosInstance.get('/api/options');
        dispatch(setAvailableOptions(response.data));
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [dispatch]);

  /* ================= GUARD ================= */
  useEffect(() => {
    if (!vehicle || !insurance) {
      navigate('/vehicles');
    }
  }, [vehicle, insurance, navigate]);

  /* ================= PRICE UPDATE ================= */
  useEffect(() => {
    dispatch(calculatePrices());
  }, [options, dispatch]);

  const handleToggleOption = (optionId) => {
    dispatch(toggleOption(optionId));
  };

  const isOptionSelected = (optionId) => {
    return options.some(opt => opt.id === optionId);
  };

  /* ================= SAFE TEXT ================= */
  const renderText = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.label || '';
    }
    return '';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* ===== Progress ===== */}
        <div className="flex items-center justify-between mb-10 text-sm">
          {['Véhicule', 'Assurance', 'Options', 'Récap', 'Paiement'].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white
                  ${i <= 2 ? 'bg-orange-500' : 'bg-gray-300'}
                `}
              >
                {i + 1}
              </div>
              <span className={i <= 2 ? 'text-gray-900' : 'text-gray-400'}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* ===== Title ===== */}
        <h1 className="text-2xl font-bold mb-1">
          Améliorez Votre Voyage avec des Options
        </h1>
        <p className="text-gray-600 mb-8">
          Personnalisez votre expérience de location avec nos options premium
        </p>

        {/* ===== Layout ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ===== LEFT OPTIONS ===== */}
          <div className="lg:col-span-2 space-y-4">
            {availableOptions.map(option => (
              <div
                key={option.id}
                className={`bg-white rounded-xl border p-5 flex justify-between items-start transition
                  ${isOptionSelected(option.id)
                    ? 'border-orange-500'
                    : 'border-gray-200 hover:border-orange-300'}
                `}
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center font-bold">
                    ⚙
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {renderText(option.name)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {renderText(option.description)}
                    </p>
                    <p className="text-sm text-orange-500 mt-1">
                      {option.daily_rate} MAD
                      <span className="text-gray-500"> / jour</span>
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={isOptionSelected(option.id)}
                  onChange={() => handleToggleOption(option.id)}
                  className="h-5 w-5 text-orange-500"
                />
              </div>
            ))}
          </div>

          {/* ===== RIGHT SUMMARY ===== */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
            <h3 className="font-bold mb-4">Récapitulatif</h3>

            {vehicle && (
              <>
                <p className="font-semibold">
                  {vehicle.brand} {vehicle.model}
                </p>

                <div className="border-t mt-4 pt-4 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Options</span>
                    <span>
                      {currentBooking.calculatedPrices?.optionsPrice || 0} MAD
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-orange-500">
                      {currentBooking.calculatedPrices?.totalPrice || 0} MAD
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ===== Navigation ===== */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() => navigate('/booking/insurance')}
            className="px-6 py-3 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            ← Retour à la Sélection
          </button>

          <button
            onClick={() => navigate('/booking/summary')}
            className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600"
          >
            Continuer vers le Paiement →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsPage;
