import { Helmet } from 'react-helmet-async'

function About() {
  return (
    <div style={{ padding: 40, fontFamily: 'system-ui, sans-serif' }}>
      <Helmet>
        <title>About — Image Captioner</title>
        <meta name="description" content="About the person behind Image Captioner." />
      </Helmet>
      <h1>About</h1>
      <p>Bio coming soon.</p>
    </div>
  )
}

export default About