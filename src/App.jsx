import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DotField from './components/DotField'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Creating from './sections/Creating'
import PersonalProjects from './sections/PersonalProjects'
import WorkProjects from './sections/WorkProjects'
import Thoughts from './sections/Thoughts'
import Contact from './sections/Contact'
import ProjectPage from './pages/ProjectPage'
import ProjectHub from './pages/ProjectHub'
import { workProjects } from './data/workProjects'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [overlay, setOverlay] = useState(null) // null | { type: 'project', id } | { type: 'hub' }
  const [cardKey, setCardKey] = useState(0)

  const openProject = (id) => {
    setOverlay({ type: 'project', id })
    document.body.style.overflow = 'hidden'
  }
  const openHub = () => {
    setOverlay({ type: 'hub' })
    document.body.style.overflow = 'hidden'
  }
  const closeOverlay = () => {
    setOverlay(null)
    setCardKey(k => k + 1)
    document.body.style.overflow = ''
    requestAnimationFrame(() => {
      document.getElementById('work-projects')?.scrollIntoView({ behavior: 'smooth' })
    })
  }
  const goToHub = () => {
    setOverlay({ type: 'hub' })
  }

  useEffect(() => {
    const headings = document.querySelectorAll('.section-heading')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-heading--in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    headings.forEach((el) => io.observe(el))

    const ctx = gsap.context(() => {
      gsap.to('.hero__inner', {
        scale: 0.82,
        borderRadius: '22px',
        filter: 'blur(5px)',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '+=20%',
          scrub: 0.4,
          pin: true,
          pinSpacing: true,
        },
      })
    })

    return () => {
      io.disconnect()
      ctx.revert()
    }
  }, [])

  const activeProject = overlay?.type === 'project'
    ? workProjects.find((p) => p.id === overlay.id)
    : null

  return (
    <>
      <div className="page-dotfield">
        <DotField
          gradientFrom="rgba(255, 255, 255, 0.18)"
          gradientTo="rgba(255, 255, 255, 0.07)"
          glowRadius={0}
          dotRadius={1.4}
          dotSpacing={20}
          bulgeStrength={50}
        />
      </div>

      <Nav />

      <main>
        <Hero />
        <About />
        <WorkProjects onOpenProject={openProject} onOpenHub={openHub} resetKey={cardKey} />
        <Creating />
        <PersonalProjects />
        <Thoughts />
        <Contact />
      </main>

      {overlay?.type === 'project' && activeProject && (
        <ProjectPage project={activeProject} onBack={closeOverlay} onGoToHub={goToHub} />
      )}
      {overlay?.type === 'hub' && (
        <ProjectHub onBack={closeOverlay} onOpenProject={openProject} />
      )}
    </>
  )
}
