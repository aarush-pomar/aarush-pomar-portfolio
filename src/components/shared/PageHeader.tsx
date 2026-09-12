interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="px-6 pb-10 pt-14 text-center md:px-10 md:pt-20">
      <h1
        className="hero-heading font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-sm font-light uppercase tracking-wide text-[#D7E2EA]/70 sm:text-base">
          {subtitle}
        </p>
      )}
    </header>
  )
}
