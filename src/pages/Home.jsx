import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import '../App.css'

const ASPECTS = ['plain', 'alt', 'caption']

const PROMPTS = {
  plain: 'Write one plain, accurate sentence describing this image. No preamble, no quotation marks.',
  alt: 'Write concise alt text for this image, under 20 words. No preamble, no quotation marks.',
  caption: 'Write a short, casual social media caption for this image, one or two sentences. No hashtags, no preamble.',
}

const FAQS = [
  { question: 'Is this free to use?', answer: 'Yes. It runs on Google Gemini\'s free API tier, so there\'s no cost and no login required.' },
  { question: 'Do you store my images?', answer: 'No. Your image is sent to generate a caption and is never saved or stored by this app.' },
  { question: 'What image types are supported?', answer: 'JPG, PNG, and WEBP all work.' },
  { question: 'Why did it fail, or say something went wrong?', answer: 'This tool runs on a free daily quota. If it\'s been hit hard that day, generation can temporarily fail — try again in a few minutes.' },
  { question: 'What\'s the difference between the three caption styles?', answer: '"Plain" is one factual sentence. "Alt text" is written for screen readers, under 20 words. "Caption" is casual, social-media style.' },
]

function Home() {
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [aspect, setAspect] = useState('plain')
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setCaption('')
    }
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function handleGenerate() {
    if (!image) return
    setLoading(true)
    setCaption('')

    try {
      const base64Data = await fileToBase64(image)

      const response = await fetch('/api/caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Data,
          mimeType: image.type,
          prompt: PROMPTS[aspect],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Request failed')
      }

      setCaption(data.caption)
    } catch (error) {
      setCaption('Something went wrong: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Image Captioner — Free AI Caption Generator</title>
        <meta name="description" content="Upload a photo and get an instant AI-written caption, alt text, or social caption. Free, no login required." />
      </Helmet>

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="eyebrow-label">The Image Captioner Tool</div>
            <h1 className="display-headline">Caption your work, instantly.</h1>
            <p className="subheadline">Upload a photo, get a written caption back — free, no login, no waiting.</p>
            <div className="cta-row">
              <a className="btn-filled" href="#tool">Try it now</a>
              <Link className="btn-ghost" to="/waitlist">Join waitlist</Link>
            </div>
          </div>

          <div className="hero-right" id="tool">
            <div className="mockup-card">
              <input type="file" accept="image/*" onChange={handleFileChange} />

              {previewUrl && (
                <div className="photo-card">
                  <img src={previewUrl} alt="Preview of the image you selected" />
                </div>
              )}

              <div className="tabs-row">
                {ASPECTS.map((option) => (
                  <button
                    key={option}
                    className={`tab-pill ${aspect === option ? 'active' : ''}`}
                    onClick={() => setAspect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button className="generate-btn" onClick={handleGenerate} disabled={!image || loading}>
                {loading ? 'Generating…' : 'Generate caption'}
              </button>

              {caption && (
                <div className="result-card">
                  <p>{caption}</p>
                </div>
              )}

              <div className="promo-card">
                <span>Get notified of updates</span>
                <Link className="btn-ghost" to="/waitlist">Join</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-band">
        <div className="faq-wrap">
          <div className="eyebrow-label">Questions</div>
          <h2 className="faq-title">FAQs</h2>
          {FAQS.map((faq) => (
            <details key={faq.question} className="faq-card">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home