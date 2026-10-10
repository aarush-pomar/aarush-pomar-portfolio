import SiteNav from '../components/shared/SiteNav'
import type { ReactNode } from 'react'

interface Entry {
  title: ReactNode
  org?: string
  dates?: string
  bullets?: string[]
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="break-inside-avoid pt-8 first:pt-0">
      <h2 className="border-b border-[#0C0C0C]/20 pb-1 text-xs font-bold uppercase tracking-widest text-[#0C0C0C]/70">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry, i) => (
        <div key={i}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <p className="font-semibold text-[#0C0C0C]">
              {entry.title}
              {entry.org && <span className="font-normal text-[#0C0C0C]/70"> -- {entry.org}</span>}
            </p>
            {entry.dates && <p className="whitespace-nowrap text-sm text-[#0C0C0C]/60">{entry.dates}</p>}
          </div>
          {entry.bullets && (
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-[#0C0C0C]/85">
              {entry.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-[#0C0C0C]">
      <div className="print:hidden">
        <SiteNav />
      </div>

      <main className="mx-auto max-w-3xl px-6 py-12 print:max-w-none print:px-0 print:py-0">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-[#0C0C0C] pb-4">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">Aarush Pomar</h1>
            <p className="mt-1 text-sm text-[#0C0C0C]/70">Minnetonka High School -- Class of 2027</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="print:hidden rounded-full border-2 border-[#0C0C0C] px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C]/5"
          >
            Print / Save as PDF
          </button>
        </header>

        <Section title="Education">
          <div className="space-y-1.5 text-sm leading-relaxed">
            <p>Minnetonka High School -- September 2023 to Present (expected graduation June 2027)</p>
            <p>University of Minnesota Talented Youth Mathematics Program (UMTYMP) -- September 2021 to May 2026</p>
            <p>Cornell University -- AEM 1300: Introduction to Macroeconomic Theory and Policy -- Summer 2026 -- Grade: A+</p>
          </div>
        </Section>

        <Section title="Academics">
          <div className="space-y-1.5 text-sm leading-relaxed">
            <p>GPA: 4.433 Weighted / 3.800 Unweighted</p>
            <p>SAT: 1540 (750 Reading &amp; Writing, 790 Math)</p>
            <p>ACT: 35 Composite (36 Math, 35 English, 34 Reading, 32 Science)</p>
            <p>19 AP/college-level courses (14 AP, 1 self-study AP, 3 years UMTYMP, 1 Cornell University course)</p>
          </div>
        </Section>

        <Section title="Honors / Awards">
          <EntryList
            entries={[
              { title: 'The Borgen Project -- Chief Closer Award', dates: 'Junior (2025-2026)', bullets: ['Raised $1,000+ through proceeds from my barbering venture'] },
              { title: 'AP Scholar with Distinction', dates: 'Sophomore (2024-2025)', bullets: ['Earned for high performance across multiple AP exams'] },
              { title: 'Gold -- Presidential Volunteer Service Award', dates: 'Jun 2023 -- Sep 2023', bullets: ['Recognized for over 100 hours of impactful community service'] },
              { title: 'HOSA -- Minnesota State Leadership Conference', dates: 'Junior (2025-2026)', bullets: ['2nd Place -- State Competition, ATC Environmental Health Test'] },
              { title: 'BPA -- Vice President', dates: 'Junior (2025-2026)', bullets: ['1st Place -- Regional Competition, Basic Office Systems and Procedures'] },
              { title: 'BPA', dates: 'Junior (2025-2026)', bullets: ['3rd Place -- Regional Competition, Financial Math and Analysis'] },
              { title: 'DECA State Finalist', dates: 'Sophomore (2024-2025)', bullets: ['Placed 5th across all of Minnesota DECA Business Competition'] },
              { title: 'DECA', dates: 'Junior (2025-2026)', bullets: ['2nd Place -- Regional Competition, International Business Plan'] },
              { title: 'A-Roll Honors Student', dates: 'Freshman (2023) -- Present', bullets: ['Consistently maintained a GPA above 3.6 every semester'] },
              { title: 'National Honor Society (NHS)', dates: 'Junior (2025-2026)', bullets: ['Selected based on academic excellence, leadership, service, and character'] },
              { title: 'Academic Letter', dates: 'Freshman (2023) -- Present', bullets: ['Awarded for sustained academic excellence'] },
            ]}
          />
        </Section>

        <Section title="Leadership & Activities">
          <EntryList
            entries={[
              { title: 'National Honor Society (NHS)', org: 'President', dates: 'Junior (2025) -- Present', bullets: ['Directs chapter initiatives focused on service, leadership, and academic excellence', 'Proposed and is coordinating an NHS blood drive'] },
              { title: 'Econ Club', org: 'Founder & President', dates: 'Junior (2025) -- Present', bullets: ['Grew the club to approximately 40 members', 'Leads preparation for the National Economics Challenge by organizing study sessions'] },
              { title: 'Business Professionals of America (BPA)', org: 'Vice President', dates: 'Junior (2025) -- Present', bullets: ['Helps coordinate meetings, member engagement, and chapter activities'] },
              { title: 'Minnetonka Forum', org: 'Co-President', dates: 'Sophomore (2024) -- Present', bullets: ['Co-led the planning and execution of a school-wide event attended by 60-70 students', 'Coordinated with a team to invite and host 3-4 CEOs for a panel on resilience'] },
              { title: 'Virtual Enterprise -- Minne-sorta-Nice', org: 'Chief Financial Officer (CFO)', dates: 'Senior (2026) -- Present' },
              { title: 'Desi Student Union', org: 'Member', dates: 'Freshman (2023) -- Present', bullets: ['Officer since Senior year (2026) -- Present', 'Helps organize cultural events and activities that promote South Asian heritage and community engagement'] },
              { title: 'High School Tennis Team', org: 'JV Athlete, Minnetonka B Team', dates: 'Mar 2024 -- May 2024', bullets: ['Won the Minnetonka B Team singles championship'] },
              { title: 'HOSA', org: 'Member', dates: 'Sophomore (2024) -- Present', bullets: ['Placed 2nd at the Minnesota State Leadership Conference, ATC Environmental Health Test'] },
              { title: 'DECA', org: 'Member', dates: 'Freshman (2023) -- Present', bullets: ['Placed 5th at the Minnesota DECA State Competition (Sophomore year)', 'Placed 2nd at Regionals in International Business Plan (Junior year)'] },
              { title: 'Content Creator', org: 'TikTok / Video Editing', dates: 'Sophomore (2024) -- Present', bullets: ['Produces short-form video content using CapCut, with an audience of 1.1K followers'] },
            ]}
          />
        </Section>

        <Section title="Research Experience">
          <EntryList
            entries={[
              {
                title: 'Economic Fallout and Financial Adaptation in the Wake of ICE Activity in Minnesota',
                dates: 'Ongoing',
                bullets: [
                  'Mentor: Professor Miguel Quiñones, University of Minnesota Twin Cities',
                  'Status: research design and evidence review -- no original findings yet',
                ],
              },
              {
                title: "Caste Awareness and Identity Across Generations in Minnesota's South Asian Diaspora",
                dates: 'Ongoing',
                bullets: [
                  'Mentor: Dr. Zubin DeVitre, University of Wisconsin–Madison',
                  'Status: literature review and study development',
                ],
              },
            ]}
          />
        </Section>

        <Section title="Work Experience">
          <EntryList
            entries={[
              { title: 'Freelance Barber', org: 'Self-Employed', dates: 'Sophomore (2024) -- Present, ~10 hrs/wk', bullets: ['Provide haircutting services to regular paying clients from the local community', 'Schedule appointments, manage payments, and ensure client satisfaction independently', 'Built a consistent client base through reliable service, precision, and referrals'] },
              { title: 'The Borgen Project', org: 'Regional Director', dates: 'Jul 2026 -- Sep 2026, 5 hrs/wk', bullets: ['Completed a structured advocacy internship focused on global poverty reduction and policy education', 'Raised $1,000 for anti-poverty legislation through independent fundraising tied to freelance haircutting', 'Engaged in outreach to legislators and community members on global development policy'] },
              { title: 'Seasonal Services', org: 'Co-Founder & Lawn Care Worker', dates: 'Freshman (2023) -- Present, Summers, ~3 hrs/wk', bullets: ['Started a small local service with peers to provide lawn mowing, dog sitting, and other basic yard/household tasks'] },
              { title: 'Equality Labs', org: 'Student Ambassador', dates: 'Jul 2026 -- Sep 2026', bullets: ['Launched signature drives to ban caste-based discrimination in the South Asian diaspora in the United States', 'Fundraised to support Unlearning Caste Supremacy Trainings'] },
              { title: 'The Remedy Project', org: 'Student Ambassador', dates: 'Sep 2026 -- Present', bullets: ['Raises awareness around prison justice and the rights of incarcerated people', 'Raised $1,000+ to support The Remedy Project\'s advocacy work'] },
            ]}
          />
        </Section>

        <Section title="Community Service">
          <EntryList
            entries={[
              { title: 'Smithsonian', org: 'Digital Transcriptor', dates: 'Jun 2023 -- Sep 2023, 90 hrs', bullets: ['Transcribed historical documents to support public accessibility and digital archiving'] },
              { title: 'Feed My Starving Children', org: 'Food Packager', dates: 'Jun 2023 -- Aug 2023, 15 hrs', bullets: ['Packed meals for international hunger relief efforts in a team-based environment'] },
              { title: 'The Humanity Alliance', org: 'Volunteer Cook', dates: 'Aug 2023, 5 hrs', bullets: ['Cooked and served meals to individuals facing food insecurity'] },
            ]}
          />
        </Section>

        <Section title="Skills">
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold text-[#0C0C0C]">Technical</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                <li>CapCut (Proficient)</li>
                <li>Canva (Proficient)</li>
                <li>Java (Intermediate)</li>
                <li>PC Building &amp; Hardware Setup (Proficient)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[#0C0C0C]">Languages</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                <li>English (Native)</li>
                <li>Telugu (Conversational)</li>
                <li>Spanish (Beginner)</li>
              </ul>
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}
