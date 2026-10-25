import { useState } from 'react'

function CookieConsent() {
  const [visible, setVisible] = useState(() => !localStorage.getItem('cookie-consent'))

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
    window.location.reload()
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#21231B',
        color: '#EBE5D8',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14,
        zIndex: 1000,
      }}
    >
      <span>This site uses cookies for basic analytics.</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={decline} style={{ padding: '8px 14px', cursor: 'pointer' }}>
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            padding: '8px 14px',
            background: '#C97053',
            color: '#F6F0E5',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}

export default CookieConsent