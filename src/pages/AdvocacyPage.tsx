import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import FeatureCard from '../components/shared/FeatureCard'
import PillLink from '../components/shared/PillLink'
import borgenCheck from '../assets/photos/borgen-check.jpg'

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
            <li>Received the Chief Closer Award</li>
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
          category="In Progress"
          title="MN Financial Empowerment Initiative"
          imageLabel="MNFEI photo"
        >
          <p>
            Currently building a collaboration with MNFEI -- alongside my research mentor -- to
            help design surveys and collect data for immigrant communities affected by ICE
            activity in Minnesota.
          </p>
        </FeatureCard>
      </div>
    </PageLayout>
  )
}
