import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import headerImage from "../assets/headerrentygo.jpg";

const faqs = [
  {
    q: "Quels documents sont nécessaires pour louer une voiture ?",
    a: "Vous avez besoin d’un permis valide, d’une pièce d’identité et d’une carte bancaire."
  },
  {
    q: "Puis-je annuler ma réservation ?",
    a: "Oui, selon les conditions indiquées lors de la réservation."
  },
  {
    q: "La caution est-elle obligatoire ?",
    a: "Oui, une caution est demandée et restituée après la location."
  },
  {
    q: "Livrez-vous les voitures à l’aéroport ?",
    a: "Oui, nous livrons dans les principaux aéroports du Maroc."
  }
];

const HomePage = () => {
  const [open, setOpen] = useState(null);
  const [searchParams, setSearchParams] = useState({
    city: "",
    startDate: "",
    endDate: ""
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Vérifier que tous les champs sont remplis
    if (!searchParams.city || !searchParams.startDate || !searchParams.endDate) {
      alert("Veuillez remplir tous les champs de recherche");
      return;
    }
    
    // Rediriger vers la page véhicules avec les paramètres de recherche
    navigate("/booking/vehicles", { 
      state: { 
        searchParams 
      }
    });
  };

  const handleReserve = (vehicleId) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  const handleViewDetails = (vehicleId) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  return (
    <div className="bg-gray-100 text-gray-800">

      {/* ================= HERO WITH IMAGE ================= */}
      <section className="mx-6 mt-6 rounded-2xl overflow-hidden">
        <div
          className="relative bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(31,42,68,0.9),
                rgba(44,62,102,0.85)
              ),
              url(${headerImage})
            `
          }}
        >
          <div className="min-h-[520px] flex items-center px-6 py-16">
            <div className="max-w-6xl mx-auto text-center text-white w-full">

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Location de voiture au Maroc
              </h1>

              <p className="text-gray-200 mb-10">
                Trouvez la voiture parfaite pour votre voyage
              </p>

              {/* SEARCH BAR */}
              <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-2xl p-6 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                  {/* CITY */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Ville
                    </label>
                    <select
                      value={searchParams.city}
                      onChange={(e) => setSearchParams({...searchParams, city: e.target.value})}
                      className="w-full mt-1 px-4 py-3
                      bg-gray-200 text-gray-900
                      border border-gray-300
                      rounded-lg
                      focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="">Choisir une ville</option>
                      <option>Casablanca</option>
                      <option>Rabat</option>
                      <option>Marrakech</option>
                      <option>Agadir</option>
                      <option>Tanger</option>
                      <option>Fès</option>
                      <option>Meknès</option>
                      <option>Oujda</option>
                      <option>Dakhla</option>
                    </select>
                  </div>

                  {/* START DATE */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={searchParams.startDate}
                      onChange={(e) => setSearchParams({...searchParams, startDate: e.target.value})}
                      className="w-full mt-1 px-4 py-3
                      bg-gray-200 text-gray-900
                      border border-gray-300
                      rounded-lg
                      focus:ring-2 focus:ring-orange-500
                      [color-scheme:light]"
                      required
                    />
                  </div>

                  {/* END DATE */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={searchParams.endDate}
                      onChange={(e) => setSearchParams({...searchParams, endDate: e.target.value})}
                      className="w-full mt-1 px-4 py-3
                      bg-gray-200 text-gray-900
                      border border-gray-300
                      rounded-lg
                      focus:ring-2 focus:ring-orange-500
                      [color-scheme:light]"
                      required
                    />
                  </div>

                  {/* BUTTON */}
                  <button 
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Rechercher
                  </button>

                </div>
              </form>

            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">À propos de RentyGo</h2>
          <p className="text-gray-600 text-lg">
            RentyGo vous propose une large gamme de voitures modernes,
            adaptées à tous vos déplacements au Maroc avec un service fiable
            et des prix transparents.
          </p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            Nos avantages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: "🚗", title: "Voitures récentes", text: "Confort et sécurité garantis." },
              { icon: "💰", title: "Prix transparents", text: "Aucun frais caché." },
              { icon: "📞", title: "Support 24/7", text: "Toujours à votre écoute." }
            ].map((s, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-xl text-center shadow hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Questions fréquentes
          </h2>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border rounded-lg">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full px-6 py-4 flex justify-between items-center"
                >
                  <span className="font-medium">{f.q}</span>
                  <span className="text-orange-500 text-2xl">
                    {open === i ? "−" : "+"}
                  </span>
                </button>

                {open === i && (
                  <div className="px-6 pb-4 text-gray-600">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;