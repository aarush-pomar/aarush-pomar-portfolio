import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import FeatureCard from '../components/shared/FeatureCard'
import PillLink from '../components/shared/PillLink'
import borgenCheck from '../assets/photos/borgen-check.jpg'
import borgenProjectStudents from '../assets/photos/borgen-project-students.jpg'
import remedyProjectLogo from '../assets/photos/remedy-project-logo.jpg'
import equalityLabsCasteEquity from '../assets/photos/equality-labs-caste-equity.jpg'

export default function AdvocacyPage() {
  return (
    <PageLayout>
      <PageHeader title="Advocacy" subtitle="Turning a personal skill into a way to give back" />

      <div className="flex flex-col gap-8 pb-10 pt-4 sm:gap-10">
        <FeatureCard
          number="01"
          category="Nonprofit -- Regional Director"
          title="The Borgen Project"
          imageLabel="Borgen Project photo"
          imageSrc={borgenProjectStudents}
          actions={<PillLink href="https://borgenproject.org/">Website</PillLink>}
        >
          <p>
            The Borgen Project is a non-profit focused on making global poverty reduction a
            primary focus of U.S. foreign policy -- mobilizing volunteers to advocate for
            poverty-reduction legislation through outreach to Congress, fundraising, and public
            education.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Raise awareness about global poverty and mobilize my community to contact Congress in support of life-saving foreign policy legislation</li>
            <li>Fundraise and lobby my members of Congress to support the International Affairs Budget</li>
            <li>
              Published a policy article for The Borgen Project on how competition policy can lower
              prices and reduce poverty:{' '}
              <a
                href="https://borgenproject.org/competition-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D7E2EA] underline decoration-[#D7E2EA]/30 underline-offset-4 transition-colors hover:text-[#BBCCD7]"
              >
                &ldquo;The Most Powerful Anti-Poverty Tool? Competition Policy&rdquo;
              </a>
            </li>
            <li>Received the Chief Closer Award (raised over $1,000)</li>
          </ul>
        </FeatureCard>

        <FeatureCard
          number="02"
          category="Freelance Business -- @pomar.blendz"
          title="Barbering, Turned Fundraiser"
          imageLabel="$1,000 check photo"
          imageSrc={borgenCheck}
          imageCaption="The $1,000 check, funded entirely by haircuts"
          actions={<PillLink href="https://instagram.com/pomar.blendz">Instagram</PillLink>}
        >
          <p>
            What started as a personal hobby turned into a real freelance business -- cutting
            hair for a steady base of local clients. Rather than keeping the proceeds, I put my
            barbering to work for something bigger: every haircut went toward funding my
            advocacy work.
          </p>
          <p>
            Over 50 hours and roughly 10 haircuts later, I raised more than{' '}
            <span className="font-semibold text-[#BBCCD7]">$1,000</span> for The Borgen Project --
            entirely through my own barbering venture.
          </p>
        </FeatureCard>

        <FeatureCard
          number="03"
          category="Aspiring Student Ambassador"
          title="Equality Labs"
          imageLabel="Equality Labs photo"
          imageSrc={equalityLabsCasteEquity}
          actions={<PillLink href="https://www.equalitylabs.org/">Website</PillLink>}
        >
          <ul className="list-disc space-y-1 pl-5">
            <li>An organization working to bring awareness to and end caste-based discrimination in the South Asian diaspora in the United States</li>
            <li>Signature drives to ban caste-based discrimination</li>
            <li>Fundraising to support Unlearning Caste Supremacy Trainings</li>
          </ul>
          <p>This work connects directly to my own background and research interests around caste and identity.</p>
        </FeatureCard>

        <FeatureCard
          number="04"
          category="Student Ambassador"
          title="The Remedy Project"
          imageLabel="Remedy Project photo"
          imageSrc={remedyProjectLogo}
          actions={<PillLink href="https://www.theremedyproj.org/">Website</PillLink>}
        >
          <p>
            The Remedy Project is a national network of students and justice-system-impacted
            people advocating for the civil and human rights of incarcerated people in the
            United States.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Serve as a Student Ambassador, raising awareness around prison justice and incarcerated people's rights</li>
            <li>Raised $1,000+ to support The Remedy Project's advocacy work</li>
          </ul>
        </FeatureCard>
      </div>
    </PageLayout>
  )
}
