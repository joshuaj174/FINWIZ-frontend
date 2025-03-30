document.addEventListener("DOMContentLoaded", () => {
  // Tab Switching
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

      // Animate progress bars in the active tab
      animateProgressBars(document.getElementById(tabId))
    })
  })

  // Animate progress bars
  function animateProgressBars(container) {
    const progressBars = container.querySelectorAll(".progress-bar .progress")

    progressBars.forEach((progress) => {
      const width = progress.style.width
      progress.style.width = "0"

      setTimeout(() => {
        progress.style.width = width
      }, 100)
    })
  }

  // Run progress bar animation on load
  window.addEventListener("load", () => {
    const activeTab = document.querySelector(".tab-pane.active")
    if (activeTab) {
      animateProgressBars(activeTab)
    }
  })

  // Add expense button functionality
  const addExpenseButtons = document.querySelectorAll(".btn-primary")
  addExpenseButtons.forEach((button) => {
    if (button.textContent.includes("Add Expense")) {
      button.addEventListener("click", () => {
        // Show modal or form for adding expense
        alert("Add Expense functionality would open a form here")
      })
    }
  })

  // AI Budget Plan generation
  const generateBudgetButton = document.querySelector(".btn-primary.btn-block")
  if (generateBudgetButton && generateBudgetButton.textContent.includes("Generate AI Budget Plan")) {
    generateBudgetButton.addEventListener("click", function () {
      // Simulate loading
      this.innerHTML = '<i class="fa-solid fa-spinner animate-rotate"></i> Generating...'
      this.disabled = true

      // Simulate AI processing
      setTimeout(() => {
        this.innerHTML = '<i class="fa-solid fa-brain"></i> Generate AI Budget Plan'
        this.disabled = false

        // Show success message
        const message = document.createElement("div")
        message.className = "success-message animate-slide-in-up"
        message.innerHTML = '<i class="fa-solid fa-check-circle"></i> Budget plan generated successfully!'

        const cardFooter = this.parentElement
        cardFooter.insertBefore(message, cardFooter.firstChild)

        // Remove message after 3 seconds
        setTimeout(() => {
          message.classList.add("animate-fade-out")
          setTimeout(() => {
            message.remove()
          }, 500)
        }, 3000)

        // Scroll to sample budget plan
        const samplePlan = document.querySelector(".sample-budget-plan")
        if (samplePlan) {
          samplePlan.scrollIntoView({ behavior: "smooth" })

          // Add highlight animation
          samplePlan.classList.add("highlight")
          setTimeout(() => {
            samplePlan.classList.remove("highlight")
          }, 1500)
        }
      }, 2000)
    })
  }

  // Form input animations
  const formInputs = document.querySelectorAll("input, select")
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused")
    })
  })

  // Checkbox animations
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        this.parentElement.classList.add("checked")
      } else {
        this.parentElement.classList.remove("checked")
      }
    })
  })

  // Budget category hover effects
  const budgetCategories = document.querySelectorAll(".budget-category")
  budgetCategories.forEach((category) => {
    category.addEventListener("mouseenter", function () {
      this.classList.add("hover")
      const progress = this.querySelector(".progress")
      if (progress) {
        progress.classList.add("animate-pulse")
      }
    })

    category.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
      const progress = this.querySelector(".progress")
      if (progress) {
        progress.classList.remove("animate-pulse")
      }
    })
  })

  // Expense item hover effects
  const expenseItems = document.querySelectorAll(".expense-item")
  expenseItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.classList.add("hover")
    })

    item.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
    })
  })
})

