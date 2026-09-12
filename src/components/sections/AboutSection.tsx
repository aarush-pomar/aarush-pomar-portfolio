import FadeIn from '../shared/FadeIn'
import AnimatedText from '../shared/AnimatedText'
import iconScissors from '../../assets/icon-scissors.png'
import iconDumbbell from '../../assets/icon-dumbbell.png'
import iconMouse from '../../assets/icon-mouse.png'
import iconPickleball from '../../assets/icon-pickleball.png'

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen px-5 py-20 sm:px-8 md:px-10">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
        <img src={iconScissors} alt="" className="w-full mix-blend-screen" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
        <img src={iconDumbbell} alt="" className="w-full mix-blend-screen" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
        <img src={iconMouse} alt="" className="w-full mix-blend-screen" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
        <img src={iconPickleball} alt="" className="w-full mix-blend-screen" />
      </FadeIn>

      <div className="flex h-full min-h-[calc(100vh-10rem)] flex-col items-center justify-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text="I'm a senior at Minnetonka High School, Regional Director at The Borgen Project, and founder of my own freelance barbering business. Across my work, I've become interested in how economics, identity, and opportunity shape people's lives. That interest now drives my research on ICE activity in Minnesota and caste within the South Asian diaspora."
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>
      </div>
    </section>
  )
}
