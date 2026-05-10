function formatDate(date) {
  return new Intl.DateTimeFormat('fr-DZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function NewsSection({ posts }) {
  if (!posts?.length) {
    return null
  }

  return (
    <section className="bg-white py-16 md:py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <header className="mb-12 text-left md:mb-20">
          <p id="actualites" className="section-anchor eca-kicker">
            Actualités
          </p>
          <h2 className="eca-section-title">Les dernières nouvelles</h2>
          <div className="eca-title-bar eca-title-bar--accent" />
          <p className="mt-6 max-w-4xl text-base font-light leading-relaxed text-gray-600 md:mt-8 md:text-lg lg:text-xl">
            Suivez les actions, rencontres et initiatives portées par Energy Cities Algeria pour
            accompagner la transition énergétique des territoires.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-[#f9f9f9] shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0" />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <time className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4CAF50]">
                  {formatDate(post.publishedAt)}
                </time>
                <h3 className="mb-4 text-xl font-bold text-[#111111]">{post.title}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                <p className="text-sm leading-relaxed text-gray-500">{post.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
