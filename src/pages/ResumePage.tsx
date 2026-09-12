import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import PlaceholderImage from '../components/shared/PlaceholderImage'
import FeatureCard from '../components/shared/FeatureCard'
import umtympStage from '../assets/photos/award-umtymp-stage.jpg'
import haircutDetailWork from '../assets/photos/haircut-detail-work.jpg'
import minnetonkaForumGroup from '../assets/photos/minnetonka-forum-group.jpg'

interface Entry {
  title: string
  org?: string
  dates: string
  bullets?: string[]
}

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <div className="flex flex-col gap-5">
      {entries.map((entry) => (
        <div key={entry.title + entry.dates}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-semibold text-[#D7E2EA]">
              {entry.title}
              {entry.org && <span className="font-normal text-[#D7E2EA]/70"> -- {entry.org}</span>}
            </p>
            <p className="text-xs text-[#D7E2EA]/50">{entry.dates}</p>
          </div>
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

export default function ResumePage() {
  return (
    <PageLayout>
      <PageHeader title="Resume" subtitle="Minnetonka High School -- Class of 2026" />

      <section className="grid gap-8 pb-10 pt-4 md:grid-cols-[220px_1fr]">
        <PlaceholderImage label="Headshot" className="aspect-square w-full" />
        <div className="flex flex-col justify-center gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50">Education</p>
            <p className="mt-1 text-sm sm:text-base">Minnetonka High School -- September 2023 to Present</p>
            <p className="text-sm sm:text-base">
              University of Minnesota Talented Youth Mathematics Program (UMTYMP) -- September 2021 to Present
            </p>
            <p className="text-sm sm:text-base">
              Cornell University -- AEM 1300: Introduction to Macroeconomic Theory and Policy -- Summer 2026
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50">Academics</p>
            <p className="mt-1 text-sm sm:text-base">GPA: 4.433 Weighted / 3.800 Unweighted</p>
            <p className="text-sm sm:text-base">
              SAT: <span className="font-semibold text-[#BBCCD7]">1540</span> (750 Reading &amp; Writing, 790 Math)
            </p>
            <p className="text-sm sm:text-base">
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
        >
          <EntryList
            entries={[
              {
                title: 'Cornell University -- AEM 1300: Introduction to Macroeconomic Theory and Policy',
                org: 'Grade: A+',
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
        >
          <EntryList
            entries={[
              { title: 'Freelance Barber', org: 'Self-Employed', dates: 'Sophomore (2024) -- Current, 10 hrs/wk, ongoing', bullets: ['Provide haircutting services to regular paying clients from the local community', 'Schedule appointments, manage payments, and ensure client satisfaction independently', 'Built a consistent client base through reliable service, precision, and referrals'] },
              { title: 'The Borgen Project', org: 'Regional Director', dates: 'Jul 7, 2026 -- Sep 21, 2026, Summer | 5 hrs/wk, 11 wks/yr', bullets: ['Completed a structured advocacy internship focused on global poverty reduction and policy education', 'Raised $1,000 for anti-poverty legislation through independent fundraising tied to freelance haircutting', 'Engaged in outreach to legislators and community members on global development policy'] },
              { title: 'Seasonal Services', org: 'Co-Founder & Lawn Care Worker', dates: 'Freshman (2023) -- Current, Summers | 3 hrs/wk, 8 wks/yr', bullets: ['Started a small local service with peers to provide lawn mowing, dog sitting, and other basic yard/household tasks', 'Developed responsibility, time management, and customer service skills through consistent summer work'] },
              { title: 'Equality Labs', org: 'Student Ambassador', dates: 'Jul 2026 -- Sep 2026', bullets: ['Launch signature drives to ban caste-based discrimination in the South Asian diaspora in the United States', 'Fundraise to support Unlearning Caste Supremacy Trainings'] },
            ]}
          />
        </FeatureCard>

        <FeatureCard number="03" category="Research Experience" title="In Process">
          <EntryList
            entries={[
              {
                title: 'Economic Fallout and Forced Financial Survival Strategies of Immigrants in the Wake of ICE Activity in Minnesota',
                dates: 'In Process',
                bullets: ['To be submitted to Journal of International Migration and Integration (JIMI)', 'Mentor: Professor Miguel Quiñones, University of Minnesota Twin Cities'],
              },
            ]}
          />
        </FeatureCard>

        <FeatureCard number="04" category="Volunteer Experience" title="Giving Back">
          <EntryList
            entries={[
              { title: 'Smithsonian', org: 'Digital Transcriptor', dates: 'Jun 19, 2023 -- Sep 21, 2023, 90 hrs', bullets: ['Transcribed historical documents to support public accessibility and digital archiving'] },
              { title: 'Feed My Starving Children', org: 'Food Packager', dates: 'Jun 25, 2023 -- Aug 13, 2023, 15 hrs', bullets: ['Packed meals for international hunger relief efforts in a team-based environment'] },
              { title: 'Humanitarian Alliance', org: 'Volunteer Cook', dates: 'Aug 21, 2023 -- Aug 27, 2023, 5 hrs', bullets: ['Cooked and served meals to individuals facing food insecurity'] },
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

        <FeatureCard number="06" category="Extracurricular Activities" title="Outside the Classroom">
          <EntryList
            entries={[
              { title: 'High School Tennis Team', org: 'JV Athlete', dates: 'Mar 20, 2024 -- May 15, 2024', bullets: ['Competed in matches and attended regular practices during the spring season'] },
              { title: 'HOSA', org: 'Member', dates: 'Sophomore (2024) -- Current', bullets: ['Engaged in healthcare-related discussions and events'] },
              { title: 'DECA', org: 'Member', dates: 'Freshman (2023) -- Current', bullets: ['Competed in business and marketing events; placed Top 5 at state competition'] },
              { title: 'Content Creator', org: 'TikTok / Video Editing', dates: 'Sophomore (2024) -- Current', bullets: ['Produced short-form video content using CapCut', 'Built an audience of 1.1K followers through consistent engagement and content strategy'] },
            ]}
          />
        </FeatureCard>

        <FeatureCard number="07" category="Skills" title="Technical & Languages">
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
