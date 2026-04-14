import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import '../styles/Navbar.css'

const navItems = [
  {
    label: 'Hire Talent',
    dropdown: [
      { title: 'Post a Project', desc: 'Get bids from verified freelancers' },
      { title: 'Browse Profiles', desc: 'Search by skill, rating, budget' },
      { title: 'For Startups', desc: 'Flexible hiring for growing teams' },
      { title: 'For Enterprise', desc: 'Managed talent solutions at scale' },
    ]
  },
  {
    label: 'Find Work',
    dropdown: [
      { title: 'Browse Projects', desc: 'Find work that matches your skills' },
      { title: 'Negotiate Rates', desc: 'Set your own price, no fixed budgets' },
      { title: 'For Freshers', desc: 'Start with zero experience' },
      { title: 'Skill Verification', desc: 'Get certified in 15 minutes' },
    ]
  },
  {
    label: 'Why DropTask',
    dropdown: [
      { title: 'How It Works', desc: 'Four steps to your first project' },
      { title: 'Vs Upwork / Fiverr', desc: 'See why negotiation changes everything' },
      { title: 'Success Stories', desc: 'Real people, real earnings' },
      { title: 'Trust & Safety', desc: 'Escrow, reviews, dispute resolution' },
    ]
  },
  {
    label: "What's New",
    dropdown: [
      { title: 'Product Updates', desc: 'Latest features and improvements' },
      { title: 'Blog', desc: 'Freelancing tips and industry news' },
      { title: 'Events', desc: 'Webinars, meetups, and workshops' },
    ]
  },
]

function Dropdown({ items }) {
  return (
    <motion.div
      className="nav-dropdown"
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {items.map((item, i) => (
        <a href="#" className="nav-dropdown-item" key={i}>
          <strong>{item.title}</strong>
          <span>{item.desc}</span>
        </a>
      ))}
    </motion.div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (label) => {
    clearTimeout(timeoutRef.current)
    setActiveMenu(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150)
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="navbar-logo">Drop<span>Task</span></div>

      <ul className="navbar-links">
        {navItems.map((item) => (
          <li
            key={item.label}
            className="nav-item-wrap"
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <a href="#" className="nav-link-btn">
              {item.label}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <AnimatePresence>
              {activeMenu === item.label && (
                <Dropdown items={item.dropdown} />
              )}
            </AnimatePresence>
          </li>
        ))}
        <li><a href="#contact" className="nav-plain">Pricing</a></li>
        <li><a href="#contact" className="nav-plain">For Enterprise</a></li>
      </ul>

      <div className="navbar-actions">
        <a href="#" className="nav-login">Log in</a>
        <a href="#contact" className="nav-signup">Sign up</a>
      </div>
    </motion.nav>
  )
}

export default Navbar