import { useState } from 'react'
import type { ReactNode } from 'react'
import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import FeatureCard from '../components/shared/FeatureCard'
import Lightbox, { EnlargeHint } from '../components/shared/Lightbox'
import umtympStage from '../assets/photos/award-umtymp-stage.jpg'
import haircutDetailWork from '../assets/photos/haircut-detail-work.jpg'
import minnetonkaForumGroup from '../assets/photos/minnetonka-forum-group.jpg'
import presidentialAwardMedal from '../assets/photos/presidential-volunteer-service-award-medal.jpg'
import conferenceGroupSuits from '../assets/photos/conference-group-suits.jpg'
import conferenceGroupWinter from '../assets/photos/conference-group-winter.jpg'
import seasonalServicesGraphic from '../assets/photos/seasonal-services-graphic.webp'
import seniorPortraitScissors from '../assets/photos/senior-portrait-scissors.jpg'
import seniorPortraitScissorsSquare from '../assets/photos/senior-portrait-scissors-square.jpg'
import seniorHeadshot from '../assets/photos/senior-headshot-vertical.jpg'
import iceProtestUsBankStadium from '../assets/photos/ice-protest-us-bank-stadium.png'
import casteHierarchyIllustration from '../assets/photos/caste-hierarchy-illustration.webp'
import smithsonianLogo from '../assets/photos/smithsonian-collections-digitization.webp'
import feedMyStarvingChildrenLogo from '../assets/photos/feed-my-starving-children.jpg'
import humanityAllianceLogo from '../assets/photos/the-humanity-alliance.webp'
import econClubFirstMeeting from '../assets/photos/econ-club-first-meeting.jpg'
import tennisBTeamSingles from '../assets/photos/tennis-b-team-singles-champion.jpg'
import hosaSlcGroup from '../assets/photos/hosa-slc-group.webp'
import seniorPortraitCreek from '../assets/photos/senior-portrait-creek.jpg'

