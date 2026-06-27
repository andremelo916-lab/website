import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassSurface from '../components/GlassSurface'
import './Contact.css'

const socials = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/andreflmelo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andreflmelo/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@meloandre916-TLT',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
]

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact__reveal', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 30,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="contact" id="contact" ref={sectionRef}>
        <h2 className="contact__heading section-heading">Let&apos;s talk.</h2>
        <p className="contact__sub contact__reveal">
          Have a project to collab? Just wanna get in touch?
        </p>
        <div className="contact__socials contact__reveal">
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              className="contact__social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassSurface borderRadius={75} className="contact__glass-btn">
                <span className="contact__btn-inner">
                  {s.icon}
                  <span>{s.label}</span>
                </span>
              </GlassSurface>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
