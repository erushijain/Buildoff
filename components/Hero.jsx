import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import heroVideo from '../assets/hero-video.mp4'
import '../styles/Hero.css'

const words = ['Negotiate.', 'Grow.', 'Earn.']

function Hero() {
  const wordRef = useRef(null)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (wordRef.current) {
        wordRef.current.style.opacity = '0'
        wordRef.current.style.transform = 'translateY(10px)'
        setTimeout(() => {
          i = (i + 1) % words.length
          if (wordRef.current) {
            wordRef.current.textContent = words[i]
            wordRef.current.style.opacity = '1'
            wordRef.current.style.transform = 'translateY(0)'
          }
        }, 400)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero">
      <video autoPlay muted loop playsInline className="hero-video">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero-overlay"/>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
      >
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          India's first negotiation-first freelance platform
        </motion.p>

        <h1>
          Find work. <br />
          <span ref={wordRef} className="rotating-word">Negotiate.</span>
        </h1>

        <p className="hero-sub">
          SkillBridge lets students and freshers get hired for real projects —
          and actually negotiate what they're paid. No fixed rates. No gatekeeping.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="hero-btn-primary">Start for free</a>
          <a href="#how" className="hero-btn-ghost">See how it works</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <strong>2,400+</strong>
            <span>Freshers joined</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>380+</strong>
            <span>Companies hiring</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>₹1.2Cr+</strong>
            <span>Paid out</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero