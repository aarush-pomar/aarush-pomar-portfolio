import { Fragment, type ComponentType } from 'react'
import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import FeatureCard from '../components/shared/FeatureCard'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  ClipboardList,
  Compass,
  ExternalLink,
  FileText,
  GraduationCap,
  Handshake,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Scale,
  ShieldQuestion,
  Store,
  Target,
  Users,
  Wallet,
} from 'lucide-react'

/* =========================
   Shared building blocks (used by both research projects)
   ========================= */

function SectionLabel({ icon: Icon, children }: { icon: ComponentType<{ className?: string; strokeWidth?: number }>; children: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50">
      <Icon className="h-4 w-4" strokeWidth={1.75} />
      {children}
    </div>
  )
}

function Dot() {
  return <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-[#D7E2EA]/50" />
}

function StatusBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border-2 border-[#D7E2EA]/40 px-4 py-1.5 text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA]/70 sm:text-xs">
      {children}
    </span>
  )
}

function ResearchQuestionBox({ question, note }: { question: string; note: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
      <SectionLabel icon={HelpCircle}>Research Question</SectionLabel>
      <p className="text-base font-medium italic text-[#D7E2EA] sm:text-lg">"{question}"</p>
      <p className="mt-3 text-xs text-[#D7E2EA]/50">{note}</p>
    </div>
  )
}

interface TimelineStage {
  label: string
  description: string
  tentative?: boolean
}

function ResearchTimeline({ stages }: { stages: TimelineStage[] }) {
  return (
    <div className="space-y-6 border-l-2 border-[#D7E2EA]/20 pl-6">
      {stages.map((stage) => (
        <div key={stage.label} className="relative">
          <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-[#0C0C0C] bg-[#D7E2EA]/60" />
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA] sm:text-sm">
            {stage.label}
            {stage.tentative && (
              <span className="ml-2 font-normal normal-case tracking-normal text-[#D7E2EA]/40">(tentative)</span>
            )}
          </p>
          <p className="mt-1 text-sm text-[#D7E2EA]/80">{stage.description}</p>
        </div>
      ))}
    </div>
  )
}

interface BulletBoxProps {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  label: string
  items: string[]
  note?: string
  twoColumn?: boolean
}

