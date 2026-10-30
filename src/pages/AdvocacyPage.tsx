import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import FeatureCard from '../components/shared/FeatureCard'
import PillLink from '../components/shared/PillLink'
import Lightbox, { EnlargeHint } from '../components/shared/Lightbox'
import borgenCheck from '../assets/photos/borgen-check.jpg'
import borgenProjectStudents from '../assets/photos/borgen-project-students.jpg'
import remedyProjectLogo from '../assets/photos/remedy-project-logo.jpg'
import equalityLabsCasteEquity from '../assets/photos/equality-labs-caste-equity.jpg'
import competitionPolicyPhoto from '../assets/photos/borgen-competition-policy-article.jpg'

// Inline citation links within the Competition Policy article -- a brighter
// accent color (not just the body text's dim gray) so the article reads as a
// real cited piece instead of a flat, undifferentiated wall of text.
function ALink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-newscycle text-[#230cd1] underline decoration-[#230cd1]/40 underline-offset-2 transition-colors hover:text-[#160884] hover:decoration-[#160884]"
    >
      {children}
    </a>
  )
}

// Pulled from my Zeffy fundraising page -- not a live feed, so keep this in
// sync by hand when the totals change.
const FUNDRAISER_STATS = {
  raised: 1475,
  goal: 600,
  percent: 246,
  donors: [
    { name: 'Aarush Pomar', amount: 1000 },
    { name: 'Srinivas Basava', amount: 15 },
    { name: 'Swapna Chodavarapu', amount: 15 },
    { name: 'Sreedevi Ramichetty', amount: 25 },
    { name: 'Deepti Torri', amount: 50 },
    { name: 'Sreedevi Parsi', amount: 25 },
    { name: 'Saveena Japa', amount: 25 },
    { name: 'Srikanth Ambore', amount: 50 },
    { name: 'Adi Amidyala', amount: 100 },
    { name: 'Hemalatha Pappala', amount: 50 },
    { name: 'Sai Dhavileswarapu', amount: 20 },
    { name: 'Sheila McCue', amount: 100 },
  ],
}

const DONORS_PREVIEW_COUNT = 1

