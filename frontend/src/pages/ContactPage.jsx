import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "Téléphone",
      details: "+212 5 22 22 22 22",
      description: "Disponible 24h/24, 7j/7",
    },
    {
      icon: "✉️",
      title: "Email",
      details: "contact@rentygo.ma",
      description: "Réponse sous 24h",
    },
    {
      icon: "🏢",
      title: "Adresse",
      details: "123 Avenue Mohammed V, Casablanca",
      description: "Agence principale",
    },
    {
      icon: "⏰",
      title: "Horaires",
      details: "Lun - Ven : 8h - 20h",
      description: "Sam - Dim : 9h - 18h",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO (SAME COLOR AS OTHER PAGES) */}
      <section className="bg-gradient-to-r from-[#1f2a44] to-[#2c3e66] py-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Contactez-Nous
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Notre équipe RentyGo est disponible 24h/24 et 7j/7 pour répondre à toutes
          vos questions et vous accompagner dans vos démarches de location.
        </p>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Nos coordonnées
            </h2>

            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-3xl mr-4">{info.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-700 font-medium mb-1">
                      {info.details}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SOCIAL */}
            <div className="mt-12">
              <h3 className="font-bold text-gray-800 text-lg mb-4">
                Suivez-nous
              </h3>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  f
                </div>
                <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center">
                  ig
                </div>
                <div className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center">
                  in
                </div>
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center">
                  ▶
                </div>
              </div>
            </div>

            {/* EMERGENCY */}
            <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
              <h4 className="font-bold text-red-700 mb-2">
                🚨 Urgence 24h/24
              </h4>
              <p className="text-red-600 text-sm mb-3">
                Accident, panne ou assistance routière
              </p>
              <a
                href="tel:+212611111111"
                className="text-lg font-bold text-red-700"
              >
                +212 6 11 11 11 11
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Envoyez-nous un message
              </h2>

              {success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    Message envoyé avec succès
                  </h3>
                  <p className="text-green-600 mb-4">
                    Nous vous répondrons rapidement.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="underline text-green-700"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nom complet *"
                      required
                      className="input"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      required
                      className="input"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Téléphone"
                      className="input"
                    />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      <option value="">Sujet *</option>
                      <option value="reservation">Réservation</option>
                      <option value="modification">Modification</option>
                      <option value="annulation">Annulation</option>
                      <option value="paiement">Paiement</option>
                      <option value="assistance">Assistance</option>
                    </select>
                  </div>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                    placeholder="Votre message *"
                    className="input mb-6"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                  >
                    {loading ? "Envoi..." : "Envoyer le message"}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ LINK */}
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 mb-1">
                ❓ Questions fréquentes
              </h3>
              <p className="text-blue-700 mb-3">
                Consultez notre FAQ pour des réponses rapides
              </p>
              <a href="/faq" className="underline text-blue-600 font-medium">
                Voir la FAQ →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
