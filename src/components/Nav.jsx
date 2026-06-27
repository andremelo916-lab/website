import { useEffect, useRef } from 'react'
import GlassSurface from './GlassSurface'
import './Nav.css'

const links = [
  { href: '#about',    label: 'About'    },
  { href: '#projects', label: 'Projects' },
  { href: '#thoughts', label: 'Thoughts' },
  { href: '#contact',  label: 'Contact'  },
]

export default function Nav() {
  const navRef = useRef(null)

  useEffect(() => {
    function update() {
      const nav = navRef.current
      if (!nav) return
      const navBottom = nav.getBoundingClientRect().bottom
      const lightSections = document.querySelectorAll('.section--light')
      let isLight = false
      lightSections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (navBottom >= rect.top && navBottom <= rect.bottom) isLight = true
      })
      nav.dataset.theme = isLight ? 'light' : 'dark'
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <nav className="nav" ref={navRef} data-theme="dark">
      <span className="nav__logo">Web Curriculum</span>
      <ul className="nav__links">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a href={href} className="nav__link">
              <GlassSurface borderRadius={75} className="nav__glass-btn">
                {label}
              </GlassSurface>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
