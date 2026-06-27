import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CircularGallery from '../components/CircularGallery'
import './Thoughts.css'

const thoughts = [
  { image: '/blog-ai.jpg', text: 'Data Science & AI' },
  { image: '/blog-drawing.jpg', text: 'Drawing & the Brain' },
  { image: 'https://picsum.photos/seed/42/800/600?grayscale', text: 'Process Thinking' },
  { image: 'https://picsum.photos/seed/55/800/600?grayscale', text: 'Engineering Mindset' },
  { image: 'https://picsum.photos/seed/71/800/600?grayscale', text: 'The Power of Notes' },
  { image: 'https://picsum.photos/seed/88/800/600?grayscale', text: 'Systems vs Goals' },
  { image: 'https://picsum.photos/seed/33/800/600?grayscale', text: 'Travel as Learning' },
]

export default function Thoughts() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.thoughts__gallery', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="thoughts" id="thoughts" ref={sectionRef}>
      <h2 className="thoughts__heading section-heading">Thoughts</h2>
      <div className="thoughts__gallery">
        <CircularGallery
          items={thoughts}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.04}
          scrollSpeed={5}
          font="bold 18px Inter"
        />
      </div>
    </section>
  )
}
