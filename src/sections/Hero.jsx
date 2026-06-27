import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import TextPressure from '../components/TextPressure'
import TiltedCard from '../components/TiltedCard'
import Aurora from '../components/Aurora'
import './Hero.css'

export default function Hero() {
  const portfolioRef = useRef(null)
  const photoAreaRef = useRef(null)
  const subtitleRef = useRef(null)
  const sparkleLeftRef = useRef(null)
  const sparkleRightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(portfolioRef.current, { y: 40, opacity: 0, duration: 1.1 })
        .from(
          [sparkleLeftRef.current, sparkleRightRef.current],
          { scale: 0, opacity: 0, rotation: -60, duration: 0.6, stagger: 0.1 },
          '-=0.5'
        )
        .from(photoAreaRef.current, { y: 20, opacity: 0, filter: 'blur(22px)', duration: 0.55, ease: 'power2.out' }, '-=0.7')
        .from(subtitleRef.current, { y: 14, opacity: 0, duration: 0.6 }, '-=0.35')
    })
    return () => ctx.revert()
  }, [])

  const photoSize = 'clamp(160px, 20vw, 230px)'

  return (
    <section className="hero">
      <div className="hero__rays" aria-hidden="true">
        <Aurora
          colorStops={['#7cff67', '#B497CF', '#5227FF']}
          amplitude={1.1}
          blend={0.6}
          speed={0.5}
        />
      </div>
      <div className="hero__inner">
        <span ref={sparkleLeftRef} className="hero__sparkle hero__sparkle--left" aria-hidden="true">
          <SparkleLeft />
        </span>
        <span ref={sparkleRightRef} className="hero__sparkle hero__sparkle--right" aria-hidden="true">
          <SparkleRight />
        </span>

        <div ref={portfolioRef} className="hero__portfolio-wrap">
          <TextPressure
            text="PORTEFOLIO"
            textColor="#ffffff"
            flex={true}
            width={true}
            weight={true}
            italic={true}
            alpha={false}
            stroke={false}
            minFontSize={32}
            minWeight={350}
            maxWeight={900}
          />
        </div>

        <div ref={photoAreaRef} className="hero__photo-area">
          <div className="hero__tilt-wrap">
            <TiltedCard
              imageSrc="/photo.jpg"
              altText="André Melo"
              captionText=""
              containerHeight="clamp(230px, 29vw, 340px)"
              containerWidth="clamp(185px, 23vw, 275px)"
              imageHeight="clamp(230px, 29vw, 340px)"
              imageWidth="clamp(185px, 23vw, 275px)"
              rotateAmplitude={10}
              scaleOnHover={1.04}
              showMobileWarning={false}
              showTooltip={false}
            />
          </div>
        </div>

        <p ref={subtitleRef} className="hero__subtitle">/Engineering & Data Science</p>
      </div>
    </section>
  )
}

function SparkleLeft() {
  return (
    <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
      <path
        d="M22 2L24.5 19.5L42 22L24.5 24.5L22 42L19.5 24.5L2 22L19.5 19.5L22 2Z"
        fill="#ffffff"
        fillOpacity="0.6"
      />
    </svg>
  )
}

function SparkleRight() {
  return (
    <svg width="30" height="46" viewBox="0 0 34 52" fill="none">
      <path
        d="M20 0L10 24H18L9 52L34 26H23L20 0Z"
        fill="#ffffff"
        fillOpacity="0.6"
      />
    </svg>
  )
}
