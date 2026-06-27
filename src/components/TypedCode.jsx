import { useEffect, useMemo, useRef, useState } from 'react'
import './TypedCode.css'

// ── Pre-defined segments (type, text) ───────────────────────────────────────
const S = (type, text) => ({ type, text })

const SEGMENTS = [
  S('gray',   'Windows PowerShell\n'),
  S('gray',   'Copyright (C) Microsoft Corporation. All rights reserved.\n\n'),

  // ── $profile definition ──────────────────────────────────────
  S('prompt', 'PS C:\\Portfolio\\André> '),
  S('var',    '$profile'),
  S('plain',  ' = '),
  S('bracket','['),
  S('kw',     'PSCustomObject'),
  S('bracket',']@{\n'),
  S('cont',   '>>   '), S('prop', 'Name       '), S('plain', '= '), S('str', '"André Melo"\n'),
  S('cont',   '>>   '), S('prop', 'Role       '), S('plain', '= '), S('str', '"Data Scientist"\n'),
  S('cont',   '>>   '), S('prop', 'Background '), S('plain', '= '), S('str', '"Process Engineering"\n'),
  S('cont',   '>> '), S('bracket', '}\n\n'),

  // ── $about here-string ───────────────────────────────────────
  S('prompt', 'PS C:\\Portfolio\\André> '),
  S('var',    '$about'),
  S('plain',  ' = '),
  S('str',    '@"\n'),

  S('cont',   '>> '), S('outval', 'With my Engineering background, I started in process\n'),
  S('cont',   '>> '), S('outval', 'optimization and adapted to the evolving needs of the\n'),
  S('cont',   '>> '), S('outval', 'industry. Today I work with inspection technologies\n'),
  S('cont',   '>> '), S('outval', 'and data analysis to improve manufacturing efficiency.\n'),
  S('cont',   '>> \n'),
  S('cont',   '>> '), S('outval', 'My competences involve finding smarter ways to enhance\n'),
  S('cont',   '>> '), S('outval', 'production, ensuring processes are well-structured,\n'),
  S('cont',   '>> '), S('outval', 'consistent, and continuously improving. By analyzing\n'),
  S('cont',   '>> '), S('outval', 'data, I help create solutions that make manufacturing\n'),
  S('cont',   '>> '), S('outval', 'processes more effective and data driven.\n'),
  S('cont',   '>> \n'),
  S('cont',   '>> '), S('outval', "I'm always looking for ways to improve how things are\n"),
  S('cont',   '>> '), S('outval', 'done, tackling challenges with a problem-solving mindset\n'),
  S('cont',   '>> '), S('outval', 'and a drive for progress.\n'),

  S('str',    '"@\n\n'),

  S('prompt', 'PS C:\\Portfolio\\André> '),
]

const TOTAL = SEGMENTS.reduce((acc, s) => acc + s.text.length, 0)

// ── Component ────────────────────────────────────────────────────────────────
export default function TypedCode({ charsPerTick = 5, tickMs = 16, startDelay = 300 }) {
  const [count, setCount]     = useState(0)
  const [started, setStarted] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { io.disconnect(); setTimeout(() => setStarted(true), startDelay) } },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [startDelay])

  useEffect(() => {
    if (!started || count >= TOTAL) return
    const id = setInterval(() => {
      setCount(c => {
        const next = Math.min(c + charsPerTick, TOTAL)
        if (next >= TOTAL) clearInterval(id)
        return next
      })
    }, tickMs)
    return () => clearInterval(id)
  }, [started, count, charsPerTick, tickMs])

  const rendered = useMemo(() => {
    const out = []
    let seen = 0
    for (let i = 0; i < SEGMENTS.length; i++) {
      if (seen >= count) break
      const { type, text } = SEGMENTS[i]
      const take = Math.min(text.length, count - seen)
      out.push(<span key={i} className={`tc__${type}`}>{text.slice(0, take)}</span>)
      seen += text.length
    }
    return out
  }, [count])

  return (
    <div className="tc" ref={wrapRef}>
      {/* Windows Terminal title bar */}
      <div className="tc__titlebar">
        <div className="tc__tabstrip">
          <div className="tc__tab">
            <span className="tc__tab-icon">PS</span>
            <span className="tc__tab-name">Windows PowerShell</span>
            <span className="tc__tab-x">&#x2715;</span>
          </div>
          <button className="tc__newtab" tabIndex={-1}>&#x2b;</button>
          <button className="tc__tabdrop" tabIndex={-1}>&#x2304;</button>
        </div>
        <div className="tc__winctrl">
          <span className="tc__wbtn">&#x2500;</span>
          <span className="tc__wbtn">&#x25A1;</span>
          <span className="tc__wbtn tc__wbtn--close">&#x2715;</span>
        </div>
      </div>

      {/* Terminal body */}
      <pre className="tc__body"><code>{rendered}{count < TOTAL && <span className="tc__cursor">&#x2588;</span>}</code></pre>
    </div>
  )
}
