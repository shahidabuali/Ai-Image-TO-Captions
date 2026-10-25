export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { image, mimeType, prompt } = req.body
 const apiKey =  process.env.GEMINI_API_KEY

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inline_data: { mime_type: mimeType, data: image } },
              ],
            },
          ],
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'Request failed' })
    }

    return res.status(200).json({ caption: data.candidates[0].content.parts[0].text })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}