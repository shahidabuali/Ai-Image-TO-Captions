import { Helmet } from 'react-helmet-async'

function Contact() {
  return (
    <div style={{ padding: 40, fontFamily: 'system-ui, sans-serif' }}>
      <Helmet>
        <title>Contact — Image Captioner</title>
        <meta name="description" content="Get in touch about Image Captioner." />
      </Helmet>
      <h1>Contact</h1>
      <p>Contact details coming soon.</p>
    </div>
  )
}

export default Contact