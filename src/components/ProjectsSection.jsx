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
    <section id="projets" className="py-24 md:py-40 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-left">
          <h2 className="text-[#4CAF50] font-bold tracking-widest uppercase mb-4 text-sm">
            Réalisations
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold text-[#111111] tracking-tight">
            Nos projets
          </h3>
          <p className="mt-8 text-gray-600 text-lg md:text-xl max-w-4xl leading-relaxed font-light">
            Nos réalisations dans les énergies renouvelables et l&apos;efficacité énergétique
            témoignent de l&apos;engagement de l&apos;ECA à apporter des solutions innovantes et
            pérennes, afin de procurer au citoyen un environnement sain et durable.
          </p>
        </div>
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
