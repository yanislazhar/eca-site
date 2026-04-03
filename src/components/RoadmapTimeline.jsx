/**
 * Frise chronologique : segments de ligne qui se rejoignent + pastilles centrées sur la ligne.
 */
export function RoadmapTimeline({ steps }) {
  const n = steps.length

  return (
    <div className="w-full overflow-x-auto pb-3 [-webkit-overflow-scrolling:touch] md:overflow-visible">
      <ol className="flex min-w-[920px] md:min-w-0" role="list">
        {steps.map((step, i) => {
          const isFirst = i === 0
          const isLast = i === n - 1

          let segmentClass =
            'absolute top-1/2 h-[3px] -translate-y-1/2 bg-[#F5A623]/75 shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
          if (n === 1) {
            segmentClass += ' left-6 right-6 rounded-full'
          } else if (isFirst) {
            segmentClass += ' left-1/2 right-0 rounded-l-full'
          } else if (isLast) {
            segmentClass += ' left-0 right-1/2 rounded-r-full'
          } else {
            segmentClass += ' left-0 right-0'
          }

          return (
            <li
              key={step.year + step.title}
              className="group relative flex min-w-0 flex-1 flex-col items-stretch px-1 md:px-2"
            >
              <div className="relative h-16 w-full shrink-0">
                <div className={segmentClass} aria-hidden />
                <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                  <span
                    className="box-border block h-4 w-4 rounded-full border-[3px] border-[#F5A623] bg-white shadow-[0_0_0_4px_#ffffff] transition duration-300 group-hover:scale-110 group-hover:border-[#d4941a] group-hover:bg-[#F5A623] md:h-[18px] md:w-[18px] md:border-[3px]"
                    aria-hidden
                  />
                </div>
              </div>

              <div className="mt-1 w-full text-center md:mt-2 md:text-left">
                <p className="text-base font-bold tabular-nums text-[#F5A623] md:text-lg">{step.year}</p>
                <h4 className="mt-2 text-base font-bold leading-snug text-[#111111] md:text-lg">
                  {step.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-gray-500 md:text-sm">{step.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
