import { useEffect, useRef, useState } from 'react'
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
  const [showDragHint, setShowDragHint] = useState(true)
  const isMobile = useRef(window.innerWidth <= 768).current

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const hideDragHint = () => setShowDragHint(false)

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

      <div className="hub__canvas-area" onPointerDown={hideDragHint}>
        <InfiniteMenu
          items={hubItems}
          scale={isMobile ? 1.8 : 1.0}
          onItemClick={idx => onOpenProject?.(workProjects[idx]?.id)}
        />
        {showDragHint && (
          <div className="hub__drag-hint">
            <svg className="hub__drag-hand" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11V6a1.5 1.5 0 0 1 3 0v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11V5a1.5 1.5 0 0 1 3 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 11V8a1.5 1.5 0 0 1 3 0v5c0 3.314-2.686 6-6 6H9a6 6 0 0 1-6-6v-1a1.5 1.5 0 0 1 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11a1.5 1.5 0 0 0-3 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