interface Entry {
  title: ReactNode
  org?: string
  dates?: string
  description?: string
  bullets?: string[]
  /** Nudges the title down ~0.5pt so a very long title doesn't crowd its neighbors. */
  compactTitle?: boolean
}

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <div className="flex flex-col gap-5">
      {entries.map((entry, i) => (
        <div key={i}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className={`font-semibold text-[#D7E2EA] ${entry.compactTitle ? 'text-[15.3px] sm:text-[15.3px]' : ''}`}>
              {entry.title}
              {entry.org && <span className="font-normal text-[#D7E2EA]/70"> -- {entry.org}</span>}
            </p>
            {entry.dates && <p className="text-xs text-[#D7E2EA]/50">{entry.dates}</p>}
          </div>
          {entry.description && <p className="mt-1.5 text-sm text-[#D7E2EA]/80">{entry.description}</p>}
          {entry.bullets && (
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[#D7E2EA]/80">
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

// On desktop the photo is absolutely positioned so it adds no height of its
// own: the row is exactly as tall as the text beside it, and the photo runs
// from the top of the first line to the bottom of the last.
function Headshot() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-[240px] md:mx-0 md:aspect-auto md:max-w-none md:self-stretch">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Enlarge photo: Aarush Pomar"
        className="group absolute inset-0 block cursor-zoom-in overflow-hidden rounded-2xl"
      >
        <img
          src={seniorHeadshot}
          alt="Aarush Pomar"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <EnlargeHint />
      </button>
      {open && <Lightbox src={seniorHeadshot} alt="Aarush Pomar" onClose={() => setOpen(false)} />}
    </div>
  )
}

export default function ResumePage() {
  return (
    <PageLayout>
      <PageHeader title="Resume" subtitle="Minnetonka High School -- Class of 2026" />

      <section className="grid gap-8 pb-10 pt-4 md:grid-cols-[216px_1fr]">
        <Headshot />
        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50 sm:text-sm">Education</p>
            <p className="mt-1 text-base leading-relaxed sm:text-lg">Minnetonka High School -- September 2023 to Present</p>
            <p className="text-base leading-relaxed sm:text-lg">
              University of Minnesota Talented Youth Mathematics Program (UMTYMP) -- September 2021 to Present
            </p>
            <p className="text-base leading-relaxed sm:text-lg">
              Cornell University -- AEM 1300: Introduction to Macroeconomic Theory and Policy -- Summer 2026
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50 sm:text-sm">Academics</p>
            <p className="mt-1 text-base leading-relaxed sm:text-lg">GPA: 4.433 Weighted / 3.800 Unweighted</p>
            <p className="text-base leading-relaxed sm:text-lg">
              SAT: <span className="font-semibold text-[#BBCCD7]">1540</span> (750 Reading &amp; Writing, 790 Math)
            </p>
            <p className="text-base leading-relaxed sm:text-lg">
              19 AP/college-level courses (14 AP, 1 self-study AP, 3 years UMTYMP, 1 Cornell University course)
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-8 pb-10 sm:gap-10">
        <FeatureCard
          number="01"
          category="Honors / Awards"
          title="Recognition"
          imageLabel="Awards photo"
          imageSrc={umtympStage}
          imageCaption="UMTYMP Class of 2026"
          fitPhotosToText
          extraImages={[
            {
              src: presidentialAwardMedal,
              label: 'Gold Presidential Volunteer Service Award medal',
              caption: 'Gold Presidential Volunteer Service Award',
              aspectRatio: 508 / 491,
            },
            { src: conferenceGroupSuits, label: 'DECA State group photo', caption: 'DECA State', aspectRatio: 576 / 563 },
            { src: conferenceGroupWinter, label: 'BPA chapter photo', caption: 'Our BPA chapter', aspectRatio: 796 / 608 },
          ]}
        >
          <EntryList
            entries={[
              {
                title: 'Cornell University -- AEM 1300: Introduction to Macroeconomic Theory and Policy',
                org: 'Grade: A+',
                compactTitle: true,
                dates: 'Summer 2026',
                bullets: [
                  'Completed Cornell\'s intensive three-week version of AEM 1300, covering the full standard-semester curriculum -- macroeconomic theory, policy, incentives, trade, opportunity cost, and real-world economic decision-making -- with no reduction in academic content',
                ],
              },
              { title: 'The Borgen Project -- Chief Closer Award', dates: 'Junior (2025-2026)', bullets: ['Raised $1,000+ through proceeds from my barbering venture'] },
              { title: 'AP Scholar with Distinction', dates: 'Sophomore (2024-2025)', bullets: ['Earned for high performance across multiple AP exams'] },
              { title: 'Gold -- Presidential Volunteer Service Award', dates: 'Jun 2023 -- Sep 2023', bullets: ['Recognized for over 100 hours of impactful community service'] },
              { title: 'HOSA -- Minnesota State Leadership Conference', dates: 'Junior (2025-2026)', bullets: ['2nd Place -- State Competition, ATC Environmental Health Test'] },
              { title: 'BPA -- Vice President', dates: 'Junior (2025-2026)', bullets: ['1st Place -- Regional Competition, Basic Office Systems and Procedures'] },
              { title: 'BPA', dates: 'Junior (2025-2026)', bullets: ['3rd Place -- Regional Competition, Financial Math and Analysis'] },
              { title: 'DECA State Finalist', dates: 'Sophomore (2024-2025)', bullets: ['Placed 5th across all of Minnesota DECA Business Competition'] },
              { title: 'DECA', dates: 'Junior (2025-2026)', bullets: ['2nd Place -- Regional Competition, International Business Plan'] },
              { title: 'A-Roll Honors Student', dates: 'Freshman (2023) -- Current', bullets: ['Consistently maintained a GPA above 3.6 every semester'] },
              { title: 'National Honor Society (NHS)', dates: 'Junior (2025-2026)', bullets: ['Selected based on academic excellence, leadership, service, and character'] },
              { title: 'Academic Letter', dates: 'Freshman (2023) -- Current', bullets: ['Awarded for sustained academic excellence'] },
            ]}
          />
        </FeatureCard>

        <FeatureCard
          number="02"
          category="Work Experience"
          title="On the Job"
          imageLabel="Barbering photo"
          imageSrc={haircutDetailWork}
          imageCaption="Freelance barbering -- @pomar.blendz"
          photoLayout="row"
          extraImages={[
            {
              src: seasonalServicesGraphic,
              label: 'Seasonal Services graphic',
              caption: 'Seasonal Services -- lawn care & yard work',
            },
            {
              src: seniorPortraitScissorsSquare,
              fullSrc: seniorPortraitScissors,
              label: 'Barbering tools portrait',
              caption: 'Tools of the trade',
            },
          ]}
        >
          <EntryList
            entries={[
              { title: 'Freelance Barber', org: 'Self-Employed', dates: 'Sophomore (2024) -- Current, 10 hrs/wk, ongoing', bullets: ['Provide haircutting services to regular paying clients from the local community', 'Schedule appointments, manage payments, and ensure client satisfaction independently', 'Built a consistent client base through reliable service, precision, and referrals'] },
              { title: 'The Borgen Project', org: 'Regional Director', dates: 'Jul 7, 2026 -- Sep 21, 2026, Summer | 5 hrs/wk, 11 wks/yr', bullets: ['Completed a structured advocacy internship focused on global poverty reduction and policy education', 'Raised $1,000 for anti-poverty legislation through independent fundraising tied to freelance haircutting', 'Engaged in outreach to legislators and community members on global development policy'] },
              { title: 'Seasonal Services', org: 'Co-Founder & Lawn Care Worker', dates: 'Freshman (2023) -- Current, Summers | 3 hrs/wk, 8 wks/yr', bullets: ['Started a small local service with peers to provide lawn mowing, dog sitting, and other basic yard/household tasks', 'Developed responsibility, time management, and customer service skills through consistent summer work'] },
              { title: 'Equality Labs', org: 'Student Ambassador', dates: 'Jul 2026 -- Sep 2026', bullets: ['Launch signature drives to ban caste-based discrimination in the South Asian diaspora in the United States', 'Fundraise to support Unlearning Caste Supremacy Trainings'] },
              { title: 'The Remedy Project', org: 'Student Ambassador', dates: 'Sep 2026 -- Current', bullets: ['Raise awareness around prison justice and the rights of incarcerated people', 'Raised $1,000+ to support The Remedy Project\'s advocacy work'] },
            ]}
          />
        </FeatureCard>

        <FeatureCard
          number="03"
          category="Research Experience"
          title="In Process"
          imageLabel="Immigration enforcement protest, Minneapolis"
          imageSrc={iceProtestUsBankStadium}
          imageCaption="ICE protest in Minneapolis"
          imageAspectRatio={455 / 468}
          extraImages={[
            {
              src: casteHierarchyIllustration,
              label: 'Illustration depicting the Indian caste hierarchy',
              caption: 'The Indian caste hierarchy',
              aspectRatio: 1266 / 1240,
            },
          ]}
        >
          <EntryList
            entries={[
              {
                title: (
                  <>
                    Economic Fallout and Forced Financial Survival Strategies
                    <br />
                    of Immigrants in the Wake of ICE Activity in Minnesota
                  </>
                ),
                dates: 'In Process',
                description:
                  'Examines how heightened immigration-enforcement activity in Minnesota created economic disruption -- reduced customer traffic, labor shortages, and financial strain -- for small businesses in affected Minneapolis communities, even beyond those directly targeted. Combines existing economic data with original interviews from small-business owners in the communities most affected.',
                bullets: [
                  'Reviewing existing economic assessments, city data, and public reporting on Operation Metro Surge',
                  'To be submitted to Journal of International Migration and Integration (JIMI)',
                  'Mentor: Professor Miguel Quiñones, University of Minnesota Twin Cities',
                ],
              },
              {
                title: (
                  <>
                    Caste Awareness and Identity Across Generations
                    <br />
                    in Minnesota's South Asian Diaspora
                  </>
                ),
                dates: 'In Process',
                description:
                  'Explores how knowledge, discussion, and awareness of caste differ between first-generation South Asian immigrants and second- or third-generation South Asian Americans in Minnesota -- including how caste is inferred through surnames or religion, and whether caste identity is fading across generations or persisting in subtler forms.',
                bullets: [
                  'Developing a research question and literature review with guidance from Dr. Zubin DeVitre',
                  'Mentor: Dr. Zubin DeVitre, University of Wisconsin–Madison',
                ],
              },
            ]}
          />
        </FeatureCard>

        <FeatureCard
          number="04"
          category="Volunteer Experience"
          title="Giving Back"
          imageLabel="Smithsonian Collections Digitization logo"
          imageSrc={smithsonianLogo}
          imageCaption="Smithsonian -- Digital Transcriptor"
          photoLayout="row"
          extraImages={[
            {
              src: feedMyStarvingChildrenLogo,
              label: 'Feed My Starving Children logo',
              caption: 'Feed My Starving Children -- Food Packager',
            },
            {
              src: humanityAllianceLogo,
              label: 'The Humanity Alliance logo',
              caption: 'The Humanity Alliance -- Volunteer Cook',
            },
          ]}
        >
          <EntryList
            entries={[
              { title: 'Smithsonian', org: 'Digital Transcriptor', dates: 'Jun 19, 2023 -- Sep 21, 2023, 90 hrs', bullets: ['Transcribed historical documents to support public accessibility and digital archiving'] },
              { title: 'Feed My Starving Children', org: 'Food Packager', dates: 'Jun 25, 2023 -- Aug 13, 2023, 15 hrs', bullets: ['Packed meals for international hunger relief efforts in a team-based environment'] },
              { title: 'The Humanity Alliance', org: 'Volunteer Cook', dates: 'Aug 21, 2023 -- Aug 27, 2023, 5 hrs', bullets: ['Cooked and served meals to individuals facing food insecurity'] },
            ]}
          />
        </FeatureCard>

        <FeatureCard
          number="05"
          category="Leadership Experience"
          title="Leading Teams"
          imageLabel="Minnetonka Forum photo"
          imageSrc={minnetonkaForumGroup}
          imageCaption="Minnetonka Forum team"
          imageAspectRatio={828 / 797}
          extraImages={[
            {
              src: econClubFirstMeeting,
              label: 'First Econ Club meeting',
              caption: 'First Econ Club meeting ever',
              // Same shape as the Forum photo above it; clicking opens the full wide photo.
              aspectRatio: 828 / 797,
            },
          ]}
        >
          <EntryList
            entries={[
              { title: 'Minnetonka Forum', org: 'Co-President', dates: 'Sophomore (2024) -- Current', bullets: ['Co-led the planning and execution of a school-wide event attended by 60-70 students', 'Coordinated with a team to invite and host 3-4 CEOs for a panel on resilience'] },
              { title: 'Econ Club', org: 'President & Founder', dates: 'Junior (2025) -- Current', bullets: ['Lead preparation for the National Economics Challenge by organizing study sessions', 'Organize weekly activities and coordinate members to work as a team'] },
              { title: 'Business Professionals of America (BPA)', org: 'Vice President', dates: 'Junior (2025) -- Current', bullets: ['Help coordinate meetings, member engagement, and chapter activities', 'Earned 1st Place in Basic Office Systems & Procedures and 3rd Place in Financial Math & Analysis at the Regional Leadership Conference'] },
              { title: 'National Honor Society (NHS)', org: 'President', dates: 'Junior (2025) -- Current', bullets: ['Directed chapter initiatives focused on service, leadership, and academic excellence'] },
              { title: 'Desi Student Union', org: 'Officer', dates: 'Freshman (2023) -- Current', bullets: ['Help organize cultural events and activities that promote South Asian heritage and community engagement'] },
            ]}
          />
        </FeatureCard>

        <FeatureCard
          number="06"
          category="Extracurricular Activities"
          title="Outside the Classroom"
          imageLabel="Minnetonka B Team singles champion"
          imageSrc={tennisBTeamSingles}
          imageCaption="Minnetonka B Team singles champion"
          imageAspectRatio={828 / 853}
          fitPhotosToText
          extraImages={[
            {
              // Same square-ish shape as the tennis photo; clicking it still
              // opens the whole wide group shot.
              src: hosaSlcGroup,
              label: 'HOSA State Leadership Conference',
              caption: 'HOSA SLC',
              aspectRatio: 828 / 853,
            },
          ]}
        >
          <EntryList
            entries={[
              { title: 'High School Tennis Team', org: 'JV Athlete', dates: 'Mar 20, 2024 -- May 15, 2024', description: 'Competed in singles for the Minnetonka B Team, balancing daily practices and matches with a full academic schedule.', bullets: ['Competed in matches and attended regular practices during the spring season', 'Won the Minnetonka B Team singles championship'] },
              { title: 'HOSA', org: 'Member', dates: 'Sophomore (2024) -- Current', description: 'Member of the healthcare-focused student organization, competing in health-science events and attending state-level leadership programming.', bullets: ['Engaged in healthcare-related discussions and events', 'Placed 2nd at the Minnesota State Leadership Conference (SLC), ATC Environmental Health Test'] },
              { title: 'DECA', org: 'Member', dates: 'Freshman (2023) -- Current', description: 'Competes in business and marketing events, building presentation, financial-analysis, and business-plan skills.', bullets: ['Placed 5th at the Minnesota DECA State Competition (Sophomore year)', 'Placed 2nd at Regionals in International Business Plan (Junior year)'] },
              { title: 'Content Creator', org: 'TikTok / Video Editing', dates: 'Sophomore (2024) -- Current', description: 'Creates and edits short-form videos for TikTok, focused on growing an engaged audience.', bullets: ['Produced short-form video content using CapCut', 'Built an audience of 1.1K followers through consistent engagement and content strategy'] },
            ]}
          />
        </FeatureCard>

        <FeatureCard
          number="07"
          category="Skills"
          title="Technical & Languages"
          imageLabel="Skills photo"
          imageSrc={seniorPortraitCreek}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50">Technical</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>CapCut (Proficient)</li>
                <li>Canva (Proficient)</li>
                <li>Java (Intermediate)</li>
                <li>PC Building &amp; Hardware Setup (Proficient)</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50">Languages</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>English (Native)</li>
                <li>Telugu (Conversational)</li>
                <li>Spanish (Beginner)</li>
              </ul>
            </div>
          </div>
        </FeatureCard>
      </div>
    </PageLayout>
  )
}
