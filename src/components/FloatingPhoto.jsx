import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PADDING_SIDE = 10
const PADDING_TOP = 10
const PADDING_BOTTOM = 40

export default function FloatingPhoto() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let ctx

    const init = () => {
      const heroWrap = document.querySelector('.hero__tilt-wrap')
      const slotEl   = document.querySelector('.about__photo-slot')
      const aboutEl  = document.querySelector('.about')

      if (!heroWrap || !slotEl || !aboutEl || !el) return

      const vh = window.innerHeight

      const heroRect  = heroWrap.getBoundingClientRect()
      const slotRect  = slotEl.getBoundingClientRect()
      const aboutRect = aboutEl.getBoundingClientRect()

      // At animation end: about.top = 10% of viewport
      // slot's viewport position at that scroll offset:
      const scrollAtEnd    = aboutRect.top - 0.1 * vh
      const slotY_atEnd    = slotRect.top  - scrollAtEnd

      gsap.set(el, {
        x: heroRect.left,
        y: heroRect.top,
        width:    heroRect.width,
        height:   heroRect.height,
        rotation: -1.5,
        opacity:  0,
      })

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:  aboutEl,
            start:    'top 90%',
            end:      'top 10%',
            scrub:    1.2,
          },
        })

        // Hero TiltedCard fades out
        tl.to(heroWrap, { opacity: 0, ease: 'none' }, 0)

        // Floating photo animates into About slot
        tl.fromTo(
          el,
          {
            x:        heroRect.left,
            y:        heroRect.top,
            width:    heroRect.width,
            height:   heroRect.height,
            rotation: -1.5,
            opacity:  0,
          },
          {
            x:        slotRect.left,
            y:        slotY_atEnd,
            width:    slotRect.width,
            height:   slotRect.height,
            rotation: 3,
            opacity:  1,
            ease:     'none',
          },
          0
        )
      })
    }

    // Wait one frame for layout to settle
    const rafId = requestAnimationFrame(init)

    return () => {
      cancelAnimationFrame(rafId)
      ctx?.revert()
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position:       'fixed',
        left:           0,
        top:            0,
        pointerEvents:  'none',
        zIndex:         50,
        background:     '#f5f2ed',
        borderRadius:   3,
        boxSizing:      'border-box',
        padding:        `${PADDING_TOP}px ${PADDING_SIDE}px ${PADDING_BOTTOM}px`,
        boxShadow:      '0 20px 60px rgba(0,0,0,0.5), 0 6px 18px rgba(0,0,0,0.3)',
        inset:          undefined,
        willChange:     'transform, opacity',
      }}
    >
      <img
        src="/photo.jpg"
        alt="André Melo"
        style={{
          position:        'absolute',
          top:             PADDING_TOP,
          left:            PADDING_SIDE,
          right:           PADDING_SIDE,
          bottom:          PADDING_BOTTOM,
          width:           `calc(100% - ${PADDING_SIDE * 2}px)`,
          height:          `calc(100% - ${PADDING_TOP + PADDING_BOTTOM}px)`,
          objectFit:       'cover',
          objectPosition:  'center top',
          display:         'block',
          borderRadius:    1,
        }}
      />
      <div
        style={{
          position:    'absolute',
          left:        0,
          right:       0,
          bottom:      0,
          height:      PADDING_BOTTOM,
          lineHeight:  `${PADDING_BOTTOM}px`,
          textAlign:   'center',
          fontFamily:  "'Permanent Marker', cursive",
          fontSize:    15,
          color:       '#1a1a1a',
          letterSpacing: '0.01em',
        }}
      >
        André Melo
      </div>
    </div>
  )
}
