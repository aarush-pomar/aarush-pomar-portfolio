import SiteNav from '../components/shared/SiteNav'
import type { ReactNode } from 'react'

interface ResearchEntry {
  id?: string
  title: ReactNode
  meta: ReactNode
  abstract: ReactNode[]
}

function ResearchEntry({ entry, isFirst }: { entry: ResearchEntry; isFirst: boolean }) {
  return (
    <div id={entry.id} className="scroll-mt-24">
      {!isFirst && <hr className="border-t border-[#1a1a1a]/15" />}
      <div className={`${isFirst ? '' : 'pt-10'} pb-10`}>
        <p className="font-bitter text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]/55">
          Pomar, A.
        </p>
        <h2 className="font-bitter mt-2 text-2xl font-black italic leading-tight text-[#1a1a1a] sm:text-3xl md:text-4xl">
          &ldquo;{entry.title}&rdquo;
        </h2>
        <p className="font-bitter mt-3 text-sm leading-relaxed text-[#1a1a1a]/70 sm:text-base">
          {entry.meta}
        </p>
      </div>

      <hr className="border-t border-[#1a1a1a]/15" />

      <div className="space-y-6 pb-2 pt-10">
        <h2 className="font-bitter text-2xl font-black uppercase tracking-wide text-[#1a1a1a] sm:text-3xl">
          Abstract
        </h2>
        {entry.abstract.map((paragraph, i) => (
          <p key={i} className="font-bitter text-base leading-loose text-[#1a1a1a]/85 sm:text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

const ENTRIES: ResearchEntry[] = [
  {
    title: 'Economic Fallout and Financial Adaptation in the Wake of ICE Activity in Minnesota',
    meta: (
      <>
        (In Process). Mentor: Professor Miguel Qui&ntilde;ones, University of Minnesota Twin
        Cities.
      </>
    ),
    abstract: [
      <>
        This study examines how concerns about immigration enforcement may affect small
        businesses in Minneapolis communities affected by Operation Metro Surge. It asks whether
        customers avoiding commercial spaces and changes in worker availability are linked to
        shifts in customer traffic, revenue, staffing, and operating hours.
      </>,
      <>
        The research also explores how business owners respond to financial uncertainty,
        including using savings or credit, adjusting staffing, and seeking community support.
        Drawing on existing economic research and public reporting, it connects broader estimates
        of economic disruption with questions about individual businesses and their
        owners&rsquo; decisions. The focus is on how fear of enforcement may influence local
        economic activity and the choices businesses make to stay open.
      </>,
    ],
  },
  {
    id: 'caste-research',
    title: 'Caste Awareness and Identity Across Generations in Minnesota’s South Asian Diaspora',
    meta: (
      <>
        (In Process). Mentor: Dr. Zubin DeVitre,
        University of Wisconsin&ndash;Madison.
      </>
    ),
    abstract: [
      <>
        This study explores how South Asian families in Minnesota understand and discuss caste
        across generations. It compares first-generation immigrants with second- and
        third-generation South Asian Americans, asking what people know about their
        family&rsquo;s caste background, how often caste comes up in conversation, and how it
        shapes their sense of identity.
      </>,
      <>
        The research examines whether caste becomes less influential across generations or
        continues through social expectations and assumptions about surnames, food, religion,
        language, and regional background. It also considers experiences of caste-based exclusion
        and differences between how parents and younger generations approach the subject. An
        anonymous survey will explore these questions, with the aim of understanding how caste
        awareness changes&mdash;or persists&mdash;within Minnesota&rsquo;s South Asian diaspora.
      </>,
    ],
  },
]

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      <SiteNav />

      <main className="mx-auto max-w-4xl px-6 py-12 font-bitter sm:py-16">
        <header className="pb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Research</h1>
          <p className="mt-3 text-base italic text-[#1a1a1a]/60 sm:text-lg">
            Two ongoing, mentored research projects
          </p>
        </header>

        {ENTRIES.map((entry, i) => (
          <ResearchEntry key={i} entry={entry} isFirst={i === 0} />
        ))}
      </main>
    </div>
  )
}