function BulletBox({ icon, label, items, note, twoColumn }: BulletBoxProps) {
  return (
    <div className="mt-6 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
      <SectionLabel icon={icon}>{label}</SectionLabel>
      <ul className={`space-y-1.5 text-sm text-[#D7E2EA]/80 ${twoColumn ? 'sm:grid sm:grid-cols-2 sm:gap-x-4 sm:space-y-2' : ''}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <Dot />
            {item}
          </li>
        ))}
      </ul>
      {note && <p className="mt-4 text-xs text-[#D7E2EA]/50">{note}</p>}
    </div>
  )
}

/* =========================
   Project 01: ICE research data
   ========================= */

const ICE_ABSTRACT =
  'This study examines how heightened immigration-enforcement activity in Minnesota created economic disruption beyond individuals directly targeted by enforcement. Focusing on small businesses in affected Minneapolis communities, the study considers perceived immigration-enforcement threat as a localized economic shock that may alter consumer demand, labor availability, and business decision-making. Existing public data documents substantial losses in business revenue and wages during Operation Metro Surge, but aggregate estimates provide limited insight into how these disruptions occurred at the firm level or how businesses responded to them. This study will combine existing economic evidence with original data from small-business owners to examine changes in customer traffic, revenue and operating conditions, employee availability, and financial adaptation. Particular attention will be given to the mechanisms through which enforcement-related uncertainty may influence economic behavior, including reduced consumer mobility, decreased participation in commercial spaces, and changes in labor supply. By documenting firm-level experiences and adaptation strategies, this research aims to complement existing estimates of economic damage with evidence explaining how immigration-enforcement concerns translated into local economic disruption.'

const ICE_FRAMEWORK: { icon: ComponentType<{ className?: string; strokeWidth?: number }>; title: string; description: string }[] = [
  {
    icon: ShieldQuestion,
    title: 'Perceived Immigration-Enforcement Threat',
    description:
      "Fear or uncertainty that enforcement could affect a business's employees, customers, families, or surrounding community -- even without a direct enforcement encounter.",
  },
  {
    icon: Users,
    title: 'Changes in Consumer and Labor Behavior',
    description:
      'Customers may limit travel, avoid commercial areas, or visit less often. Employees or owners may reduce availability or have difficulty traveling to work.',
  },
  {
    icon: Store,
    title: 'Firm-Level Economic Disruption',
    description:
      'Businesses may see lower customer traffic, declining sales, staffing shortages, reduced hours, temporary closures, or difficulty covering expenses.',
  },
  {
    icon: Handshake,
    title: 'Financial and Operational Adaptation',
    description:
      'Owners may change staffing, rely on family or informal labor, reduce hours, use savings or credit, seek grants, or draw on community support.',
  },
]

function FrameworkFlow() {
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      {ICE_FRAMEWORK.map((stage, i) => (
        <Fragment key={stage.title}>
          <div className="flex-1 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-4">
            <stage.icon className="h-5 w-5 text-[#D7E2EA]/60" strokeWidth={1.75} />
            <p className="mt-2 text-sm font-semibold text-[#D7E2EA]">{stage.title}</p>
            <p className="mt-1 text-xs text-[#D7E2EA]/70">{stage.description}</p>
          </div>
          {i < ICE_FRAMEWORK.length - 1 && (
            <ArrowRight className="mx-auto h-5 w-5 flex-shrink-0 rotate-90 text-[#D7E2EA]/30 sm:mx-0 sm:rotate-0" strokeWidth={1.75} />
          )}
        </Fragment>
      ))}
    </div>
  )
}

const ICE_PATHWAYS = [
  {
    title: 'Pathway One -- Consumer Demand and Mobility',
    description:
      'Enforcement-related fear may cause people to leave home less often, avoid certain commercial areas, postpone discretionary purchases, or reduce visits to restaurants, grocery stores, salons, retailers, and other businesses. At the firm level, this may appear as reduced customer traffic and lower sales -- a localized negative demand shock.',
  },
  {
    title: 'Pathway Two -- Labor Availability and Business Operations',
    description:
      'Employees or owners may avoid work, reduce their availability, modify their schedules, or have difficulty traveling because of enforcement-related concerns. Businesses may experience staffing shortages, shorter hours, temporary closures, or greater reliance on family and informal labor -- a labor-supply disruption alongside the demand shock.',
  },
]

const ICE_OUTCOMES: { icon: ComponentType<{ className?: string; strokeWidth?: number }>; title: string; description: string }[] = [
  {
    icon: BarChart3,
    title: 'Customer Demand and Traffic',
    description: 'Changes in customer visits, commercial participation, purchasing behavior, and sales.',
  },
  {
    icon: Briefcase,
    title: 'Labor Availability and Business Operations',
    description: 'Staffing changes, employee availability, operating hours, closures, scheduling difficulties, and reliance on alternative labor.',
  },
  {
    icon: Wallet,
    title: 'Financial Disruption',
    description: 'Broad revenue decline, cash-flow pressure, reduced inventory movement, and difficulty covering major operating expenses.',
  },
  {
    icon: Handshake,
    title: 'Business Adaptation and Community Response',
    description: 'Staffing adjustments, reduced hours, family or informal labor, savings, credit, grants, community events, and outside support.',
  },
]

const ICE_STANDARDIZED_QUESTIONS = [
  'Business sector',
  'Broad geographic area',
  'Approximate business size',
  'Customer-traffic changes',
  'Broad revenue-change ranges',
  'Staffing changes',
  'Operating-hour changes',
  'Perceived immigration-enforcement threat',
  'Financial and operational adaptation strategies',
]

const ICE_QUALITATIVE_TOPICS = [
  'What owners experienced during the enforcement period',
  'Why they believed customer or employee behavior changed',
  'What operational and financial decisions they made',
  'What helped them remain open',
  'What aggregate economic estimates fail to capture',
]

const ICE_PERCEIVED_THREAT_MEASURES = [
  'Concern that enforcement could affect employees or customers',
  'Perceived likelihood of enforcement affecting the surrounding community',
  'Frequency of enforcement-related conversations with employees or customers',
  'Uncertainty created for normal business operations',
]

const ICE_EXISTING_EVIDENCE = [
  'Operation Metro Surge occurred from December 2025 through April 2026.',
  'The City of Minneapolis identified Central and Whittier as neighborhoods experiencing especially high levels of enforcement activity.',
  'The City estimated nearly $700 million in lost economic activity during the period, including approximately $445 million in lost business revenue and $152 million in lost worker wages.',
  'Public reporting described residents avoiding work, school, medical appointments, and other activities because of enforcement-related fear.',
  "Colonial Market reportedly sold approximately 15% of its normal stock during the surge and later closed its Lake Street location after experiencing major losses.",
  'Other reporting described customer declines of approximately 70-80%, staffing shortages, altered operating schedules, and businesses relying on family, friends, grants, or community support.',
]

const ICE_EXPECTED_RELATIONSHIPS = [
  'Greater declines in customer traffic',
  'More labor or operating disruptions',
  'Greater financial pressure',
  'More extensive financial or operational adaptation',
]

const ICE_LIMITATIONS = [
  'Relationships will be treated as associations rather than proven causal effects.',
  'The study will not claim that every business loss was caused by immigration enforcement.',
  'Perceived enforcement threat will not be treated as identical to objective enforcement exposure.',
  'Participating businesses will not necessarily represent every business in Minneapolis.',
  "Business owners' observations of customer behavior cannot be connected directly to specific households.",
  'The study will not attempt to calculate the total economic cost of Operation Metro Surge.',
  'Findings will be interpreted within the geographic, temporal, and methodological limits of the study.',
]

const ICE_CURRENT_STAGE = [
  {
    title: 'Conceptual Framework Developed',
    description: 'The central exposure, proposed mechanisms, outcome areas, and intended contribution have been defined.',
  },
  {
    title: 'Existing Evidence Review',
    description: 'Public economic assessments, reporting, and related research are being organized and evaluated.',
  },
  {
    title: 'Research Design Development',
    description: 'Standardized business questions and a possible qualitative interview component are being developed.',
  },
  {
    title: 'Ethical and Feasibility Planning',
    description: 'Recruitment, participant privacy, ethical requirements, and the feasibility of original data collection are being considered.',
  },
  {
    title: 'Future Original Data Collection',
    description: 'The next major stage may involve gathering standardized and qualitative information from small-business owners.',
  },
]

const ICE_TIMELINE: TimelineStage[] = [
  {
    label: 'Initial Observation and Topic Development',
    description: 'Recognized that immigration-enforcement concerns appeared to affect customers, workers, and businesses beyond those directly targeted.',
  },
  {
    label: 'Background Research',
    description: 'Reviewed existing economic estimates, city assessments, public reporting, and examples of business disruption.',
  },
  {
    label: 'Conceptual Framework Development',
    description: 'Narrowed the study to small businesses and defined perceived immigration-enforcement threat as the primary exposure.',
  },
  {
    label: 'Current Stage',
    description: 'Refining the methodology, standardized questions, qualitative component, ethical considerations, and recruitment strategy.',
  },
  {
    label: 'Potential Future Stages',
    description: 'Original data collection, analysis, interpretation, academic writing, feedback, revision, and possible submission for publication.',
    tentative: true,
  },
]

/* =========================
   Project 02: Caste research data
   ========================= */

const CASTE_INQUIRY_AREAS = [
  "Knowledge of one's family caste background",
  'Frequency and openness of caste-related discussions within families',
  'Differences in caste awareness across generations',
  'Experiences with caste-based assumptions, exclusion, or discrimination',
  'Attempts to infer caste through surnames, vegetarianism, religion, language, regional background, or ancestral village',
  'Whether caste identity is declining, persisting, or adapting into subtler forms',
  'How caste interacts with immigration, culture, race, religion, and South Asian American identity',
]

const CASTE_CURRENT_STAGE = [
  'Reviewing the existing psychological literature on South Asian American identity and caste.',
  'Refining the research question and defining concepts such as caste literacy, awareness, identity, and bias.',
  'Evaluating the ethical requirements and feasibility of conducting a survey involving human participants.',
  'Developing a rigorous, long-term research plan with guidance from Dr. Zubin DeVitre.',
]

const MENTORSHIP_AREAS = [
  'South Asian American identity scholarship',
  'Psychological research methods',
  'Research ethics',
  'Literature review',
  'Study development',
  'Establishing realistic expectations for long-term academic research',
]

const CASTE_TIMELINE: TimelineStage[] = [
  {
    label: 'Summer 2026',
    description: 'Initial topic development, preliminary research ideas, and outreach to a research mentor.',
  },
  {
    label: 'Fall 2026',
    description: 'Foundational reading, literature review, mentorship development, and refinement of the research question.',
  },
  {
    label: '2026 -- 2027',
    description: 'Methodology development, ethical planning, survey design, and evaluation of potential community partnerships.',
  },
  {
    label: 'Potential Future Stages',
    description: 'Data collection, analysis, academic writing, feedback, revision, and exploration of publication opportunities.',
    tentative: true,
  },
]

const FOUNDATIONAL_READING = [
  {
    href: 'https://psycnet.apa.org/record/2014-29975-001',
    label: 'APA PsycNet',
  },
  {
    href: "https://www.researchgate.net/publication/400351490_What's_Out_There_A_Scoping_Review_Addressing_the_Availability_of_South_Asian_American_Psychological_Literature_Within_the_Past_Decade",
    label:
      '"What\'s Out There? A Scoping Review Addressing the Availability of South Asian American Psychological Literature Within the Past Decade"',
  },
]

export default function ResearchPage() {
  return (
    <PageLayout>
      <PageHeader title="Research" />

      <div className="flex flex-col gap-8 pb-10 pt-4 sm:gap-10">
        {/* ============ Project 01: ICE ============ */}
        <FeatureCard
          number="01"
          category="Ongoing Research -- Mentor: Prof. Miguel Quiñones, University of Minnesota Twin Cities"
          title="Economic Fallout and Financial Adaptation in the Wake of ICE Activity in Minnesota"
        >
          <StatusBadge>Ongoing Research -- Study Design &amp; Original Data Preparation</StatusBadge>

          <details className="group mt-6 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50 marker:content-none [&::-webkit-details-marker]:hidden">
              <FileText className="h-4 w-4" strokeWidth={1.75} />
              Read Abstract
              <span className="ml-auto text-[#D7E2EA]/30 transition-transform group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-[#D7E2EA]/85">{ICE_ABSTRACT}</p>
          </details>

          <ResearchQuestionBox
            question="How did perceived immigration-enforcement threat during Operation Metro Surge relate to economic disruption and financial adaptation among small businesses in affected Minneapolis communities?"
            note="The study focuses its original data collection on small businesses as its primary unit of analysis. Household and consumer behavior remain important because they may help explain changes in business demand, but the study will use existing evidence and business owners' observations rather than recruit a separate household sample."
          />

          <div className="mt-6">
            <SectionLabel icon={Lightbulb}>Why I'm Studying This</SectionLabel>
            <p>
              My interest in this issue developed through conversations and experiences in the communities
              surrounding my barbering business. Immigration-enforcement concerns were not experienced only as
              a political or legal issue -- they affected whether people felt comfortable leaving home, going
              to work, visiting businesses, and participating in everyday economic life. Watching these
              concerns reach customers, workers, and local businesses led me to investigate the broader
              economic consequences of enforcement-related uncertainty.
            </p>
          </div>

          <div className="mt-6">
            <SectionLabel icon={Compass}>Conceptual Framework</SectionLabel>
            <FrameworkFlow />
            <p className="mt-3 text-xs text-[#D7E2EA]/50">
              This is a proposed conceptual framework. It represents relationships the study will investigate,
              not causal relationships that have already been proven.
            </p>
          </div>

          <div className="mt-6">
            <SectionLabel icon={ShieldQuestion}>Defining the Exposure</SectionLabel>
            <p>
              The primary exposure in this study is perceived immigration-enforcement threat rather than the
              simple presence or absence of ICE activity. Objective enforcement activity and perceived threat
              are related, but they are not identical. A business may operate in an area with documented
              enforcement activity while reporting limited concern; another may experience significant
              disruption because employees, customers, families, or community members fear enforcement, even
              without a direct encounter at the business.
            </p>
            <p className="mt-3 text-xs text-[#D7E2EA]/50">
              Documented enforcement activity provides geographic and historical context, but it does not
              prove that an individual business experienced enforcement directly.
            </p>

            <div className="mt-4 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50">
                If a quantitative component is used, perceived threat may be measured through
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#D7E2EA]/80">
                {ICE_PERCEIVED_THREAT_MEASURES.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Dot />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[#D7E2EA]/50">
                If these measures function together appropriately, they could potentially form an exploratory
                Perceived Immigration-Enforcement Threat Index -- a possibility under consideration, not a
                finalized or validated measurement tool.
              </p>
            </div>

            <p className="mt-3">
              This is distinct from a later attribution question: <em>"To what extent do you believe
              immigration-enforcement concerns contributed to the business changes you observed?"</em> The
              study will first document what changed, and only then ask owners what they believe contributed
              to those changes.
            </p>
          </div>

          <div className="mt-6">
            <SectionLabel icon={Scale}>Economic Mechanisms</SectionLabel>
            <div className="grid gap-4 sm:grid-cols-2">
              {ICE_PATHWAYS.map((pathway) => (
                <div key={pathway.title} className="rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
                  <p className="text-sm font-semibold text-[#D7E2EA]">{pathway.title}</p>
                  <p className="mt-2 text-sm text-[#D7E2EA]/80">{pathway.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <SectionLabel icon={Target}>Main Outcome Areas</SectionLabel>
            <div className="grid gap-4 sm:grid-cols-2">
              {ICE_OUTCOMES.map((outcome) => (
                <div key={outcome.title} className="rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
                  <outcome.icon className="h-5 w-5 text-[#D7E2EA]/60" strokeWidth={1.75} />
                  <p className="mt-2 text-sm font-semibold text-[#D7E2EA]">{outcome.title}</p>
                  <p className="mt-1 text-sm text-[#D7E2EA]/80">{outcome.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#D7E2EA]/50">
              These outcomes preserve both parts of the project's title: the economic fallout experienced by
              businesses, and the financial and operational strategies they used to adapt.
            </p>
          </div>

          <div className="mt-6">
            <SectionLabel icon={ClipboardList}>Proposed Approach</SectionLabel>
            <p>
              The study will focus original data collection on a smaller, thoughtfully selected group of small
              businesses in Minneapolis communities that experienced substantial disruption during Operation
              Metro Surge. The current research design may combine a short, standardized set of business
              questions, semi-structured interviews, structured written responses, and a combination of
              quantitative and qualitative information, depending on feasibility and methodological
              appropriateness.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50">
                  Standardized Questions May Gather
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#D7E2EA]/80">
                  {ICE_STANDARDIZED_QUESTIONS.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Dot />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50">
                  The Qualitative Component May Explore
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#D7E2EA]/80">
                  {ICE_QUALITATIVE_TOPICS.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Dot />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#D7E2EA]/50">
              The research instrument, interview protocol, sample, and recruitment strategy have not been
              finalized.
            </p>
          </div>

          <div className="mt-6">
            <SectionLabel icon={Users}>Role of Household Behavior</SectionLabel>
            <p>
              Households will not be recruited as a second original sample. Consumer behavior remains part of
              the conceptual framework because reduced mobility and commercial participation may produce a
              negative demand shock for businesses -- but this component will be examined using existing
              research, public reporting, city data, and business owners' observations. If public evidence
              indicates that residents stayed home while business owners report lower customer traffic, those
              findings may be described as consistent with the proposed demand mechanism. They will not be
              presented as proof that particular households caused particular business outcomes.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <SectionLabel icon={BookOpen}>Existing Economic Context</SectionLabel>
              <span className="mb-3 inline-flex items-center rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA]/50">
                Public Data -- Not Original Research
              </span>
            </div>
            <ul className="space-y-1.5 text-sm text-[#D7E2EA]/80">
              {ICE_EXISTING_EVIDENCE.map((item) => (
                <li key={item} className="flex gap-2">
                  <Dot />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2 rounded-xl border border-[#D7E2EA]/15 bg-[#0C0C0C] p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#D7E2EA]/50" strokeWidth={1.75} />
              <p className="text-xs text-[#D7E2EA]/60">
                The exact size and calculation of the City's aggregate estimate have been questioned -- one
                economist interviewed in public reporting raised the possibility that combining certain revenue
                and wage losses could involve double counting. The $700 million figure should not be treated as
                an uncontested measurement.
              </p>
            </div>
            <p className="mt-3 text-xs text-[#D7E2EA]/50">
              Figures above are drawn from City of Minneapolis economic assessments and public news reporting
              on Operation Metro Surge. Source links will be added as they are compiled and verified.
            </p>
          </div>

          <div className="mt-6">
            <SectionLabel icon={Target}>Research Gap</SectionLabel>
            <p>
              Existing assessments provide important estimates of how much economic activity, business
              revenue, and worker income may have been lost. However, aggregate figures offer limited insight
              into the firm-level mechanisms behind those losses. They cannot fully explain why customers
              stopped visiting particular businesses, how employee availability changed, how owners interpreted
              these disruptions, what financial decisions they made, or which strategies helped them remain
              open.
            </p>
            <p className="mt-3">
              This study is not intended to produce another citywide estimate of the total economic cost.
              Instead, it seeks to connect community-level economic statistics with firm-level experiences,
              economic behavior, and business decision-making.
            </p>
            <div className="mt-4 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
              <p className="text-base font-medium italic text-[#D7E2EA] sm:text-lg">
                "Rather than asking only how much economic activity was lost, this project asks how
                enforcement-related uncertainty translated into changes in consumer demand, labor availability,
                business operations, and financial adaptation."
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
            <SectionLabel icon={ArrowRight}>Expected Relationships</SectionLabel>
            <p className="text-sm text-[#D7E2EA]/80">
              Businesses reporting greater perceived immigration-enforcement threat are expected to also tend
              to report:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-[#D7E2EA]/80">
              {ICE_EXPECTED_RELATIONSHIPS.map((item) => (
                <li key={item} className="flex gap-2">
                  <Dot />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[#D7E2EA]/50">
              Businesses experiencing greater disruption may report strategies such as staffing changes,
              informal labor arrangements, use of savings or credit, grant assistance, or community support.
              Qualitative accounts may help explain how and why these relationships developed. These are
              expected associations, not established findings.
            </p>
          </div>

          <BulletBox icon={AlertTriangle} label="Scope and Limitations" items={ICE_LIMITATIONS} />

          <div className="mt-6 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
            <SectionLabel icon={Compass}>Current Stage</SectionLabel>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-[#D7E2EA]/80">
              {ICE_CURRENT_STAGE.map((item) => (
                <li key={item.title}>
                  <span className="font-semibold text-[#D7E2EA]">{item.title}.</span> {item.description}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6">
            <SectionLabel icon={Calendar}>Project Timeline</SectionLabel>
            <ResearchTimeline stages={ICE_TIMELINE} />
          </div>
        </FeatureCard>

        {/* ============ Project 02: Caste ============ */}
        <FeatureCard
          number="02"
          category="Research -- Mentor: Dr. Zubin DeVitre, University of Wisconsin–Madison"
          title="Caste Awareness and Identity Across Generations in Minnesota's South Asian Diaspora"
        >
          <StatusBadge>Early-Stage Research</StatusBadge>

          <p className="mt-6">
            This developing research project examines how caste is understood, discussed, and
            experienced across generations within Minnesota's South Asian diaspora. The
            proposed study will explore possible differences between first-generation
            immigrants and second- or third-generation South Asian Americans -- particularly in
            how individuals understand their family's caste background, encounter conversations
            about caste, and recognize subtle expressions of caste identity or bias.
          </p>
          <p>
            The project is motivated by the possibility that caste can remain influential even
            when it isn't openly discussed. Younger generations may appear less connected to
            traditional caste structures while still encountering indirect signals through
            surnames, dietary practices, religion, regional background, ancestral villages,
            family expectations, or social networks. The research will investigate whether
            caste identity is becoming less influential across generations, or evolving into
            subtler and less visible forms within the United States.
          </p>

          <ResearchQuestionBox
            question="How do knowledge, discussion, and perceptions of caste differ between first-generation South Asian immigrants and second- or third-generation South Asian Americans in Minnesota?"
            note="This is a developing research question that may evolve as the literature review and methodological planning continue."
          />

          <div className="mt-6">
            <SectionLabel icon={Lightbulb}>Why I'm Studying This</SectionLabel>
            <p>
              My interest in this subject began after witnessing caste divisions affect
              relationships within my own community. The experience made me question how a
              system often associated with South Asia continues to influence people after they
              immigrate to the United States -- and whether younger generations are moving
              beyond caste, or encountering it through newer and less visible forms.
            </p>
          </div>

          <BulletBox
            icon={ListChecks}
            label="Proposed Areas of Inquiry"
            items={CASTE_INQUIRY_AREAS}
            note="These are proposed areas of study, not finalized survey questions or established findings."
            twoColumn
          />

          <div className="mt-6">
            <SectionLabel icon={ClipboardList}>Proposed Approach</SectionLabel>
            <p>
              The current concept involves developing an anonymous digital survey for members of
              Minnesota's South Asian community, comparing first-generation immigrants with
              second- or third-generation members of the diaspora. Possible distribution
              partners may include South Asian community organizations, the India Association of
              Minnesota, and South Asian student groups at Minnesota colleges -- these are
              potential partners only, and no organization has agreed to participate.
            </p>
            <p className="mt-3 text-xs text-[#D7E2EA]/50">
              The methodology, participant criteria, survey questions, recruitment process, and
              analysis plan have not yet been finalized. Any research involving human
              participants will move forward only after the appropriate ethical and
              institutional requirements have been identified and addressed.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
            <SectionLabel icon={Compass}>Current Stage</SectionLabel>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-[#D7E2EA]/80">
              {CASTE_CURRENT_STAGE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-[#D7E2EA]/50">
              One challenge is the limited amount of psychological research specifically
              examining caste within South Asian American communities -- which makes the
              literature-review stage especially important.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-[#D7E2EA]/20 bg-[#141414] p-5">
            <SectionLabel icon={GraduationCap}>Research Mentor</SectionLabel>
            <p className="font-semibold text-[#D7E2EA]">Dr. Zubin DeVitre</p>
            <p className="text-sm text-[#D7E2EA]/70">
              Teaching Faculty, Department of Counseling Psychology -- University of
              Wisconsin–Madison
            </p>
            <p className="mt-3">
              Dr. DeVitre's work examines South Asian American identity and mental health,
              including the interaction of caste, colonial history, religion, race, and culture.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50">
              Mentorship Areas
            </p>
            <ul className="mt-2 grid gap-1.5 text-sm text-[#D7E2EA]/80 sm:grid-cols-2">
              {MENTORSHIP_AREAS.map((area) => (
                <li key={area} className="flex gap-2">
                  <Dot />
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[#D7E2EA]/50">
              Mentor Academics is helping formalize this mentorship relationship.
            </p>
          </div>

          <div className="mt-6">
            <SectionLabel icon={BookOpen}>Foundational Reading</SectionLabel>
            <p className="mb-3 text-xs text-[#D7E2EA]/50">
              Part of the project's developing literature review.
            </p>
            <ul className="space-y-2 text-sm">
              {FOUNDATIONAL_READING.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-1.5 text-[#D7E2EA] underline decoration-[#D7E2EA]/30 underline-offset-4 transition-colors hover:text-[#BBCCD7]"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <SectionLabel icon={Calendar}>Research Timeline</SectionLabel>
            <ResearchTimeline stages={CASTE_TIMELINE} />
          </div>
        </FeatureCard>
      </div>
    </PageLayout>
  )
}
