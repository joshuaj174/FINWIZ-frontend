// Simplified settings.js without Firebase integration
document.addEventListener("DOMContentLoaded", () => {
  // Initialize toggle states from localStorage
  function initializeToggles() {
    const toggles = document.querySelectorAll(".switch input")
    toggles.forEach((toggle) => {
      const toggleId = toggle.id
      const savedState = localStorage.getItem(toggleId)

      if (savedState !== null) {
        toggle.checked = savedState === "true"
      }

      // Update visual state
      toggle.addEventListener("change", (event) => {
        const isChecked = event.target.checked
        localStorage.setItem(toggleId, isChecked)
        console.log(`${toggleId} switched to: ${isChecked ? "ON" : "OFF"}`)

        // Special handling for dark mode toggle
        if (toggleId === "darkModeToggle") {
          document.documentElement.classList.toggle("dark", isChecked)
          updateThemeToggleIcon(isChecked)
        }
      })
    })
  }

  // Initialize language and time format preferences
  function initializeSelects() {
    const selects = {
      languageSelect: "language",
      timeFormatSelect: "timeFormat",
    }

    for (const [selectId, storageKey] of Object.entries(selects)) {
      const select = document.getElementById(selectId)
      if (select) {
        // Set initial value from localStorage
        const savedValue = localStorage.getItem(storageKey)
        if (savedValue) {
          select.value = savedValue
        }

        // Add change event listener
        select.addEventListener("change", (e) => {
          localStorage.setItem(storageKey, e.target.value)
        })
      }
    }
  }

  // Reset password button
  const resetPasswordBtn = document.getElementById("resetPasswordBtn")
  if (resetPasswordBtn) {
    resetPasswordBtn.addEventListener("click", () => {
      alert("Password reset functionality would be implemented here.")
    })
  }

  // Initialize settings
  initializeToggles()
  initializeSelects()
})

// Function to update theme toggle icon
function updateThemeToggleIcon(isDark) {
  const themeToggle = document.getElementById("themeToggle")
  if (themeToggle) {
    const icon = themeToggle.querySelector("i")
    if (icon) {
      if (isDark) {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
      } else {
        icon.classList.remove("fa-sun")
        icon.classList.add("fa-moon")
      }
    }
  }
}

