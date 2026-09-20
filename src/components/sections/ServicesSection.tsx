import { Link } from 'react-router-dom'
import FadeIn from '../shared/FadeIn'

const SERVICES: { number: string; name: string; desc: string | string[]; to: string }[] = [
  {
    number: '01',
    name: 'Advocacy',
    desc: 'Regional Director at The Borgen Project, using my own barbering business to fundraise and advocate for global poverty reduction.',
    to: '/advocacy',
  },
  {
    number: '02',
    name: 'Research',
    desc: 'Conducting two independent research projects: one on the economic effects of ICE activity in Minnesota, and another on caste awareness and identity within the South Asian diaspora.',
    to: '/research',
  },
  {
    number: '03',
    name: 'Barbering',
    desc: 'Built my own freelance barbering business, @pomar.blendz, from a personal skill into something much bigger.',
    to: '/barbering',
  },
  {
    number: '04',
    name: 'Leadership',
    desc: [
      'President -- National Honor Society',
      'Founder & President -- Econ Club',
      'Vice President -- Business Professionals of America',
      'Co-President -- Minnetonka Forum',
      'Officer -- Desi Student Union',
    ],
    to: '/resume',
  },
  {
    number: '05',
    name: 'Academics',
    desc: '4.433 weighted GPA, 1540 SAT, and 19 AP/college-level courses.',
    to: '/resume',
  },
]

export default function ServicesSection() {
  return (
    <section className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <h2
        className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Focus Areas
      </h2>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <Link
              to={service.to}
              className="flex items-center gap-6 border-b border-[rgba(12,12,12,0.15)] py-8 transition-opacity first:border-t hover:opacity-70 sm:py-10 md:py-12"
            >
              <span
                className="shrink-0 font-black text-[#0C0C0C]"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                {Array.isArray(service.desc) ? (
                  <ul
                    className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.desc.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.desc}
                  </p>
                )}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
