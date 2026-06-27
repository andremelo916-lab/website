import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Threads from '../components/Threads'
import TypedCode from '../components/TypedCode'
import DotField from '../components/DotField'
import './About.css'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about__reveal', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.12,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__dotfield" aria-hidden="true">
        <DotField
          gradientFrom="rgba(255,255,255,0.14)"
          gradientTo="rgba(255,255,255,0.05)"
          glowRadius={0}
          dotRadius={1.3}
          dotSpacing={20}
          bulgeStrength={40}
        />
      </div>
      <div className="about__beams" aria-hidden="true">
        <Threads amplitude={1.5} distance={0.3} enableMouseInteraction={true} />
      </div>
      <div className="about__top">
        <h2 className="about__hey section-heading">Hey!</h2>
        <div className="about__body">
          <p className="about__intro about__reveal">
            I&apos;m André a recent Data Scientist evolving from Process
            Development Engineering at Bosch Portugal,{' '}
            <span className="about__scroll-hint">scroll for more insights</span>
          </p>
          <TypedCode />
        </div>
      </div>

    </section>
  )
}
