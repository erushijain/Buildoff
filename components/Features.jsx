import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import '../styles/Features.css'

const features = [
  {
    title: 'You set the price',
    desc: "Forget fixed budgets. Put in your number, back it up with your work, and negotiate until both sides are happy. This is how it should've always worked.",
    stat: '3.2x',
    statLabel: 'avg. earnings vs fixed-rate platforms',
    highlight: true,
  },
  {
    title: 'Freshers welcome — actually',
    desc: "We built the platform so companies can explicitly open projects to freshers. Your degree year doesn't disqualify you. Your skills do the talking.",
    stat: '68%',
    statLabel: 'of hired users had under 1yr experience',
  },
  {
    title: 'No ghosting. Real conversations.',
    desc: 'Direct messaging with companies from day one. No application black holes. If they viewed your profile, you know.',
    stat: '< 24hr',
    statLabel: 'average first response time',
  },
  {
    title: 'Verified skills, not just claims',
    desc: 'Short skill assessments you can take in 15 minutes. A badge on your profile that tells companies you know what you say you know.',
    stat: '2.8x',
    statLabel: 'more callbacks with a verified badge',
  },
  {
    title: 'Payments that actually protect you',
    desc: "Escrow holds the money before work starts. When you deliver, you get paid. Simple. We've handled the trust problem so you don't have to.",
    stat: '₹0',
    statLabel: 'payment disputes in last 6 months',
  },
  {
    title: 'Built for India, priced for India',
    desc: "No dollar conversions. No foreign bank accounts. Withdrawals to UPI, bank transfer — whatever works for you. Free for the first 6 months.",
    stat: '0%',
    statLabel: 'platform fee for first 6 months',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)

  return (
    <motion.div
      ref={ref}
      className={`feat-card ${feature.highlight ? 'feat-highlight' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div className="feat-stat">
        <strong>{feature.stat}</strong>
        <span>{feature.statLabel}</span>
      </div>
      <h3>{feature.title}</h3>
      <p>{feature.desc}</p>
      <motion.div
        className="feat-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 + (index % 3) * 0.1 }}
      />
    </motion.div>
  )
}

function Features() {
  return (
    <section className="features" id="features">
      <motion.div
        className="features-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-eyebrow">Why SkillBridge</p>
        <h2>We fixed what's broken<br />about freelancing.</h2>
        <p className="features-sub">Every feature exists because a real fresher told us something wasn't working.</p>
      </motion.div>

      <div className="features-grid">
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}

export default Features