export default function AdvocacyPage() {
  const [showAllDonors, setShowAllDonors] = useState(false)
  const [articlePhotoOpen, setArticlePhotoOpen] = useState(false)
  const visibleDonors = showAllDonors ? FUNDRAISER_STATS.donors : FUNDRAISER_STATS.donors.slice(0, DONORS_PREVIEW_COUNT)

  return (
    <PageLayout>
      <PageHeader title="Advocacy" subtitle="The issues I work on, and ways to get involved" />

      <div className="flex flex-col gap-6 pb-10 pt-4 sm:gap-8">
        <FeatureCard
          category="Nonprofit -- Regional Director"
          title="The Borgen Project"
          imageLabel="Borgen Project photo"
          imageSrc={borgenProjectStudents}
          actions={<PillLink href="https://borgenproject.org/">Website</PillLink>}
          stretchPhoto
          maxPhotoColumnWidth={300}
          className="-mx-[6px] sm:-mx-[12px] md:-mx-[18px]"
        >
          <p>
            The Borgen Project works to make fighting global poverty a priority in U.S. foreign
            policy. As a Regional Director, I organize fundraising and outreach in my community. I
            also help people contact their members of Congress to support legislation that
            improves living conditions for people facing poverty.
          </p>

          <div className="mt-6 rounded-2xl border border-[#230cd1]/25 bg-[#230cd1]/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#230cd1]">Take Action</p>
            <p className="mt-2 text-base text-[#0C0C0C]">
              You can get involved by emailing or calling your members of Congress, or by
              volunteering with The Borgen Project. The links below will help you get started.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <PillLink href="https://borgenproject.org/action-center/">Email Congress</PillLink>
              <PillLink href="https://borgenproject.org/call-congress/">Call Congress</PillLink>
              <PillLink href="https://borgenproject.org/volunteer-opportunities/">Volunteer</PillLink>
            </div>
          </div>
        </FeatureCard>

        <div
          id="competition-policy"
          className="scroll-mt-24 -mx-[6px] rounded-[20px] border-2 border-[#1a1a1a]/15 bg-white p-3.5 font-newscycle text-[#1c1b1c] sm:-mx-[12px] sm:rounded-[24px] sm:p-5 md:-mx-[18px] md:rounded-[28px] md:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#1a1a1a] px-2.5 py-1 font-newscycle text-[11px] font-bold uppercase tracking-widest text-white">
                  Published
                </span>
                <span className="font-newscycle text-xs font-bold uppercase tracking-widest text-[#1a1a1a] sm:text-sm">
                  The Borgen Project &middot; September 11, 2026
                </span>
              </div>
              <h3 className="mt-2 font-lato text-lg font-normal leading-snug text-black sm:text-xl">
                The Most Powerful Anti-Poverty Tool? Competition Policy
              </h3>
            </div>
            <a
              href="https://borgenproject.org/competition-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#1a1a1a] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a]/5 sm:text-sm"
            >
              Read on borgenproject.org
            </a>
          </div>

          <button
            type="button"
            onClick={() => setArticlePhotoOpen(true)}
            aria-label="Enlarge photo: a pharmacy shelf stocked with prescription medicine bottles"
            className="group relative mb-5 block w-full cursor-zoom-in overflow-hidden rounded-xl"
          >
            <img
              src={competitionPolicyPhoto}
              alt="A pharmacy shelf stocked with prescription medicine bottles"
              className="aspect-[12/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <EnlargeHint />
          </button>
          {articlePhotoOpen && (
            <Lightbox
              src={competitionPolicyPhoto}
              alt="A pharmacy shelf stocked with prescription medicine bottles"
              caption="Photo via Unsplash"
              onClose={() => setArticlePhotoOpen(false)}
            />
          )}

          <div className="space-y-3.5 text-sm leading-[1.7] text-[#1c1b1c]">
            <p>
              Fighting poverty requires smart policy intervention. In 2023, the{' '}
              <ALink href="https://www.oecd.org/en/publications/competition-and-poverty-the-role-of-competition-authorities_69813097-en.html">
                Organization for Economic Cooperation and Development
              </ALink>{' '}
              advised competition authorities to prioritize essential markets that take up large
              portions of family budgets. In 2025, the{' '}
              <ALink href="https://www.worldbank.org/en/events/2024/12/06/competition-advocacy-contest-2025">
                World Bank&rsquo;s Competition Advocacy Contest
              </ALink>{' '}
              highlighted reforms in Georgia, Egypt and Mexico for producing measurable consumer
              benefits. Together, these cases show how competition policy can support poverty
              reduction.
            </p>

            <h3 className="font-lato text-base font-normal leading-snug text-black sm:text-lg">
              Georgia: Market Concentration vs. Pharmaceutical Reform
            </h3>
            <p>
              Prior to 2022, Georgia&rsquo;s pharmaceutical market exposed families to extremely
              high medicine prices. Connections between pharmaceutical wholesalers and retail
              pharmacy chains allowed a small number of companies to hold significant market
              power, with{' '}
              <ALink href="https://www.worldbank.org/en/events/2024/12/06/competition-advocacy-contest-2025">
                markups on some essential medicines
              </ALink>{' '}
              ranging from 2,000% to 3,000%. Without safeguards such as mandatory generic
              prescribing, generic drugs could even cost more than brand-name alternatives.
              According to the <ALink href="https://pip.worldbank.org/country-profiles/GEO">World Bank</ALink>, 9.4% of
              Georgia&rsquo;s population lived below the national poverty line in 2024.
            </p>
            <p>
              Between 2022 and 2025, the{' '}
              <ALink href="https://gcca.gov.ge/index.php?lng=eng&m=370&news_id=1769">
                Georgian Competition and Consumer Agency
              </ALink>{' '}
              introduced major reforms, including mandatory generic prescribing, digital price
              tracking and stronger quality controls. In August 2025, regulators identified eight
              companies with dominant positions and fined four for abusing their market power to
              impose unfairly high medicine prices. These interventions produced significant
              results.{' '}
              <ALink href="https://www.worldbank.org/en/events/2024/12/06/competition-advocacy-contest-2025">
                Average medicine prices fell
              </ALink>{' '}
              by 40% to 45%, returning an estimated $73 million in annual savings to households.
              Lower out-of-pocket health expenses increased families&rsquo; real purchasing power,
              leaving more income available for other necessities. More affordable medicine can
              also help people protect their health, remain productive and keep children enrolled
              in school. This shows how competition policy and poverty reduction can be connected
              through lower prices for essential goods.
            </p>

            <h3 className="font-lato text-base font-normal leading-snug text-black sm:text-lg">
              Egypt: Educational Exploitation vs. Antitrust Enforcement
            </h3>
            <p>
              Prior to 2023,{' '}
              <ALink href="https://borgenproject.org/educational-reform-in-egypt/">Egypt&rsquo;s education market</ALink>{' '}
              was affected by anticompetitive practices. Powerful private institutions and
              suppliers used exclusive agreements, product bundling and price-fixing across
              textbook publishing and school uniform production, restricting consumer choice and
              increasing pressure on low-income households.{' '}
              <ALink href="https://pip.worldbank.org/country-profiles/EGY">World Bank data</ALink> show that 33.5% of
              Egypt&rsquo;s population lived below the national poverty line in 2021 to 2022.
            </p>
            <p>
              In 2023, the{' '}
              <ALink href="https://www.worldbank.org/en/events/2024/12/06/competition-advocacy-contest-2025">
                Egyptian Competition Authority
              </ALink>{' '}
              intervened against anticompetitive practices across textbook and school uniform
              markets. Markups on international schoolbooks fell by as much as 85%, while public
              spending on state textbook printing decreased by 21%. These reforms produced
              estimated household savings of nearly $1 billion over five years. Reforms were also
              expected to double or triple the number of school uniform suppliers and increase
              employment in the sector by as much as 50%. Reducing financial barriers to education
              can help break cycles of poverty and create greater long-term economic stability.
              Increasing competition can also benefit businesses and new market entrants by
              replacing restrictive arrangements with more open supply chains.
            </p>

            <h3 className="font-lato text-base font-normal leading-snug text-black sm:text-lg">
              Mexico: Collusive Health Procurement vs. Institutional Sanctions
            </h3>
            <p>
              Between 2008 and 2015, collusion affected Mexico&rsquo;s public health care system.
              Private companies rigged bids for blood bank services and laboratory diagnostics
              purchased by the Mexican Social Security Institute (IMSS) and the Institute for
              Security and Social Services for State Workers (ISSSTE), two of the country&rsquo;s
              largest public health institutions. Because these systems serve more than 50% of
              Mexico&rsquo;s population, bid-rigging increased public costs and reduced how far
              existing health care budgets could go.{' '}
              <ALink href="https://pip.worldbank.org/country-profiles/MEX">World Bank data</ALink> show that 29.6% of
              Mexico&rsquo;s population lived below the national poverty line in 2024.
            </p>
            <p>
              Mexico&rsquo;s competition authority, the Federal Economic Competition Commission{' '}
              <ALink href="https://www.cofece.mx/multa-cofece-a-empresas-por-coludirse-en-licitaciones-de-servicios-de-banco-de-sangre/">
                COFECE
              </ALink>
              , investigated the practices, penalized the bid-rigging cartel and imposed
              approximately 626.5 million Mexican pesos in fines on 11 companies and 14
              individuals. Following enforcement, blood bank service costs fell by nearly 30% and
              laboratory testing prices dropped by almost 5%. A 2024{' '}
              <ALink href="https://www.worldbank.org/en/events/2024/12/06/competition-advocacy-contest-2025">
                ex post assessment
              </ALink>
              , later highlighted by the World Bank, found that the harm prevented and fines
              imposed were worth more than four times the agency&rsquo;s annual operating budget.
              More transparent and competitive procurement allowed the public sector to make
              better use of existing resources, leaving more funds available for medical care.
            </p>

            <h3 className="font-lato text-base font-normal leading-snug text-black sm:text-lg">
              What Georgia, Egypt and Mexico Show
            </h3>
            <p>
              The experiences of Georgia, Egypt and Mexico demonstrate that markets dominated by
              cartels or entrenched monopolies impede economic opportunity and growth. Long-term
              economic progress requires public institutions that can prevent anticompetitive
              behavior, make public procurement more transparent, protect consumers and remove
              barriers that unfairly favor established firms.
            </p>
            <p>
              <ALink href="https://www.worldbank.org/en/topic/competition-policy">Well-designed competition policy</ALink>{' '}
              encourages businesses to innovate, improve productivity and use capital more
              efficiently. Productive companies can expand, create stable employment and generate
              income that supports local spending. Poorly regulated markets, by contrast, can
              become increasingly concentrated and raise costs for consumers.
            </p>
            <p>
              Addressing global poverty requires political will and smart policies that strengthen
              governance and economic opportunity.{' '}
              <ALink href="https://www.oecd.org/en/publications/competition-and-poverty-the-role-of-competition-authorities_69813097-en.html">
                Well-regulated markets
              </ALink>{' '}
              can help low-income families gain purchasing power and stability while companies
              benefit from a larger and more reliable customer base.
            </p>
            <p>
              Georgia, Egypt and Mexico illustrate how targeted competition policy reforms can
              make markets work more effectively for families, governments and businesses at the
              same time. When leaders establish fair rules, enforce them consistently and protect
              vulnerable populations from anticompetitive practices, families gain more of the
              stability and purchasing power they need to build their own way forward. Continued
              enforcement and reform can help extend these gains to more low-income households.
            </p>
            <p className="text-sm italic text-[#1a1a1a]/50">
              &ndash; Aarush Pomar. Aarush is based in Chanhassen, MN, USA and focuses on Business
              and Good News for The Borgen Project.
            </p>
          </div>
        </div>

        <FeatureCard
          category="Funding Advocacy"
          title="My Borgen Fundraiser"
          imageLabel="$1,000 check photo"
          imageSrc={borgenCheck}
          imageCaption="The $1,000 check from pomar.blendz donations, presented to The Borgen Project"
          stretchPhoto
          stretchFrozen={showAllDonors}
          maxPhotoColumnWidth={280}
          actions={
            <PillLink href="https://www.zeffy.com/en-US/donation-form/aarush-pomars-fundraising-page">
              Donate Now
            </PillLink>
          }
          className="-mx-[6px] sm:-mx-[12px] md:-mx-[18px]"
        >
          <p>
            Seeing the gap between people living comfortably and people struggling to get by made
            me want to help. I contributed $1,000 from my barbering business to The Borgen
            Project, and this fundraising page gives others a way to support its work too.
          </p>

          <Link
            to="/entrepreneurship"
            className="inline-flex w-fit items-center gap-1 text-sm text-[#0C0C0C]/80 underline decoration-[#0C0C0C]/40 underline-offset-4 transition-colors hover:text-[#230cd1]"
          >
            Explore my business <span aria-hidden="true">&rarr;</span>
          </Link>

          <div className="rounded-2xl border border-[#0C0C0C]/20 bg-[#0C0C0C]/[0.03] p-5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-[#0C0C0C]">
                ${FUNDRAISER_STATS.raised.toLocaleString()} raised of ${FUNDRAISER_STATS.goal.toLocaleString()}{' '}
                goal
              </p>
              <p className="text-sm font-semibold text-[#230cd1]">{FUNDRAISER_STATS.percent}%</p>
            </div>
            {/* The bar's full width represents the amount actually raised
                (not the goal) -- at 246% a goal-scaled bar would just be a
                solid block with nothing to compare it to. A tick mark at
                the $600 goal's position along that same scale, with the
                fill running the rest of the way past it, is what actually
                shows "exceeded the goal" rather than just "full bar". */}
            <div className="relative mt-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#0C0C0C]/12">
                <div className="h-full rounded-full bg-[#230cd1]" style={{ width: '100%' }} />
              </div>
              <div
                className="absolute top-0 h-2 w-0.5 bg-white"
                style={{ left: `${(FUNDRAISER_STATS.goal / FUNDRAISER_STATS.raised) * 100}%` }}
              />
            </div>
            <div className="relative mt-2 h-5">
              <span
                className="absolute -translate-x-1/2 whitespace-nowrap rounded-full border border-[#0C0C0C]/25 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#0C0C0C]/65"
                // Capped so this badge can never drift into the Raised badge
                // pinned at the right edge, even on narrow columns where the
                // goal's proportional position (its usual left offset) would
                // otherwise land close enough for the two to overlap.
                style={{ left: `min(${(FUNDRAISER_STATS.goal / FUNDRAISER_STATS.raised) * 100}%, calc(100% - 180px))` }}
              >
                Goal &middot; ${FUNDRAISER_STATS.goal.toLocaleString()}
              </span>
              <span className="absolute right-0 whitespace-nowrap rounded-full border border-[#230cd1]/30 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#230cd1]">
                Raised &middot; ${FUNDRAISER_STATS.raised.toLocaleString()}
              </span>
            </div>

            <ul className="mt-4 space-y-1.5 border-t border-[#0C0C0C]/20 pt-4 text-sm">
              {visibleDonors.map((donor) => (
                <li key={donor.name} className="flex items-center justify-between text-base text-[#0C0C0C]">
                  <span>{donor.name}</span>
                  <span className="font-medium text-[#0C0C0C]">${donor.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>

            {!showAllDonors && FUNDRAISER_STATS.donors.length > DONORS_PREVIEW_COUNT && (
              <div className="mt-2 flex gap-1" aria-hidden="true">
                <span className="h-1 w-1 rounded-full bg-[#0C0C0C]/25" />
                <span className="h-1 w-1 rounded-full bg-[#0C0C0C]/25" />
                <span className="h-1 w-1 rounded-full bg-[#0C0C0C]/25" />
              </div>
            )}

            {FUNDRAISER_STATS.donors.length > DONORS_PREVIEW_COUNT && (
              <button
                type="button"
                onClick={() => setShowAllDonors((prev) => !prev)}
                className="mt-3 rounded-full border border-[#0C0C0C]/25 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#0C0C0C]/65 transition-colors hover:border-[#230cd1]/40 hover:text-[#230cd1]"
              >
                {showAllDonors ? 'Show fewer donors' : 'View all donors'}
              </button>
            )}
          </div>
        </FeatureCard>

        <FeatureCard
          category="Student Advocate"
          title="Equality Labs"
          imageLabel="Equality Labs photo"
          imageSrc={equalityLabsCasteEquity}
          actions={<PillLink href="https://www.equalitylabs.org/">Website</PillLink>}
          stretchPhoto
          maxPhotoColumnWidth={300}
          className="-mx-[6px] sm:-mx-[12px] md:-mx-[18px]"
        >
          <p>
            Equality Labs is a South Asian Dalit civil rights organization working to end caste
            discrimination in the United States. I&rsquo;m a Student Advocate, and its work
            connects closely with my research on how different generations of South Asian
            families in Minnesota understand and discuss caste.
          </p>

          <div className="mt-6 rounded-2xl border border-[#230cd1]/25 bg-[#230cd1]/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#230cd1]">Take Action</p>
            <p className="mt-2 text-base text-[#0C0C0C]">
              Learn about the campaign to include caste in anti-discrimination protections and
              how you can support it.
            </p>
            <div className="mt-4">
              <PillLink href="https://www.equalitylabs.org/work/caste-equity/">Caste Equity Campaign</PillLink>
            </div>
          </div>
        </FeatureCard>

        <FeatureCard
          category="Student Ambassador"
          title="The Remedy Project"
          imageLabel="Remedy Project photo"
          imageSrc={remedyProjectLogo}
          imageFit="contain"
          actions={<PillLink href="https://www.theremedyproj.org/">Website</PillLink>}
          stretchPhoto
          maxPhotoColumnWidth={300}
          className="-mx-[6px] sm:-mx-[12px] md:-mx-[18px]"
        >
          <p>
            The Remedy Project brings students and people affected by the justice system together
            to advocate for the rights of incarcerated people. As a Student Ambassador, I help
            raise awareness of those rights. I&rsquo;ve also donated $1,000 to support its work
            and received the Ally of the Incarcerated Award.
          </p>

          <div className="mt-6 rounded-2xl border border-[#230cd1]/25 bg-[#230cd1]/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#230cd1]">Take Action</p>
            <p className="mt-2 text-base text-[#0C0C0C]">
              Explore The Remedy Project&rsquo;s campaigns and find ways to support the rights of
              incarcerated people.
            </p>
            <div className="mt-4">
              <PillLink href="https://www.theremedyproj.org/take-action">Take Action</PillLink>
            </div>
          </div>
        </FeatureCard>
      </div>
    </PageLayout>
  )
}
