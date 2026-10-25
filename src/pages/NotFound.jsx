import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function NotFound() {
  return (
    <div style={{ padding: 40, fontFamily: 'system-ui, sans-serif' }}>
      <Helmet>
        <title>Page Not Found — Image Captioner</title>
        <meta name="description" content="This page doesn't exist." />
      </Helmet>
      <h1>404 — Page not found</h1>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  )
}

export default NotFound