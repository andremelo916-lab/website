import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Creating.css'

const items = [
  {
    name: 'NotebookAM',
    tags: ['Take notes like a physical notebook', 'Organize tasks', 'Change your theme'],
  },
  {
    name: 'ShapeME',
    tags: ['iOS app', 'Health', 'Motivation'],
  },
  {
    name: 'MoneyAM',
    tags: ['Money tracking', 'Save stocks', 'Plan your savings'],
  },
  {
    name: 'Travel Videos',
    tags: ['For fun', 'Just Sharing', 'To check it when I\'m older'],
  },
]

export default function Creating() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.creating__row', {
        scrollTrigger: { trigger: '.creating__list', start: 'top 80%' },
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="creating" ref={sectionRef}>
      <h2 className="creating__heading section-heading">CREATING...</h2>

      <ul className="creating__list">
        {items.map((item) => (
          <li key={item.name} className="creating__row">
            <span className="creating__name">{item.name}</span>
            <span className="creating__tags">
              {item.tags.join(' • ')}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
