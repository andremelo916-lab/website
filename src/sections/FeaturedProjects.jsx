import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GradualBlur from '../components/GradualBlur'
import './FeaturedProjects.css'

const projects = [
  {
    id: 'notebookam',
    title: 'NotebookAM',
    subtitle: 'Note taking app',
    img: '/notebookam.png',
  },
  {
    id: 'travel',
    title: 'Travel',
    subtitle: 'Travel Vlogs',
    img: '/travel.png',
  },
]

export default function FeaturedProjects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fp__card', {
        scrollTrigger: { trigger: '.fp__grid', start: 'top 78%' },
        y: 48,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.14,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="fp" id="projects" ref={sectionRef}>
      <GradualBlur position="top" height="9rem" strength={3} divCount={9} curve="bezier" exponential={true} zIndex={10} />

      <h2 className="fp__heading section-heading">
        Featured<br />Projects
      </h2>

      <div className="fp__grid">
        {projects.map((p) => (
          <div key={p.id} className="fp__card">
            <div
              className="fp__card-img"
              style={{ backgroundImage: `url(${p.img})` }}
              role="img"
              aria-label={p.title}
            />
            <div className="fp__card-info">
              <h3 className="fp__card-title">{p.title}</h3>
              <p className="fp__card-sub">{p.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <GradualBlur position="bottom" height="9rem" strength={3} divCount={9} curve="bezier" exponential={true} zIndex={10} />
    </section>
  )
}
