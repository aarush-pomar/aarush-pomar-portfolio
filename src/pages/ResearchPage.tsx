import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import FeatureCard from '../components/shared/FeatureCard'

function StatusBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border-2 border-[#D7E2EA]/40 px-4 py-1.5 text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA]/70 sm:text-xs">
      {children}
    </span>
  )
}

function MentorLine({ mentor, affiliation }: { mentor: string; affiliation: string }) {
  return (
    <p className="text-sm text-[#D7E2EA]/60">
      Student Researcher: Aarush Pomar &middot; Mentor: {mentor}, {affiliation}
    </p>
  )
}

export default function ResearchPage() {
  return (
    <PageLayout>
      <PageHeader title="Research" subtitle="Two ongoing, mentored research projects" />

      <div className="flex flex-col gap-8 pb-10 pt-4 sm:gap-10">
        <FeatureCard
          category="Ongoing Research"
          title="Economic Fallout and Financial Adaptation in the Wake of ICE Activity in Minnesota"
        >
          <MentorLine mentor="Professor Miguel Quiñones" affiliation="University of Minnesota Twin Cities" />
          <div className="mt-4">
            <StatusBadge>Ongoing -- Research Design &amp; Evidence Review</StatusBadge>
          </div>

          <p className="mt-6">
            This study examines how concerns about immigration enforcement may affect small
            businesses in Minneapolis communities affected by Operation Metro Surge. It asks
            whether customers avoiding commercial spaces and changes in worker availability are
            linked to shifts in customer traffic, revenue, staffing, and operating hours.
          </p>
          <p className="mt-4">
            The research also explores how business owners respond to financial uncertainty,
            including using savings or credit, adjusting staffing, and seeking community support.
            Drawing on existing economic research and public reporting, it connects broader
            estimates of economic disruption with questions about individual businesses and their
            owners&rsquo; decisions. The focus is on how fear of enforcement may influence local
            economic activity and the choices businesses make to stay open.
          </p>
        </FeatureCard>

        <FeatureCard
          id="caste-research"
          category="Research"
          title="Caste Awareness and Identity Across Generations in Minnesota's South Asian Diaspora"
        >
          <MentorLine mentor="Dr. Zubin DeVitre" affiliation="University of Wisconsin–Madison" />
          <div className="mt-4">
            <StatusBadge>Early Stage -- Literature Review &amp; Study Development</StatusBadge>
          </div>

          <p className="mt-6">
            This study explores how South Asian families in Minnesota understand and discuss
            caste across generations. It compares first-generation immigrants with second- and
            third-generation South Asian Americans, asking what people know about their
            family&rsquo;s caste background, how often caste comes up in conversation, and how it
            shapes their sense of identity.
          </p>
          <p className="mt-4">
            The research examines whether caste becomes less influential across generations or
            continues through social expectations and assumptions about surnames, food, religion,
            language, and regional background. It also considers experiences of caste-based
            exclusion and differences between how parents and younger generations approach the
            subject. An anonymous survey will explore these questions, with the aim of
            understanding how caste awareness changes&mdash;or persists&mdash;within
            Minnesota&rsquo;s South Asian diaspora.
          </p>
        </FeatureCard>
      </div>
    </PageLayout>
  )
}
