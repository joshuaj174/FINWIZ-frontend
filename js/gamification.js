document.addEventListener("DOMContentLoaded", () => {
  // Tab Switching for Challenges
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked button and corresponding pane
      this.classList.add("active")
      const tabId = this.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Animate progress bars
  function animateProgressBars() {
    const progressBars = document.querySelectorAll(".progress-bar .progress")

    progressBars.forEach((progress) => {
      const width = progress.style.width
      progress.style.width = "0"

      setTimeout(() => {
        progress.style.width = width
      }, 100)
    })
  }

  // Run progress bar animation on load
  window.addEventListener("load", animateProgressBars)

  // Challenge card hover effects
  const challengeCards = document.querySelectorAll(".challenge-card")
  challengeCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("hover")
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
    })
  })

  // Quest card hover effects
  const questCards = document.querySelectorAll(".quest-card")
  questCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("locked")) {
        this.classList.add("hover")
      }
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
    })
  })

  // Badge tooltips
  const badges = document.querySelectorAll(".badge")
  badges.forEach((badge) => {
    const title = badge.getAttribute("title")
    if (title) {
      badge.addEventListener("mouseenter", (e) => {
        const tooltip = document.createElement("div")
        tooltip.classList.add("tooltip")
        tooltip.textContent = title
        document.body.appendChild(tooltip)

        const rect = badge.getBoundingClientRect()
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`
        tooltip.style.opacity = "1"
      })

      badge.addEventListener("mouseleave", () => {
        const tooltip = document.querySelector(".tooltip")
        if (tooltip) {
          tooltip.remove()
        }
      })
    }
  })

  // Perk redemption
  const redeemButtons = document.querySelectorAll(".perk-card .btn-primary")
  redeemButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const perkCard = this.closest(".perk-card")
      const perkName = perkCard.querySelector("h3").textContent
      const perkCost = perkCard.querySelector(".perk-cost span").textContent

      // Show confirmation dialog
      if (confirm(`Are you sure you want to redeem "${perkName}" for ${perkCost}?`)) {
        // Simulate redemption
        this.textContent = "Redeeming..."
        this.disabled = true

        setTimeout(() => {
          this.textContent = "Redeemed!"

          // Update user points
          const userPoints = document.querySelector(".user-points span")
          const currentPoints = Number.parseInt(userPoints.textContent)
          const cost = Number.parseInt(perkCost.split(" ")[0])
          userPoints.textContent = `${currentPoints - cost} Points`

          // Show success message
          const successMessage = document.createElement("div")
          successMessage.classList.add("success-message")
          successMessage.textContent = `Successfully redeemed "${perkName}"!`
          perkCard.appendChild(successMessage)

          setTimeout(() => {
            successMessage.remove()
            this.textContent = "Redeem"
            this.disabled = false
          }, 3000)
        }, 1500)
      }
    })
  })

  // Join challenge button
  const joinButtons = document.querySelectorAll(".challenge-card .btn-primary")
  joinButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const challengeCard = this.closest(".challenge-card")
      const challengeName = challengeCard.querySelector("h3").textContent

      // Show confirmation dialog
      if (confirm(`Are you sure you want to join the "${challengeName}" challenge?`)) {
        // Simulate joining
        this.textContent = "Joining..."
        this.disabled = true

        setTimeout(() => {
          this.textContent = "View Details"
          this.classList.remove("btn-primary")
          this.classList.add("btn-outline")

          // Update badge
          const badge = challengeCard.querySelector(".challenge-badge")
          badge.textContent = "In Progress"

          // Show success message
          const successMessage = document.createElement("div")
          successMessage.classList.add("success-message")
          successMessage.textContent = `Successfully joined "${challengeName}"!`
          challengeCard.appendChild(successMessage)

          setTimeout(() => {
            successMessage.remove()
          }, 3000)
        }, 1500)
      }
    })
  })
})

