import { useEffect } from 'react'
import InfiniteMenu from '../components/InfiniteMenu'
import ShinyText from '../components/ShinyText'
import { workProjects } from '../data/workProjects'
import './ProjectHub.css'

const hubItems = workProjects.map((p) => ({
  image: p.image,
  link: '#',
  title: p.title,
  description: p.label,
}))

export default function ProjectHub({ onBack, onOpenProject }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="hub">
      <header className="hub__header">
        <button className="hub__back" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Website
        </button>
        <h2 className="hub__title">All Work Projects</h2>
        <span className="hub__hint">
          <ShinyText text="Drag to explore" speed={3} color="#aaaaaa" shineColor="#ffffff" spread={90} />
        </span>
      </header>

      <div className="hub__canvas-area">
        <InfiniteMenu
          items={hubItems}
          scale={1.0}
          onItemClick={idx => onOpenProject?.(workProjects[idx]?.id)}
        />
      </div>
    </div>
  )
}
