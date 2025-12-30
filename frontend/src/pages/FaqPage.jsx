import React, { useState } from "react";

const categories = [
  { label: "Réservation", icon: "🚗" },
  { label: "Assurance", icon: "🛡️" },
  { label: "Paiement", icon: "💳" },
  { label: "Support", icon: "🎧" },
];

const faqs = [
  {
    question: "Comment réserver un véhicule ?",
    answer:
      "Sélectionnez vos dates, choisissez votre véhicule dans notre liste, ajoutez vos options et finalisez votre réservation en quelques clics.",
  },
  {
    question: "Puis-je modifier ma réservation ?",
    answer:
      "Oui, vous pouvez modifier ou annuler votre réservation gratuitement jusqu’à 48h avant la date de début.",
  },
  {
    question: "Quelles assurances proposez-vous ?",
    answer:
      "Nous proposons une assurance de base incluse ainsi que des options Premium et Zéro Franchise.",
  },
  {
    question: "Quels documents dois-je présenter ?",
    answer:
      "Un permis de conduire valide, une pièce d’identité et une carte bancaire au nom du conducteur principal.",
  },
  {
    question: "Comment fonctionne le remboursement ?",
    answer:
      "La caution est libérée sous 5 à 7 jours après restitution du véhicule si aucun dommage n’est constaté.",
  },
  {
    question: "Y a-t-il des frais cachés ?",
    answer:
      "Non. Tous nos prix sont transparents et affichés avant la confirmation.",
  },
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-[#0f2a5c] to-[#102a63] py-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Questions Fréquentes</h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Trouvez rapidement les réponses à toutes vos questions sur la location
          de véhicules avec RentyGo
        </p>
      </section>

      {/* ================= SEARCH ================= */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <input
          type="text"
          placeholder="🔍 Recherchez votre question..."
          className="w-full px-6 py-4 rounded-xl border border-gray-300
          bg-white text-gray-800 shadow focus:outline-none
          focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* ================= CATEGORIES ================= */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-3xl mb-3 text-orange-500">{cat.icon}</div>
              <p className="font-semibold">{cat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ LIST ================= */}
      <section className="max-w-4xl mx-auto px-6 mt-16 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow"
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full px-6 py-5 flex justify-between items-center text-left"
            >
              <span className="font-semibold text-gray-800">
                {faq.question}
              </span>
              <span className="text-orange-500 text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-600 border-t">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-[#0b1220] to-[#111827] text-white py-16 mt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-gray-300 mb-8">
            Notre équipe support est disponible 24h/24 et 7j/7
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
            >
              📩 Nous contacter
            </a>
            <a
              href="tel:+212500000000"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
            >
              📞 Appeler maintenant
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FaqPage;
