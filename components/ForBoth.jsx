import { motion } from 'framer-motion'
import '../styles/ForBoth.css'

function ForBoth() {
  return (
    <section className="forboth" id="forboth">
      <motion.div
        className="forboth-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-eyebrow">For freelancers</p>
        <h2>Stop underselling yourself.</h2>
        <p className="forboth-desc">Most platforms tell you to compete on price. We tell you to compete on value — then negotiate for what you deserve.</p>
        <ul>
          <li><span>→</span> Apply even with zero prior clients</li>
          <li><span>→</span> Counter any offer directly</li>
          <li><span>→</span> Keep 92% of what you earn</li>
          <li><span>→</span> Get a verified skill badge in 15 mins</li>
          <li><span>→</span> Build a portfolio companies actually see</li>
        </ul>
        <a href="#contact" className="forboth-btn">Create free profile</a>
      </motion.div>

      <motion.div
        className="forboth-card forboth-dark"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <p className="section-eyebrow">For companies</p>
        <h2>Fresh talent.<br />Real work. Fair deals.</h2>
        <p className="forboth-desc">Post a project in 3 minutes. Get bids from verified, motivated freshers who want to prove themselves — not just collect a paycheck.</p>
        <ul>
          <li><span>→</span> Post for free, pay only on hire</li>
          <li><span>→</span> Set your budget range, not a fixed price</li>
          <li><span>→</span> Chat before you commit</li>
          <li><span>→</span> Escrow protects both sides</li>
          <li><span>→</span> Scale up or down anytime</li>
        </ul>
        <a href="#contact" className="forboth-btn forboth-btn-gold">Post a project</a>
      </motion.div>
    </section>
  )
}

export default ForBoth