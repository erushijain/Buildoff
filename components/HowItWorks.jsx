import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import heroVideo from '../assets/hero-video.mp4'
import '../styles/HowItWorks.css'

const steps = [
  {
    num: '01',
    tag: 'Getting Started',
    title: 'Build your profile',
    body: 'Show your skills, not just your degree. Add what you can do, link your work, and let companies find you.',
  },
  {
    num: '02',
    tag: 'Find Your Work',
    title: 'Browse & apply',
    body: 'Real projects, real companies. Apply with a pitch that sounds like you — not a copy-paste template.',
  },
  {
    num: '03',
    tag: 'Own The Deal',
    title: 'Negotiate your rate',
    body: 'Counter. Push back. Agree on your terms. We built the tools so you never have to accept the first offer.',
  },
  {
    num: '04',
    tag: 'Get Paid Fairly',
    title: 'Deliver & get paid',
    body: 'Money sits in escrow before you start. Deliver the work. Get paid. Build your reputation.',
  },
]

export default function HowItWorks() {
  // stickyRef wraps the tall scroll-distance div
  const stickyRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start start', 'end end'],
  })

  // Phase 0→0.35  : video fills screen (fullscreen intro)
  // Phase 0.35→0.7: video shrinks + slides left, text slides in from right
  // Phase 0.7→1   : layout fully settled, steps visible

  // Video width: 100vw → 50vw
  const videoWidth = useTransform(scrollYProgress, [0.3, 0.65], ['100vw', '50vw'])
  // Video height: 100vh → 75vh
  const videoHeight = useTransform(scrollYProgress, [0.3, 0.65], ['100vh', '75vh'])
  // Video border radius: 0 → 20px
  const videoRadius = useTransform(scrollYProgress, [0.3, 0.65], ['0px', '20px'])
  // Video x: centre → left edge
  const videoX = useTransform(scrollYProgress, [0.3, 0.65], ['0%', '0%'])

  // Text panel: slides in from right
  const textX = useTransform(scrollYProgress, [0.35, 0.7], ['60px', '0px'])
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1])

  // Dark overlay on video fades out as it shrinks
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.65], [0.6, 0.6, 0.15])

  // Fullscreen label fades out early
  const labelOpacity = useTransform(scrollYProgress, [0, 0.2, 0.32], [1, 1, 0])
  const labelY = useTransform(scrollYProgress, [0, 0.32], ['0px', '-30px'])

  return (
    // Tall wrapper = scroll distance. 400vh gives a smooth slow scroll effect.
    <div ref={stickyRef} className="how-scroll-wrapper">

      {/* Sticky container that stays in view during scroll */}
      <div className="how-sticky">

        {/* ── Video block ── */}
        <motion.div
          className="how-video-wrap"
          style={{
            width: videoWidth,
            height: videoHeight,
            borderRadius: videoRadius,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="how-video"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <motion.div
            className="how-video-overlay"
            style={{ opacity: overlayOpacity }}
          />

          {/* Centred label shown while video is fullscreen */}
          <motion.div
            className="how-video-label"
            style={{ opacity: labelOpacity, y: labelY }}
          >
            <span className="how-video-label-tag">The Process</span>
            <h2>How it actually works.</h2>
            <p>No fluff. Four steps from zero to your first paid project.</p>
          </motion.div>
        </motion.div>

        {/* ── Text panel (right side) ── */}
        <motion.div
          className="how-text-panel"
          style={{ opacity: textOpacity, x: textX }}
        >
          <span className="how-label-tag">The Process</span>
          <h2 className="how-text-heading">How it actually works.</h2>
          <p className="how-text-sub">No fluff. Four steps from zero to your first paid freelance project.</p>

          <div className="how-steps">
            {steps.map((step, i) => (
              <motion.div
                className="how-step"
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
              >
                <div className="how-step-left">
                  <div className="how-step-num">{step.num}</div>
                  {i < steps.length - 1 && <div className="how-step-connector" />}
                </div>
                <div className="how-step-body">
                  <span className="how-step-tag">{step.tag}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
