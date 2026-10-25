import { Link } from 'react-router-dom'

function Nav({ theme, toggleTheme }) {
  return (
    <div className="navbar">
      <div className="logo-badge">Image Captioner</div>
      <div className="pill-nav">
        <Link className="pill-link" to="/">Home</Link>
        <Link className="pill-link" to="/about">About</Link>
        <Link className="pill-link" to="/contact">Contact</Link>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? '☾' : '☀'}
        </button>
        <Link className="btn-filled" to="/waitlist">Join waitlist</Link>
      </div>
    </div>
  )
}

export default Nav