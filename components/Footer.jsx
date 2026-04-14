import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">Skill<span>Bridge</span></div>
          <p>Freelancing that actually works — for the people doing the work.</p>
        </div>
        <div className="footer-links-group">
          <div>
            <h4>Platform</h4>
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#forboth">For freelancers</a>
            <a href="#forboth">For companies</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 SkillBridge Technologies Pvt. Ltd. · Made in India 🇮🇳</p>
        <div className="footer-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer