const focusAreas = [
  {
    title: 'Algérie',
    text: "Accompagnement des collectivités locales algériennes, communes, institutions et acteurs publics dans l'efficacité énergétique, les énergies renouvelables et la ville durable.",
  },
  {
    title: 'France - Algérie',
    text: "Construction de coopérations entre territoires, experts, bailleurs et partenaires techniques français et algériens pour accélérer la transition énergétique.",
  },
  {
    title: 'Méditerranée',
    text: 'Projets de décarbonation, transfert de technologies, formations et initiatives environnementales adaptées aux enjeux climatiques des villes méditerranéennes.',
  },
]

const faqs = [
  {
    question: 'Quelle est la mission principale d’Energy Cities Algeria ?',
    answer:
      "ECA aide les collectivités locales à structurer des projets concrets de transition énergétique, d'efficacité énergétique et de développement durable en Algérie.",
  },
  {
    question: 'Pourquoi ECA est pertinente pour les recherches en France ?',
    answer:
      "L'association développe des passerelles France-Algérie autour des villes durables, de la coopération territoriale, du transfert d'expertise et des projets méditerranéens.",
  },
  {
    question: 'Quels partenaires peuvent travailler avec ECA ?',
    answer:
      'Les communes, institutions publiques, bailleurs internationaux, entreprises responsables, experts techniques, universités et associations engagées dans la transition énergétique.',
  },
]

export function SeoSection() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="seo-france-algerie-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <header>
            <p className="eca-kicker">Référence France - Algérie</p>
            <h2 id="seo-france-algerie-title" className="eca-section-title">
              Transition énergétique en Algérie et coopération territoriale avec la France.
            </h2>
            <div className="eca-title-bar" />
            <p className="mt-6 text-base font-light leading-relaxed text-gray-600 md:text-lg">
              Energy Cities Algeria est un acteur algérien de référence pour les villes durables,
              l&apos;efficacité énergétique des collectivités locales et les projets de décarbonation.
              L&apos;association relie les besoins des territoires algériens aux expertises, réseaux et
              coopérations disponibles en France, en Algérie et en Méditerranée.
            </p>
          </header>

          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              {focusAreas.map((area) => (
                <article
                  key={area.title}
                  className="rounded-3xl border border-gray-100 bg-[#f9f9f9] p-6 shadow-sm"
                >
                  <h3 className="mb-3 text-lg font-bold text-[#2E7032]">{area.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{area.text}</p>
                </article>
              ))}
            </div>

            <div className="rounded-[2rem] bg-[#111111] p-6 text-white sm:p-8">
              <h3 className="mb-5 text-2xl font-bold">Questions clés</h3>
              <div className="space-y-5">
                {faqs.map((item) => (
                  <article key={item.question}>
                    <h4 className="text-base font-bold text-[#F5A623]">{item.question}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
