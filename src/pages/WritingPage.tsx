import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import FeatureCard from '../components/shared/FeatureCard'

export default function WritingPage() {
  return (
    <PageLayout>
      <PageHeader title="Writing" />

      <div className="flex flex-col gap-8 pb-10 pt-4 sm:gap-10">
        <FeatureCard number="01" category="Personal Essay -- Draft Coming Soon" title="Cutting Against the Grain">
          <p>
            A personal essay on barbering, identity, and turning a skill my family once
            questioned into a way to give back.
          </p>
          <div className="mt-4 rounded-2xl border border-dashed border-[#D7E2EA]/25 bg-[#141414] px-6 py-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/40">Essay draft coming soon</p>
          </div>
        </FeatureCard>

        <FeatureCard number="02" category="Personal Essay -- Draft Coming Soon" title="Lessons in Unfairness">
          <p>A personal essay reflecting on an experience with unfair treatment at school and what it taught me about resilience.</p>
          <div className="mt-4 rounded-2xl border border-dashed border-[#D7E2EA]/25 bg-[#141414] px-6 py-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/40">Essay draft coming soon</p>
          </div>
        </FeatureCard>
      </div>
    </PageLayout>
  )
}
