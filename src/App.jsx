import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Breadcrumbs from './components/Breadcrumbs'
import CookieConsent from './components/CookieConsent'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Waitlist from './pages/Waitlist'
import ThankYou from './pages/ThankYou'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsent />
    </div>
  )
}
export default App