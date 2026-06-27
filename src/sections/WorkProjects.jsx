import { useEffect, useRef, useState } from 'react'
import CardSwap, { Card } from '../components/CardSwap'
import SplitText from '../components/SplitText'
import { workProjects } from '../data/workProjects'
import './WorkProjects.css'

export default function WorkProjects({ onOpenProject, onOpenHub, resetKey }) {
  const swapRef = useRef(null)
  const [frontIdx, setFrontIdx] = useState(0)

  useEffect(() => { setFrontIdx(0) }, [resetKey])

  const isSeeAll = frontIdx === workProjects.length
  const frontProject = isSeeAll ? null : workProjects[frontIdx]

  const handleNext = () => swapRef.current?.next()

  const handleCardClick = (idx) => {
    if (idx >= workProjects.length) onOpenHub?.()
    else onOpenProject?.(workProjects[idx].id)
  }

  const handleView = () => {
    if (isSeeAll) onOpenHub?.()
    else onOpenProject?.(frontProject.id)
  }

  return (
    <section className="wp" id="work-projects">
      <div className="wp__left">
        <SplitText
          text="Work Projects"
          tag="h2"
          className="wp__heading"
          splitType="chars"
          duration={0.7}
          delay={35}
          ease="power3.out"
          from={{ opacity: 0, y: 60, rotateX: -20 }}
          to={{ opacity: 1, y: 0, rotateX: 0 }}
          threshold={0.2}
          rootMargin="-60px"
          textAlign="left"
        />
        <div className="wp__sub-row">
          <p className="wp__sub">
            Projects developed at Bosch Portugal in manufacturing intelligence and data science.
          </p>
          <button className="wp__hub-btn" onClick={() => onOpenHub?.()}>
            Check all projects Hub →
          </button>
        </div>

        <div className="wp__cta">
          <div className="wp__cta-info">
            <span className="wp__cta-label">
              {isSeeAll ? 'All Projects' : frontProject?.label}
            </span>
            <span className="wp__cta-title">
              {isSeeAll ? 'See all work projects' : frontProject?.title}
            </span>
          </div>
          <button className="wp__view-btn" onClick={handleView}>
            {isSeeAll ? 'Explore Hub →' : 'View Project →'}
          </button>
        </div>
      </div>

      <div className="wp__right">
        <div className="wp__swap-wrap">
          <button className="wp__arrow" onClick={handleNext} aria-label="Next card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <CardSwap
            key={resetKey}
            ref={swapRef}
            width={580}
            height={400}
            cardDistance={55}
            verticalDistance={45}
            autoPlay={false}
            skewAmount={0}
            onFrontChange={setFrontIdx}
            onCardClick={handleCardClick}
          >
            {workProjects.map((p) => (
              <Card key={p.id}>
                <div className="wp__card-content">
                  <div className="wp__card-accent" style={{ background: p.accent }} />
                  <span className="wp__card-label" style={{ color: p.accent }}>{p.label}</span>
                  <div className="wp__card-body">
                    <h3 className="wp__card-title">{p.title}</h3>
                    <p className="wp__card-desc">{p.desc}</p>
                  </div>
                  <div className="wp__card-footer">
                    <div className="wp__card-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="wp__card-tag">{t}</span>
                      ))}
                    </div>
                    <button
                      className="wp__card-view-btn"
                      onClick={e => { e.stopPropagation(); onOpenProject?.(p.id) }}
                    >
                      View →
                    </button>
                  </div>
                </div>
              </Card>
            ))}

            <Card customClass="wp__card--more">
              <div className="wp__card-more-content">
                <span className="wp__card-more-icon">→</span>
                <h3 className="wp__card-more-title">See All</h3>
                <p className="wp__card-more-sub">View all work projects</p>
                <button
                  className="wp__card-view-btn wp__card-view-btn--hub"
                  onClick={e => { e.stopPropagation(); onOpenHub?.() }}
                >
                  Explore Hub →
                </button>
              </div>
            </Card>
          </CardSwap>

        </div>
      </div>
    </section>
  )
}
