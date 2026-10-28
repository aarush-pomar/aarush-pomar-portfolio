import SiteNav from '../components/shared/SiteNav'
import type { ReactNode } from 'react'

interface Entry {
  title: ReactNode
  org?: string
  dates?: string
  intro?: ReactNode
  bullets?: ReactNode[]
}

// Inline hyperlink used throughout entry titles/bullets -- underlined,
// uncolored so it still reads as plain resume text (and prints cleanly)
// rather than looking like a themed site link.
function RLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline decoration-[#0C0C0C]/40 underline-offset-2 transition-colors hover:decoration-[#0C0C0C]"
    >
      {children}
    </a>
  )
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
          {entry.intro && <p className="mt-1 text-sm text-[#0C0C0C]/85">{entry.intro}</p>}
          {entry.bullets && (
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-[#0C0C0C]/85">
              {entry.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

// Split across pages the way a printed multi-page resume naturally would --
// each page prints on its own sheet (see the `print:[break-after:page]`
// below) and the on-screen view shows one page at a time via the tabs.
const PAGES: { label: string; content: ReactNode }[] = [
  {
    label: 'Page 1',
    content: (
      <>
        <Section title="Education">
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <p className="font-semibold text-[#0C0C0C]">
                  <RLink href="https://www.minnetonkaschools.org/schools/high-school/mhs">Minnetonka High School (MHS)</RLink>
                  <span className="font-normal text-[#0C0C0C]/70">, Minnetonka, MN</span>
                </p>
                <p className="whitespace-nowrap text-sm text-[#0C0C0C]/60">Expected 06/2027</p>
              </div>
              <p className="mt-1">Weighted GPA: 4.414; ACT: 35</p>
              <p>(5) AP exams with 5/5: Human Geography (9th gr.), APUSH (10th gr.), Statistics (self-study), Psychology, Biology</p>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <p className="font-semibold text-[#0C0C0C]">Cornell University</p>
                <p className="whitespace-nowrap text-sm text-[#0C0C0C]/60">07/2026</p>
              </div>
              <p className="mt-1">Precollege Summer Program</p>
              <ul className="mt-0.5 list-disc space-y-0.5 pl-5">
                <li>
                  <RLink href="https://classes.cornell.edu/browse/roster/SU26/class/AEM/1300">
                    AEM 1300: Introduction to Macroeconomic Theory and Policy
                  </RLink>{' '}
                  -- A+; 3 university credits
                </li>
                <li>
                  Professor: <RLink href="https://economics.cornell.edu/arnab-k-basu">Arnab K. Basu</RLink>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <p className="font-semibold text-[#0C0C0C]">University of Minnesota</p>
                <p className="whitespace-nowrap text-sm text-[#0C0C0C]/60">09/2021 -- 06/2026</p>
              </div>
              <p className="mt-1">
                <RLink href="https://cse.umn.edu/mathcep/university-minnesota-talented-youth-mathematics-program-umtymp">
                  Talented Youth Mathematics Program (UMTYMP)
                </RLink>
              </p>
              <ul className="mt-0.5 list-disc space-y-0.5 pl-5">
                <li>
                  Completed UMTYMP <RLink href="https://cse.umn.edu/mathcep/course-listing">Calculus I&ndash;III</RLink>; earned 12 university
                  credits
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Publications">
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-[#0C0C0C]/85">
            <div>
              <p>
                Pomar, A.{' '}
                <span className="font-semibold italic">
                  &ldquo;Economic Fallout and Financial Adaptation in the Wake of ICE Activity in Minnesota&rdquo;
                </span>{' '}
                (In Process). Mentor:{' '}
                <RLink href="https://fsos.umn.edu/people/graduates/miguel-quinones">Miguel Qui&ntilde;ones</RLink>, University
                of Minnesota Twin Cities.
              </p>
              <p className="mt-1">
                To be submitted to: <span className="italic">Journal on Migration and Human Security</span> (Center for Migration
                Studies)
              </p>
            </div>
            <div>
              <p>
                Pomar, A.{' '}
                <span className="font-semibold italic">
                  &ldquo;Caste Awareness and Identity Across Generations in Minnesota&rsquo;s South Asian Diaspora&rdquo;
                </span>{' '}
                (In Process). Mentor:{' '}
                <RLink href="https://counselingpsych.education.wisc.edu/fac-staff/devitre-zubin/">Dr. Zubin DeVitre</RLink>, University
                of Wisconsin&ndash;Madison.
              </p>
              <p className="mt-1">
                To be submitted to: <span className="italic">CASTE: A Global Journal on Social Exclusion</span> (Brandeis University)
              </p>
            </div>
            <div>
              <p>
                Pomar, A.{' '}
                <RLink href="https://borgenproject.org/competition-policy/">
                  <span className="font-semibold italic">&ldquo;The Most Powerful Anti-Poverty Tool? Competition Policy.&rdquo;</span>
                </RLink>
              </p>
              <p className="mt-1">
                Published in: <span className="italic">The Borgen Project</span>, September 2026.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Leadership Experience">
          <EntryList
            entries={[
              {
                title: <RLink href="https://minne-sortanice.com/">Minne-Sorta-Nice</RLink>,
                org: 'MHS Virtual Enterprise -- Chief Financial Officer',
                dates: '09/2026 -- Present',
                bullets: [
                  <>
                    Unpaid leadership position in a student-run company through MHS{' '}
                    <RLink href="https://veinternational.org/for-schools/">Virtual Enterprise</RLink> course.
                  </>,
                ],
              },
              {
                title: <RLink href="https://borgenproject.org/">The Borgen Project</RLink>,
                org: 'Regional Director',
                dates: '07/2026 -- Present',
                bullets: [
                  <>
                    Raised <RLink href="https://www.zeffy.com/en-US/donation-form/aarush-pomars-fundraising-page">$1,475</RLink> for The
                    Borgen Project&rsquo;s global poverty advocacy
                  </>,
                  'Mobilized 50+ people to contact Congress about global poverty reduction',
                  <>
                    Urged Senators <RLink href="https://www.klobuchar.senate.gov/public/">Amy Klobuchar</RLink> and{' '}
                    <RLink href="https://www.smith.senate.gov/">Tina Smith</RLink> and <RLink href="https://morrison.house.gov/">Rep. Kelly Morrison</RLink> to support the{' '}
                    <RLink href="https://borgenproject.org/legislation/">Global Fragility Reauthorization Act (H.R. 3005/S. 2678)</RLink>
                  </>,
                  <>
                    Contacted <RLink href="https://www.lucyrehm.com/">Lucy Rehm</RLink>,{' '}
                    <RLink href="https://www.senate.mn/members/member_bio.html?mem_id=1244">Julia Coleman</RLink>,{' '}
                    <RLink href="https://www.chanhassenmn.gov/government/city-council">Elise Ryan, and the Chanhassen City Council</RLink>
                  </>,
                ],
              },
              {
                title: <RLink href="https://www.nationalhonorsociety.org/">National Honor Society (NHS)</RLink>,
                org: 'President',
                dates: '10/2025 -- Present',
                bullets: [
                  'Lead monthly chapter meetings for 250+ members',
                  <>
                    Proposed MHS NHS&rsquo;s first blood drive; plan with officers and the{' '}
                    <RLink href="https://www.redcrossblood.org/">American Red Cross</RLink>
                  </>,
                ],
              },
              {
                title: <RLink href="https://bpa.org/">Business Professionals of America (BPA)</RLink>,
                org: 'Vice President',
                dates: '09/2025 -- Present',
                bullets: ['Help lead chapter meetings and activities for 110+ members'],
              },
              {
                title: (
                  <RLink href="https://docs.google.com/document/d/199KlgIQp-x69IFVnZp48lWV0Z60h8XHKuD_T2dJtKTs/edit">Econ Club</RLink>
                ),
                org: 'President & Founder',
                dates: '01/2025 -- Present',
                bullets: [
                  'Founded and lead a club of 65+ active members focused on economic literacy',
                  <>
                    Lead{' '}
                    <RLink href="https://www.councilforeconed.org/programs/for-students/national-economic-challenge/">
                      National Economics Challenge
                    </RLink>{' '}
                    prep; plan for{' '}
                    <RLink href="https://economics.northwestern.edu/undergraduate/student-orgs/net/">
                      Northwestern Economics Tournament (NET)
                    </RLink>{' '}
                    entry
                  </>,
                ],
              },
              {
                title: <RLink href="https://www.instagram.com/p/DV6aCQJlgz9/?img_index=1">Minnetonka Forum</RLink>,
                org: 'Co-President',
                dates: '11/2024 -- Present',
                bullets: [
                  'Co-lead an annual themed forum connecting 100+ students with 7 CEOs',
                ],
              },
              {
                title: <RLink href="https://www.instagram.com/mtkadsu/">Desi Student Union</RLink>,
                org: 'Officer',
                dates: '09/2023 -- Present',
                bullets: [
                  <>
                    Support{' '}
                    <RLink href="https://www.congress.gov/bill/119th-congress/house-resolution/819">H.Res. 819 (119th Congress)</RLink>,
                    &ldquo;Recognizing the contributions made to the United States by the Indian American diaspora and condemning
                    recent acts of racism against Indian Americans,&rdquo; introduced by{' '}
                    <RLink href="https://suozzi.house.gov/">Rep. Tom Suozzi</RLink>
                  </>,
                ],
              },
            ]}
          />
        </Section>
      </>
    ),
  },
  {
    label: 'Page 2',
    content: (
      <>
        <Section title="Work Experience">
          <EntryList
            entries={[
              {
                title: <RLink href="/entrepreneurship">pomar.blendz</RLink>,
                org: 'Founder & Freelance Barber',
                dates: '10/2024 -- Present',
                bullets: [
                  'Provide haircutting services to a recurring clientele of 150+ people',
                  <>
                    Create <RLink href="https://www.instagram.com/pomar.blendz/">Instagram</RLink> content averaging{' '}
                    <RLink href="https://www.instagram.com/pomar.blendz/reels/">7.5K views per reel</RLink>
                  </>,
                  <>
                    Donate all profits to <RLink href="https://borgenproject.org/">The Borgen Project</RLink> and{' '}
                    <RLink href="https://www.theremedyproj.org/">The Remedy Project</RLink>
                  </>,
                ],
              },
              {
                title: <RLink href="/entrepreneurship">Seasonal Services</RLink>,
                org: 'Co-Founder',
                dates: '06/2023 -- Present',
                bullets: [
                  'Provide lawn mowing, dog sitting, and other yard and household services',
                  'Partner with one co-founder to organize and complete jobs for local residents',
                ],
              },
            ]}
          />
        </Section>

        <Section title="Volunteer Experience">
          <EntryList
            entries={[
              {
                title: <RLink href="https://www.theremedyproj.org/">The Remedy Project</RLink>,
                org: 'Student Ambassador',
                dates: '09/2025 -- Present',
                bullets: [
                  <>
                    Advocate for repeal of the <RLink href="https://www.congress.gov/bill/104th-congress/senate-bill/866">Prison Litigation Reform Act</RLink>
                  </>,
                ],
              },
              {
                title: <RLink href="https://www.equalitylabs.org/">Equality Labs</RLink>,
                org: 'Advocate',
                dates: '08/2025 -- Present',
                bullets: [
                  <>
                    Conduct <RLink href="https://www.equalitylabs.org/campaigns/">awareness campaigns</RLink> to oppose caste
                    discrimination
                  </>,
                ],
              },
              {
                title: <RLink href="https://www.humanityalliance.org/">The Humanity Alliance</RLink>,
                org: 'Volunteer Cook',
                dates: '08/2023 -- Present',
                bullets: [
                  <>
                    Prepare meals with fellow volunteers to support{' '}
                    <RLink href="https://findfoodcarvercounty.org/get-involved/">local families facing food insecurity</RLink>
                  </>,
                ],
              },
              {
                title: <RLink href="https://www.si.edu/">Smithsonian</RLink>,
                org: 'Digital Transcriber',
                dates: '06/2023 -- Present',
                bullets: [
                  <>
                    <RLink href="https://transcription.si.edu/">Transcribe historical documents</RLink> to support public accessibility
                    and digital archiving
                  </>,
                ],
              },
              {
                title: <RLink href="https://borgenproject.org/feed-my-starving-children/">Feed My Starving Children</RLink>,
                org: 'Food Packager',
                dates: '06/2023 -- Present',
                bullets: ['Pack nutritious meals for distribution to children facing hunger worldwide'],
              },
            ]}
          />
        </Section>

        <Section title="Extracurricular Activities">
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#0C0C0C]/85">
            <li>
              <RLink href="https://www.instagram.com/minnetonkahosa/">MHS HOSA</RLink> (
              <RLink href="https://hosa.org/">Future Health Professionals</RLink>) -- Member{' '}
              <span className="text-[#0C0C0C]/60">(09/2024 -- Present)</span>
            </li>
            <li>
              <RLink href="https://www.tiktok.com/@movievault_231">TikTok -- Content Creator</RLink> (1.1K Followers){' '}
              <span className="text-[#0C0C0C]/60">(03/2024 -- Present)</span>
            </li>
            <li>
              <RLink href="https://www.minnetonkaschools.org/activities/hs-activities/clubs/deca">MHS DECA</RLink> -- Member{' '}
              <span className="text-[#0C0C0C]/60">(09/2023 -- Present)</span>
            </li>
            <li>
              <RLink href="https://www.minnetonkaschools.org/activities/mhs-athletics/sports/boys-tennis">MHS Tennis Team</RLink> --
              Junior Varsity Athlete <span className="text-[#0C0C0C]/60">(03/2024 -- 05/2024)</span>
            </li>
          </ul>
        </Section>

        <Section title="Honors / Awards">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0C0C0C]/60">Academic</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#0C0C0C]/85">
                <li>
                  <RLink href="https://kommodo.ai/i/fPmu8QeZrkREZMSCWR4q">National Merit Commended Scholar</RLink> (34K/1.2M), PSAT/NMSQT{' '}
                  <span className="text-[#0C0C0C]/60">(09/2026)</span>
                </li>
                <li>
                  <RLink href="https://drive.google.com/file/d/1tH-H5o4TurfEAOjxOh-SDdyKDpXZ7_l6/view">AP Scholar with Distinction</RLink>{' '}
                  <span className="text-[#0C0C0C]/60">(07/2026)</span>
                </li>
                <li>
                  BPA -- 1st Place, Regional Competition,{' '}
                  <RLink href="https://drive.google.com/file/d/1a2TAuYx21WN8v5M1w3Wvlq5ayuKm9kM9/view">Basic Office Systems and Procedures</RLink>{' '}
                  <span className="text-[#0C0C0C]/60">(01/2026)</span>
                </li>
                <li>
                  BPA -- 3rd Place, Regional Competition,{' '}
                  <RLink href="https://drive.google.com/file/d/1LmJ1ZCr8WGttxPJZFv8l0hmN6nzHGRkL/view">Financial Math and Analysis</RLink>{' '}
                  <span className="text-[#0C0C0C]/60">(01/2026)</span>
                </li>
                <li>
                  <RLink href="https://docs.google.com/document/d/1rPHTz7q5wpcMxiIqNuYt5M5IhbsQDmOBcWWh8_sgxtE/edit">
                    National Honor Society (NHS)
                  </RLink>{' '}
                  <span className="text-[#0C0C0C]/60">(10/2025)</span>
                </li>
                <li>
                  HOSA -- 2nd Place, Minnesota State Leadership Conference,{' '}
                  <RLink href="https://minnesotahosa.org/production/state-leadership-conference/">State Competition</RLink>,{' '}
                  <RLink href="https://hosa.org/wp-content/uploads/2025/04/24-25-HOSA-ATC-April-22.docx-1.pdf">
                    ATC Environmental Health Test
                  </RLink>{' '}
                  <span className="text-[#0C0C0C]/60">(03/2025)</span>
                </li>
                <li>
                  DECA -- 2nd Place, Regional Competition,{' '}
                  <RLink href="https://www.deca.org/compete/international-business-plan">International Business Plan</RLink>{' '}
                  <span className="text-[#0C0C0C]/60">(01/2025)</span>
                </li>
                <li>
                  DECA -- State Finalist, Placed 5th <span className="text-[#0C0C0C]/60">(03/2024)</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0C0C0C]/60">Community Service</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#0C0C0C]/85">
                <li>
                  The Remedy Project --{' '}
                  <RLink href="https://drive.google.com/file/d/1pt4jLtxbXIal8hQqp4gfO1fApBAnd_SP/view">Ally of the Incarcerated Award</RLink>{' '}
                  <span className="text-[#0C0C0C]/60">(09/2026)</span>
                </li>
                <li>
                  The Borgen Project --{' '}
                  <RLink href="https://drive.google.com/file/d/1y_WS5OJnAew4dfPPE43HS-nf-UK39BzU/view">Chief Closer Award</RLink>{' '}
                  <span className="text-[#0C0C0C]/60">(06/2026)</span>
                </li>
                <li>
                  PVSA Gold <span className="text-[#0C0C0C]/60">(09/2023)</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Skills">
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold text-[#0C0C0C]">Technical</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                <li>Java (Intermediate)</li>
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
      </>
    ),
  },
]

// A printed resume's page breaks are a fact about the content (what fits on
// sheet 1 vs. sheet 2), not a navigation device -- so the on-screen version
// shows every page in normal vertical document flow, each one framed as its
// own sheet, rather than gating page 2 behind a click.
function ResumeSheet({ page, index }: { page: { label: string; content: ReactNode }; index: number }) {
  return (
    <div
      className="relative rounded-sm border border-[#0C0C0C]/12 bg-white px-6 py-10 shadow-[0_1px_3px_rgba(12,12,12,0.06),0_12px_32px_-16px_rgba(12,12,12,0.18)] sm:px-10 sm:py-12 md:px-14 print:rounded-none print:border-0 print:px-0 print:py-0 print:shadow-none print:[break-after:page] print:last:[break-after:auto]"
    >
      {page.content}
      <p className="print:hidden mt-10 text-center text-[11px] uppercase tracking-widest text-[#0C0C0C]/55">
        Page {index + 1} of {PAGES.length}
      </p>
    </div>
  )
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#F2F1EE] text-[#0C0C0C] print:bg-white">
      <div className="print:hidden">
        <SiteNav />
      </div>

      <main className="mx-auto max-w-3xl px-4 py-10 print:max-w-none print:px-0 print:py-0 sm:px-6 sm:py-12">
        <header className="flex flex-wrap items-start justify-between gap-4 rounded-sm border border-[#0C0C0C]/12 bg-white px-6 py-6 shadow-[0_1px_3px_rgba(12,12,12,0.06)] print:rounded-none print:border-0 print:border-b-2 print:border-b-[#0C0C0C] print:px-0 print:pb-4 print:pt-0 print:shadow-none sm:px-10 md:px-14">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">Aarush Pomar</h1>
            <p className="mt-1 text-sm text-[#0C0C0C]/70">Chanhassen, MN</p>
            <p className="mt-0.5 text-sm text-[#0C0C0C]/70">
              <RLink href="mailto:pomaraarush@gmail.com">pomaraarush@gmail.com</RLink> |{' '}
              <RLink href="tel:+19525000822">(952) 500-0822</RLink> |{' '}
              <RLink href="https://www.aarushpomar.com">aarushpomar.com</RLink>
            </p>
          </div>
          <a
            href="/Aarush-Pomar-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="print:hidden rounded-full border-2 border-[#0C0C0C] px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#0C0C0C] transition-colors hover:bg-[#0C0C0C]/5"
          >
            Download R&eacute;sum&eacute; (PDF)
          </a>
        </header>

        <p className="print:hidden mb-6 mt-4 text-center text-xs uppercase tracking-widest text-[#0C0C0C]/60">
          Scroll to keep reading &mdash; {PAGES.length} pages
        </p>

        <div className="flex flex-col gap-8 print:gap-0">
          {PAGES.map((p, i) => (
            <ResumeSheet key={p.label} page={p} index={i} />
          ))}
        </div>
      </main>
    </div>
  )
}
