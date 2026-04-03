import { ecaProjects } from '../data/siteContent'

function ProjectImage({ project, title }) {
  const fallback = project.imageFallback

  return (
    <img
      src={project.image}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
      onError={(e) => {
        const el = e.currentTarget
        if (fallback && !el.dataset.fallback) {
          el.dataset.fallback = '1'
          el.src = fallback
        }
      }}
    />
  )
}

export function ProjectsSection() {
  return (
    <section className="bg-[#f9f9f9] py-16 md:py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <header className="mb-12 text-left md:mb-20">
          <p id="projets" className="section-anchor eca-kicker">
            Réalisations
          </p>
          <h2 className="eca-section-title">Nos projets</h2>
          <div className="eca-title-bar" />
          <p className="mt-6 max-w-4xl text-base font-light leading-relaxed text-gray-600 md:mt-8 md:text-lg lg:text-xl">
            Nos réalisations dans les énergies renouvelables et l&apos;efficacité énergétique
            témoignent de l&apos;engagement de l&apos;ECA à apporter des solutions innovantes et
            pérennes, afin de procurer au citoyen un environnement sain et durable.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecaProjects.map((p) => (
            <article
              key={p.title}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="aspect-video overflow-hidden relative">
                <ProjectImage project={p} title={p.title} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-3">{p.title}</h4>
                <p className="text-gray-500 mb-6 text-sm flex-grow leading-relaxed">
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
