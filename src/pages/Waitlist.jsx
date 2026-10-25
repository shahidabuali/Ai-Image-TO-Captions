import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../supabaseClient'

function Waitlist() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.from('waitlist').insert({ email })

    if (error) {
      setError('Something went wrong. Try again.')
      setLoading(false)
      return
    }

    navigate('/thank-you')
  }

  return (
    <div style={{ padding: 40, fontFamily: 'system-ui, sans-serif', maxWidth: 400 }}>
      <Helmet>
        <title>Join the Waitlist — Image Captioner</title>
        <meta name="description" content="Sign up to hear about updates to Image Captioner." />
      </Helmet>
      <h1>Join the waitlist</h1>
      <p>Get notified about updates to the tool.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={{ width: '100%', padding: 10, fontSize: 14, boxSizing: 'border-box' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 12, padding: '10px 16px', cursor: 'pointer' }}
        >
          {loading ? 'Joining…' : 'Join waitlist'}
        </button>
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
      </form>
    </div>
  )
}

export default Waitlist