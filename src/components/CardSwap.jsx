import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import gsap from 'gsap'
import './CardSwap.css'

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
))
Card.displayName = 'Card'

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
})

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    opacity: 1,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  })

const CardSwap = forwardRef(({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  autoPlay = true,
  pauseOnHover = false,
  onCardClick,
  onFrontChange,
  skewAmount = 6,
  children,
}, ref) => {
  const childArr = useMemo(() => Children.toArray(children), [children])
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length])
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i))
  const tlRef = useRef(null)
  const intervalRef = useRef(null)
  const container = useRef(null)
  const swapFnRef = useRef(null)
  const onFrontChangeRef = useRef(onFrontChange)
  const autoPlayRef = useRef(autoPlay)
  const delayRef = useRef(delay)

  useEffect(() => { onFrontChangeRef.current = onFrontChange }, [onFrontChange])
  useEffect(() => { autoPlayRef.current = autoPlay }, [autoPlay])
  useEffect(() => { delayRef.current = delay }, [delay])

  useImperativeHandle(ref, () => ({
    next: () => {
      // Kill any running animation before starting next
      tlRef.current?.kill()
      swapFnRef.current?.()
    },
  }))

  useEffect(() => {
    const total = refs.length
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount))

    const swap = () => {
      if (order.current.length < 2) return
      // Don't stack animations
      if (tlRef.current?.isActive?.()) return

      const [front, ...rest] = order.current
      const elFront = refs[front].current
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length)

      const tl = gsap.timeline()
      tlRef.current = tl

      // Front card exits LEFT fast, fades out
      tl.to(elFront, {
        x: '-=520',
        opacity: 0,
        duration: 0.28,
        ease: 'power3.in',
      }, 0)

      // Simultaneously advance all back cards to their new slots
      rest.forEach((idx, i) => {
        const el = refs[idx].current
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length)
        tl.set(el, { zIndex: slot.zIndex }, 0)
        tl.to(el, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: 0.35,
          ease: 'power2.out',
        }, 0)
      })

      // After exit: snap old front card to back of stack instantly
      tl.call(() => {
        gsap.set(elFront, {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          opacity: 1,
          zIndex: backSlot.zIndex,
        })
        order.current = [...rest, front]
        onFrontChangeRef.current?.(order.current[0])
      })
    }

    swapFnRef.current = swap

    // Notify parent of initial front card
    onFrontChangeRef.current?.(order.current[0])

    if (autoPlay) {
      swap()
      intervalRef.current = window.setInterval(swap, delay)
    }

    if (pauseOnHover && autoPlay) {
      const node = container.current
      const pause = () => {
        tlRef.current?.pause()
        clearInterval(intervalRef.current)
      }
      const resume = () => {
        tlRef.current?.play()
        intervalRef.current = window.setInterval(swap, delay)
      }
      node.addEventListener('mouseenter', pause)
      node.addEventListener('mouseleave', resume)
      return () => {
        node.removeEventListener('mouseenter', pause)
        node.removeEventListener('mouseleave', resume)
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      clearInterval(intervalRef.current)
      tlRef.current?.kill()
    }
  }, [cardDistance, verticalDistance, delay, autoPlay, pauseOnHover, skewAmount])

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => { child.props.onClick?.(e); onCardClick?.(i) },
        })
      : child
  )

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  )
})

CardSwap.displayName = 'CardSwap'
export default CardSwap
