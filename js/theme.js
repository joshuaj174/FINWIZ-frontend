// Theme management
document.addEventListener("DOMContentLoaded", () => {
  // Apply dark theme by default
  document.documentElement.classList.add("dark")
  updateThemeToggleIcon(true)
  localStorage.setItem("theme", "dark")

  // Theme toggle button
  const themeToggle = document.getElementById("themeToggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark")
      localStorage.setItem("theme", isDark ? "dark" : "light")
      updateThemeToggleIcon(isDark)
    })
  }

  // Dark mode toggle in settings
  const darkModeToggle = document.getElementById("darkModeToggle")
  if (darkModeToggle) {
    // Set initial state
    darkModeToggle.checked = document.documentElement.classList.contains("dark")

    // Add event listener
    darkModeToggle.addEventListener("change", (e) => {
      const isDark = e.target.checked
      document.documentElement.classList.toggle("dark", isDark)
      localStorage.setItem("theme", isDark ? "dark" : "light")
      updateThemeToggleIcon(isDark)
    })
  }
})

// Update theme toggle icon
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

