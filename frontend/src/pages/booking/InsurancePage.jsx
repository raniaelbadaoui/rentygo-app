import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  setInsurance,
  setAvailableInsurances,
  calculatePrices,
} from "../../features/bookings/bookingSlice";
import axiosInstance from "../../utils/axiosConfig";

const InsurancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { currentBooking, availableInsurances } = useSelector(
    (state) => state.booking
  );

  const { vehicle } = currentBooking || {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiData, setApiData] = useState([]);

  /* ================= FETCH INSURANCES ================= */
  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const response = await axiosInstance.get("/api/insurances");
        setApiData(response.data);
        dispatch(setAvailableInsurances(response.data));
      } catch (err) {
        setError("Erreur lors du chargement des assurances");
      } finally {
        setLoading(false);
      }
    };

    fetchInsurances();
  }, [dispatch]);

  /* ================= VEHICLE CHECK ================= */
  useEffect(() => {
    if (!vehicle && !location.state?.vehicle) {
      navigate("/vehicles");
    }
  }, [vehicle, location.state, navigate]);

  const currentVehicle = vehicle || location.state?.vehicle;

  const insurancesToShow =
    availableInsurances?.length > 0 ? availableInsurances : apiData;

  const handleSelectInsurance = (insurance) => {
    dispatch(setInsurance(insurance));
    dispatch(calculatePrices());
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-2 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* ===== Progress ===== */}
        <div className="flex items-center justify-between mb-10 text-sm">
          {["Véhicule", "Assurance", "Options", "Récap", "Paiement"].map(
            (step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white
                    ${i <= 1 ? "bg-orange-500" : "bg-gray-300"}
                  `}
                >
                  {i + 1}
                </div>
                <span
                  className={`${
                    i <= 1 ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            )
          )}
        </div>

        {/* ===== Title ===== */}
        <h1 className="text-2xl font-bold mb-1">
          Choisissez Votre Forfait d’Assurance
        </h1>
        <p className="text-gray-600 mb-8">
          Protégez votre voyage avec notre couverture d’assurance adaptée à vos
          besoins
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* ===== Main Layout ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ===== LEFT – INSURANCES ===== */}
          <div className="lg:col-span-2 space-y-4">
            {insurancesToShow.map((insurance, index) => {
              const isSelected =
                currentBooking?.insurance?.id === insurance.id;

              return (
                <div
                  key={insurance.id}
                  onClick={() => handleSelectInsurance(insurance)}
                  className={`relative bg-white rounded-xl border-2 p-6 cursor-pointer transition
                    ${
                      isSelected
                        ? "border-orange-500"
                        : "border-gray-200 hover:border-orange-300"
                    }
                  `}
                >
                  {/* Popular badge */}
                  {index === 1 && (
                    <span className="absolute -top-3 left-6 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                      Le Plus Populaire
                    </span>
                  )}

                  {/* Radio */}
                  <div className="absolute top-6 right-6">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${
                          isSelected
                            ? "border-orange-500"
                            : "border-gray-300"
                        }
                      `}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-1">
                    {insurance.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {insurance.description}
                  </p>

                  {/* Coverage list */}
                  <ul className="space-y-2 text-sm text-gray-700 mb-4">
                    {insurance.coverage_details
                      ?.split(",")
                      .map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-green-500">✔</span>
                          {item}
                        </li>
                      ))}
                  </ul>

                  {/* Price */}
                  <div className="text-xl font-bold text-orange-500">
                    {parseFloat(insurance.daily_rate).toFixed(0)}€
                    <span className="text-sm text-gray-500 font-normal">
                      {" "}
                      / jour
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===== RIGHT – RECAP ===== */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
            <h3 className="font-bold mb-4">
              Récapitulatif de Réservation
            </h3>

            {currentVehicle && (
              <div className="text-sm text-gray-600 space-y-4">
                <div>
                  <p className="font-medium text-gray-800">
                    {currentVehicle.brand} {currentVehicle.model}
                  </p>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Assurance</span>
                    <span>
                      {currentBooking?.insurance
                        ? `${currentBooking.insurance.daily_rate}€ / jour`
                        : "—"}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>—</span>
                </div>

                <p className="text-xs text-orange-600">
                  Annulation gratuite jusqu’à 24h avant
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ===== Bottom Navigation ===== */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            ← Retour
          </button>

          <button
            disabled={!currentBooking?.insurance}
            onClick={() => navigate("/booking/options")}
            className={`px-8 py-3 rounded-lg font-medium
              ${
                currentBooking?.insurance
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Continuer →
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;
