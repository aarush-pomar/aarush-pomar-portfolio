import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import FeatureCard from '../components/shared/FeatureCard'
import PillLink from '../components/shared/PillLink'

export default function WritingPage() {
  return (
    <PageLayout>
      <PageHeader title="Writing" />

      <div className="flex flex-col gap-8 pb-10 pt-4 sm:gap-10">
        <FeatureCard
          number="01"
          category="Published -- The Borgen Project"
          title="The Most Powerful Anti-Poverty Tool? Competition Policy"
          actions={<PillLink href="https://borgenproject.org/competition-policy/">Read Article</PillLink>}
        >
          <p>
            Published September 2026. Argues that well-designed competition policy is an
            effective, underused tool for reducing poverty by lowering prices in essential
            markets -- drawing on case studies from Georgia's pharmaceutical reforms, Egypt's
            education market interventions, and Mexico's health procurement enforcement to
            show how tackling monopolies and cartels can generate real household savings and
            open up economic opportunity for low-income populations.
          </p>
        </FeatureCard>
      </div>
    </PageLayout>
  )
}
