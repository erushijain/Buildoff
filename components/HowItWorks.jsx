import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import howVideo from '../assets/how-video.mp4'
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

const TOP_GAP =0

export default function HowItWorks() {
  const wrapperRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const springConfig = { stiffness: 120, damping: 20, mass: 0.75 }

  const rawVideoWidth = useTransform(scrollYProgress, [0.0, 0.22], [100, 48])
  const rawVideoTop   = useTransform(scrollYProgress, [0.0, 0.22], [0, TOP_GAP])
  const rawRadius     = useTransform(scrollYProgress, [0.0, 0.22], [0, 20])
  const rawTextX      = useTransform(scrollYProgress, [0.04, 0.22], [60, 0])
  const rawTextOp     = useTransform(scrollYProgress, [0.04, 0.20], [0, 1])
  const rawOverlay    = useTransform(scrollYProgress, [0, 0.18], [0, 0.06])
  const rawLabelOp    = useTransform(scrollYProgress, [0, 0.05, 0.16], [1, 1, 0])
  const rawLabelY     = useTransform(scrollYProgress, [0, 0.16], [0, -20])
  const rawBadgeOp    = useTransform(scrollYProgress, [0, 0.10], [1, 0])

  const videoWidth = useSpring(rawVideoWidth, springConfig)
  const videoTop   = useSpring(rawVideoTop,   springConfig)
  const radius     = useSpring(rawRadius,     springConfig)
  const textX      = useSpring(rawTextX,      springConfig)
  const textOp     = useSpring(rawTextOp,     springConfig)
  const overlayOp  = useSpring(rawOverlay,    springConfig)
  const labelOp    = useSpring(rawLabelOp,    springConfig)
  const labelY     = useSpring(rawLabelY,     springConfig)

  const videoWidthCss  = useTransform(videoWidth, v => `${v}vw`)
  const videoHeightCss = useTransform(videoTop,   t => `calc(100vh - ${t * 2}px)`)
  const radiusCss      = useTransform(radius,     v => `${v}px`)
  const videoTopCss    = useTransform(videoTop,   v => `${v}px`)

  return (
    <div ref={wrapperRef} className="how-scroll-wrapper" id="how-it-works">
      <div className="how-sticky">

        {/* ── Video ── */}
        <motion.div
          className="how-video-wrap"
          style={{
            width: videoWidthCss,
            height: videoHeightCss,
            borderRadius: radiusCss,
            top: videoTopCss,
          }}
        >
          <video autoPlay muted loop playsInline className="how-video">
            <source src={howVideo} type="video/mp4" />
          </video>

          <motion.div className="how-video-overlay" style={{ opacity: overlayOp }} />

          <motion.div
            className="how-video-label"
            style={{ opacity: labelOp, y: labelY }}
          >
            <span className="how-video-label-tag">The Process</span>
            <h2>How it actually works.</h2>
            <p>No fluff. Four steps from zero to your first paid project.</p>
          </motion.div>

          <motion.div className="how-video-badge" style={{ opacity: rawBadgeOp }}>
            The Process
          </motion.div>
        </motion.div>

        {/* ── Text panel ── */}
        <motion.div
          className="how-text-panel"
          style={{ opacity: textOp, x: textX }}
        >
          <div className="how-text-inner">
            <span className="how-label-tag">The Process</span>
            <h2 className="how-text-heading">How it <em>actually</em> works.</h2>
            <p className="how-text-sub">
              No fluff. Four steps from zero to your first paid freelance project.
            </p>

            <div className="how-steps">
              {steps.map((step, i) => (
                <motion.div
                  className="how-step"
                  key={i}
                  initial={{ opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
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
          </div>
        </motion.div>

      </div>
    </div>
  )
}
