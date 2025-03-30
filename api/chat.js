// This file would be placed on a server or serverless function
// For demonstration purposes, we're including it in the project

async function handleChatRequest(req, res) {
  try {
    const { messages } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request format" })
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY environment variable is not set")
      return res.status(500).json({ error: "API key not configured" })
    }

    // Format messages for Gemini API
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      parts: msg.parts,
    }))

    // Make request to Gemini API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Gemini API error:", errorData)
      return res.status(response.status).json({ error: "Error from Gemini API" })
    }

    const data = await response.json()

    // Extract the response text
    const responseText = data.candidates[0].content.parts[0].text

    return res.status(200).json({ response: responseText })
  } catch (error) {
    console.error("Error in chat API:", error)
    return res.status(500).json({ error: "Internal server error: " + error.message })
  }
}

// Export for serverless function
module.exports = handleChatRequest

