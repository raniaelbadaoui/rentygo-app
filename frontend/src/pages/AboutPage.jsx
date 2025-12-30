import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-[#1f3a8a] to-[#1e40af] py-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Qui Sommes-Nous ?</h1>
        <p className="max-w-2xl mx-auto text-gray-200">
          Découvrez l’histoire de RentyGo, votre partenaire de confiance pour la
          location de véhicules depuis plus de 10 ans.
        </p>
      </section>

      {/* ================= NOTRE HISTOIRE ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Notre Histoire</h2>
            <p className="text-gray-600 mb-4">
              Fondée en 2013, RentyGo est née d’une vision simple : rendre la
              location de véhicules accessible, transparente et sans contrainte.
            </p>
            <p className="text-gray-600 mb-6">
              Nous avons commencé avec une petite flotte de 10 véhicules et une
              équipe passionnée de 3 personnes.
            </p>

            <div className="flex gap-10 mt-6">
              <div>
                <p className="text-2xl font-bold text-orange-500">500+</p>
                <p className="text-sm text-gray-500">Véhicules</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">50K+</p>
                <p className="text-sm text-gray-500">Clients</p>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9"
              alt="RentyGo"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* ================= NOS VALEURS ================= */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
          <p className="text-gray-600 mb-14">
            Chez RentyGo, nos valeurs guident chacune de nos décisions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Confiance",
                text: "Transparence totale dans nos services et nos tarifs.",
                icon: "🤝"
              },
              {
                title: "Excellence",
                text: "Des véhicules entretenus avec un service client exceptionnel.",
                icon: "⭐"
              },
              {
                title: "Durabilité",
                text: "Engagement pour un parc automobile plus écologique.",
                icon: "🌱"
              }
            ].map((v, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4 text-orange-500">{v.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-gray-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NOTRE ÉQUIPE ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Notre Équipe</h2>
          <p className="text-gray-600 mb-14">
            Les personnes passionnées derrière le succès de RentyGo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Marc Dubois", role: "Fondateur & CEO" },
              { name: "Sophie Martin", role: "Directrice Opérationnelle" },
              { name: "Thomas Leroy", role: "Directeur Technique" }
            ].map((m, i) => (
              <div key={i} className="text-center">
                <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
                  👤
                </div>
                <h4 className="font-semibold">{m.name}</h4>
                <p className="text-sm text-gray-500">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-[#0f172a] to-[#020617] py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Prêt à Nous Rejoindre ?
        </h2>
        <p className="text-gray-300 mb-8">
          Découvrez pourquoi des milliers de clients nous font confiance.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/vehicles"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
          >
            Réserver Maintenant
          </a>
          <a
            href="/contact"
            className="border border-white px-6 py-3 rounded-lg font-semibold"
          >
            Nous Contacter
          </a>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
