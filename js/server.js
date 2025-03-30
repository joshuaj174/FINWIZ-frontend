// This is a simple Express server to handle the API requests
// You would deploy this separately or use a serverless function

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const handleChatRequest = require("./api/chat")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, ".")))

// API endpoint for chat
app.post("/api/chat", handleChatRequest)

// Serve HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/:page.html", (req, res) => {
  const page = req.params.page
  res.sendFile(path.join(__dirname, `${page}.html`))
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

