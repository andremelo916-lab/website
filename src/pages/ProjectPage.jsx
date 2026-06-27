import { useEffect } from 'react'
import GlassSurface from '../components/GlassSurface'
import ShinyText from '../components/ShinyText'
import './ProjectPage.css'

export default function ProjectPage({ project, onBack, onBackToWebsite }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'auto'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!project) return null

  return (
    <div className="proj-page">
      <header className="proj-page__header">
        <div className="proj-page__nav-btns">
          <button className="proj-page__glass-btn" onClick={onBack}>
            <GlassSurface borderRadius={75}>
              ← Back to Hub
            </GlassSurface>
          </button>
          {onBackToWebsite && (
            <button className="proj-page__glass-btn" onClick={onBackToWebsite}>
              <GlassSurface borderRadius={75}>
                ← Back to Website
              </GlassSurface>
            </button>
          )}
        </div>
      </header>

      <div className="proj-page__hero">
        <p className="proj-page__label">
          <ShinyText text={project.label} speed={4} color="#888888" shineColor="#cccccc" spread={100} />
        </p>
        <h1 className="proj-page__title">
          <ShinyText text={project.title} speed={5} color="#d0d0d0" shineColor="#ffffff" spread={110} />
        </h1>
        <div className="proj-page__tags">
          {project.tags.map((t) => (
            <span key={t} className="proj-page__tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="proj-page__body">
        <section className="proj-page__section">
          <h2 className="proj-page__section-heading"><ShinyText text="About the Project" speed={4} color="#888888" shineColor="#ffffff" spread={100} /></h2>
          <p className="proj-page__text">{project.fullDesc}</p>
        </section>

        <section className="proj-page__section">
          <h2 className="proj-page__section-heading"><ShinyText text="My Contribution" speed={4} color="#888888" shineColor="#ffffff" spread={100} /></h2>
          <p className="proj-page__text">{project.contribution}</p>
        </section>

        <section className="proj-page__section">
          <h2 className="proj-page__section-heading"><ShinyText text="Technical Approach" speed={4} color="#888888" shineColor="#ffffff" spread={100} /></h2>
          <p className="proj-page__text">{project.technical}</p>
        </section>
      </div>
    </div>
  )
}
