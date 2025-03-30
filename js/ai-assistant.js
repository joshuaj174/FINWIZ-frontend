document.addEventListener("DOMContentLoaded", () => {
  // Configuration (replace with your actual API key)
  const API_KEY = "AIzaSyAI3s0--OjF6c0bmYNnuNlD-ZF4n5sStIs" // Replace with your actual API key
  const MODEL_NAME = "gemini-1.5-pro" // Using the latest model version
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

  // DOM elements
  const messageInput = document.getElementById("message-input")
  const sendButton = document.getElementById("send-button")
  const chatMessages = document.getElementById("chat-messages")
  const loadingIndicator = document.getElementById("loading")
  const chatForm = document.getElementById("chatForm")
  const clearChatButton = document.getElementById("clearChat")
  const questionChips = document.querySelectorAll(".question-chip")

  // Keep track of conversation history
  let messages = []
  const chatHistory = [] // Declare chatHistory

  // System prompt to provide context to the AI
  const systemPrompt = `You are FinWiz, an AI financial assistant. Your goal is to help users with their financial questions and provide accurate, helpful information about personal finance, investing, budgeting, and financial planning. Be conversational, clear, and concise. If you're unsure about something, acknowledge it rather than providing potentially incorrect information. Always prioritize the user's financial well-being in your advice.`

  // Initialize chat
  function initChat() {
    // Add initial message to chat history
    // chatHistory.push({
    //   role: "assistant",
    //   content:
    //     "Hello! I'm your AI Financial Assistant. I can help you with budgeting, investing, financial planning, and answering any money-related questions. How can I assist you today?",
    // })
    // Load chat history from localStorage if available
    // const savedChat = localStorage.getItem("finwizChatHistory")
    // if (savedChat) {
    //   try {
    //     const parsedChat = JSON.parse(savedChat)
    //     if (parsedChat.length > 1) {
    //       // If there's more than just the welcome message
    //       chatHistory = parsedChat
    //       renderChatHistory()
    //     }
    //   } catch (error) {
    //     console.error("Error loading chat history:", error)
    //   }
    // }
  }

  // Display message in chat
  function displayMessage(message, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.classList.add("chat-message", sender, "animate-slide-in-up")

    const avatarDiv = document.createElement("div")
    avatarDiv.classList.add("message-avatar")

    const iconElement = document.createElement("i")
    iconElement.classList.add("fa-solid", sender === "user" ? "fa-user" : "fa-brain")
    avatarDiv.appendChild(iconElement)

    const contentDiv = document.createElement("div")
    contentDiv.classList.add("message-content")

    // Process content for markdown-like formatting
    contentDiv.innerHTML = `<p>${message}</p>`

    const timeDiv = document.createElement("div")
    timeDiv.classList.add("message-time")
    const now = new Date()
    timeDiv.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`
    contentDiv.appendChild(timeDiv)

    messageDiv.appendChild(avatarDiv)
    messageDiv.appendChild(contentDiv)

    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  // Render chat history
  function renderChatHistory() {
    chatMessages.innerHTML = ""

    chatHistory.forEach((message, index) => {
      const messageElement = createMessageElement(message.role, message.content)
      chatMessages.appendChild(messageElement)
    })

    scrollToBottom()
  }

  // Create a message element
  function createMessageElement(role, content) {
    const messageDiv = document.createElement("div")
    messageDiv.classList.add("chat-message", role, "animate-slide-in-up")

    const avatarDiv = document.createElement("div")
    avatarDiv.classList.add("message-avatar")

    const iconElement = document.createElement("i")
    iconElement.classList.add("fa-solid", role === "user" ? "fa-user" : "fa-brain")
    avatarDiv.appendChild(iconElement)

    const contentDiv = document.createElement("div")
    contentDiv.classList.add("message-content")

    // Process content for markdown-like formatting
    const formattedContent = formatMessage(content)
    contentDiv.innerHTML = formattedContent

    const timeDiv = document.createElement("div")
    timeDiv.classList.add("message-time")
    const now = new Date()
    timeDiv.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`
    contentDiv.appendChild(timeDiv)

    messageDiv.appendChild(avatarDiv)
    messageDiv.appendChild(contentDiv)

    return messageDiv
  }

  // Format message with basic markdown-like syntax
  function formatMessage(content) {
    // Replace code blocks
    content = content.replace(/```([\s\S]*?)```/g, '<div class="code-block"><pre>$1</pre></div>')

    // Replace line breaks with <br>
    content = content.replace(/\n/g, "<br>")

    // Bold text
    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Italic text
    content = content.replace(/\*(.*?)\*/g, "<em>$1</em>")

    // Wrap paragraphs
    const paragraphs = content.split("<br><br>")
    return paragraphs.map((p) => `<p>${p}</p>`).join("")
  }

  // Add a user message to the chat
  function addUserMessage(message) {
    const messageObj = {
      role: "user",
      content: message,
    }

    chatHistory.push(messageObj)

    const messageElement = createMessageElement("user", message)
    chatMessages.appendChild(messageElement)

    scrollToBottom()
    saveChatHistory()
  }

  // Add an assistant message to the chat
  function addAssistantMessage(message) {
    const messageObj = {
      role: "assistant",
      content: message,
    }

    chatHistory.push(messageObj)

    const messageElement = createMessageElement("assistant", message)
    chatMessages.appendChild(messageElement)

    scrollToBottom()
    saveChatHistory()
  }

  // Add a loading indicator
  function addLoadingIndicator() {
    const loadingDiv = document.createElement("div")
    loadingDiv.classList.add("chat-message", "assistant", "animate-slide-in-up")
    loadingDiv.id = "loadingIndicator"

    const avatarDiv = document.createElement("div")
    avatarDiv.classList.add("message-avatar")

    const iconElement = document.createElement("i")
    iconElement.classList.add("fa-solid", "fa-brain")
    avatarDiv.appendChild(iconElement)

    const contentDiv = document.createElement("div")
    contentDiv.classList.add("message-content")

    const typingIndicator = document.createElement("div")
    typingIndicator.classList.add("typing-indicator")

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("div")
      dot.classList.add("typing-dot")
      typingIndicator.appendChild(dot)
    }

    contentDiv.appendChild(typingIndicator)

    loadingDiv.appendChild(avatarDiv)
    loadingDiv.appendChild(contentDiv)

    chatMessages.appendChild(loadingDiv)
    scrollToBottom()
  }

  // Remove loading indicator
  function removeLoadingIndicator() {
    const loadingIndicator = document.getElementById("loadingIndicator")
    if (loadingIndicator) {
      loadingIndicator.remove()
    }
  }

  // Scroll to the bottom of the chat
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  // Save chat history to localStorage
  function saveChatHistory() {
    localStorage.setItem("finwizChatHistory", JSON.stringify(chatHistory))
  }

  // Clear chat history
  function clearChat() {
    //chatMessages.innerHTML = '';
    messages = []
    // Add initial greeting
    displayMessage("Hello! I'm your AI Financial Assistant. How can I help you today?", "assistant")
    // Keep only the initial welcome message
    //chatHistory = [chatHistory[0]]
    //localStorage.setItem("finwizChatHistory", JSON.stringify(chatHistory))
    //renderChatHistory()
  }

  // Send message function
  async function sendMessage() {
    const userMessage = messageInput.value.trim()
    if (!userMessage) return

    // Display user message
    displayMessage(userMessage, "user")
    messageInput.value = ""

    // Show loading indicator
    loadingIndicator.style.display = "block"

    // Add to conversation history
    messages.push({
      role: "user",
      parts: [{ text: userMessage }],
    })

    try {
      // Prepare the request body
      const requestBody = {
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }

      // Make API request
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      // Hide loading indicator
      loadingIndicator.style.display = "none"

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API Error: ${errorData.error?.message || "Unknown error"}`)
      }

      const data = await response.json()

      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
        const aiMessage = data.candidates[0].content.parts[0].text
        displayMessage(aiMessage, "assistant")

        // Add AI response to conversation history
        messages.push({
          role: "model",
          parts: [{ text: aiMessage }],
        })
      } else {
        throw new Error("Invalid response format from API")
      }
    } catch (error) {
      console.error("Error:", error)
      loadingIndicator.style.display = "none"
      displayMessage(`I'm sorry, I encountered an error. Please try again later.`, "assistant")
    }
  }

  // Add error handling for API requests
  async function sendMessageToGemini(message) {
    try {
      // Prepare messages for the API
      const messages = chatHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }))

      // Add system prompt
      messages.unshift({
        role: "user",
        parts: [{ text: systemPrompt }],
      })

      // Add the latest user message
      messages.push({
        role: "user",
        parts: [{ text: message }],
      })

      // Make API request
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("API error:", errorData)
        throw new Error(errorData.error || "Failed to get response from AI")
      }

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error("Error sending message to Gemini:", error)
      return (
        "I'm sorry, I encountered an error while processing your request. Please try again later. Error details: " +
        error.message
      )
    }
  }

  // Event listeners
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault()
    sendMessage()
  })

  // Handle form submission
  // chatForm.addEventListener("submit", async (e) => {
  //   e.preventDefault()

  //   const message = userInput.value.trim()
  //   if (!message) return

  //   // Clear input
  //   userInput.value = ""

  //   // Add user message to chat
  //   addUserMessage(message)

  //   // Show loading indicator
  //   addLoadingIndicator()

  //   // Get response from Gemini
  //   const response = await sendMessageToGemini(message)

  //   // Remove loading indicator
  //   removeLoadingIndicator()

  //   // Add assistant message to chat
  //   addAssistantMessage(response)
  // })

  clearChatButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the chat history?")) {
      clearChat()
    }
  })

  // Handle suggested questions
  questionChips.forEach((chip) => {
    chip.addEventListener("click", function () {
      const question = this.getAttribute("data-question")
      messageInput.value = question
      messageInput.focus()
    })
  })

  // Handle suggested questions
  // questionChips.forEach((chip) => {
  //   chip.addEventListener("click", function () {
  //     const question = this.getAttribute("data-question")
  //     userInput.value = question
  //     userInput.focus()
  //   })
  // })

  // Handle clear chat button
  // clearChatButton.addEventListener("click", () => {
  //   if (confirm("Are you sure you want to clear the chat history?")) {
  //     clearChat()
  //   }
  // })

  // Initial greeting
  window.addEventListener("DOMContentLoaded", () => {
    displayMessage("Hello! I'm your AI Financial Assistant. How can I help you today?", "assistant")
  })

  // Initialize chat
  initChat()
})

