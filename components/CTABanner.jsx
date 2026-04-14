import { motion } from 'framer-motion'
import '../styles/CTABanner.css'

function CTABanner() {
  return (
    <section className="cta" id="contact">
      <div className="cta-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Early access</p>
          <h2>Be first in line.</h2>
          <p className="cta-sub">We're launching in Delhi NCR first. Drop your email and we'll reach out before the public launch — with zero platform fees for 6 months.</p>
          <div className="cta-form">
            <input type="email" placeholder="your@email.com" />
            <button>Get early access</button>
          </div>
          <p className="cta-note">No spam. No pitch decks. Just a heads-up when we go live.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default CTABanner