import { Helmet } from 'react-helmet-async'

function ThankYou() {
  return (
    <div style={{ padding: 40, fontFamily: 'system-ui, sans-serif' }}>
      <Helmet>
        <title>Thank You — Image Captioner</title>
        <meta name="description" content="You're on the Image Captioner waitlist." />
      </Helmet>
      <h1>Thank you!</h1>
      <p>You're on the list.</p>
    </div>
  )
}

export default ThankYou