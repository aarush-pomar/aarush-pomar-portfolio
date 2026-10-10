import FitText from './FitText'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="px-6 pb-10 pt-14 text-center md:px-10 md:pt-20">
      {/* A fixed clamp()-based font-size doesn't know how long any given
          title actually is -- a long single word like "ENTREPRENEURSHIP"
          can overflow past the viewport edge at sizes a short title like
          "More" never would. FitText (already used for the home hero's
          heading) measures the real rendered width and solves for the
          font-size that exactly fills it, so every title fits regardless
          of word length. */}
      <h1 className="hero-heading font-black uppercase leading-none tracking-tight">
        <FitText text={title} className="block" maxFontSize={96} />
      </h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-sm font-light uppercase tracking-wide text-[#D7E2EA]/70 sm:text-base">
          {subtitle}
        </p>
      )}
    </header>
  )
}
