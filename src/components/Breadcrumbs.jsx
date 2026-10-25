import { Link, useLocation } from 'react-router-dom'

function Breadcrumbs() {
  const location = useLocation()

  if (location.pathname === '/') {
    return null
  }

  const segments = location.pathname.split('/').filter(Boolean)

  return (
    <div
      style={{
        padding: '12px 24px',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14,
        color: '#B8B0A3',
        background: '#181B1F',
      }}
    >
      <Link to="/" style={{ color: '#B8B0A3' }}>
        Home
      </Link>
      {segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/')
        const label = segment.charAt(0).toUpperCase() + segment.slice(1)
        return (
          <span key={path}>
            {' / '}
            <Link to={path} style={{ color: '#B8B0A3' }}>
              {label}
            </Link>
          </span>
        )
      })}
    </div>
  )
}

export default Breadcrumbs