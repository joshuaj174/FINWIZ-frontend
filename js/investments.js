document.addEventListener("DOMContentLoaded", () => {
  // Animate progress bars
  function animateProgressBars() {
    const progressBars = document.querySelectorAll(".progress-bar .progress")

    progressBars.forEach((progress) => {
      const width = progress.style.width
      progress.style.width = "0"

      setTimeout(() => {
        progress.style.width = width
        progress.style.transition = "width 1.5s ease-out"
      }, 300)
    })
  }

  // Run progress bar animation on load
  window.addEventListener("load", animateProgressBars)

  // Category card hover effects with enhanced animations
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("hover")
      this.style.transform = "translateY(-10px)"
      this.style.boxShadow = "0 10px 25px rgba(217, 70, 239, 0.2)"

      const icon = this.querySelector(".category-icon i")
      if (icon) {
        icon.style.transform = "scale(1.2)"
        icon.style.transition = "transform 0.3s ease"
      }

      const progress = this.querySelector(".progress")
      if (progress) {
        progress.style.opacity = "0.8"
        progress.style.filter = "brightness(1.2)"
        progress.style.transition = "all 0.3s ease"
      }
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
      this.style.transform = ""
      this.style.boxShadow = ""

      const icon = this.querySelector(".category-icon i")
      if (icon) {
        icon.style.transform = ""
      }

      const progress = this.querySelector(".progress")
      if (progress) {
        progress.style.opacity = ""
        progress.style.filter = ""
      }
    })
  })

  // Search functionality with animation
  const searchInput = document.querySelector(".search-box input")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const investments = document.querySelectorAll(".table-row")

      investments.forEach((investment) => {
        const name = investment.querySelector(".investment-details .name").textContent.toLowerCase()
        const category = investment.querySelector(".investment-category").textContent.toLowerCase()

        if (name.includes(searchTerm) || category.includes(searchTerm)) {
          investment.style.display = "grid"
          investment.style.opacity = "1"
          investment.style.transform = "translateX(0)"
          investment.style.transition = "all 0.5s ease"
        } else {
          investment.style.opacity = "0"
          investment.style.transform = "translateX(-20px)"

          setTimeout(() => {
            investment.style.display = "none"
          }, 500)
        }
      })
    })
  }

  // Filter functionality with animation
  const filterSelect = document.querySelector(".filter-select")
  if (filterSelect) {
    filterSelect.addEventListener("change", function () {
      const category = this.value.toLowerCase()
      const investments = document.querySelectorAll(".table-row")

      investments.forEach((investment) => {
        const investmentCategory = investment.querySelector(".investment-category").textContent.toLowerCase()

        if (category === "all categories" || category === "" || investmentCategory === category) {
          investment.style.display = "grid"
          investment.style.opacity = "1"
          investment.style.transform = "translateX(0)"
          investment.style.transition = "all 0.5s ease"
        } else {
          investment.style.opacity = "0"
          investment.style.transform = "translateX(-20px)"

          setTimeout(() => {
            investment.style.display = "none"
          }, 500)
        }
      })
    })
  }

  // Action buttons with enhanced effects
  const actionButtons = document.querySelectorAll(".action-btn")
  actionButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)"
      this.style.backgroundColor = "rgba(217, 70, 239, 0.1)"
      this.style.color = "var(--primary)"
      this.style.transition = "all 0.3s ease"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.backgroundColor = ""
      this.style.color = ""
    })

    button.addEventListener("click", function () {
      const investment = this.closest(".table-row")
      const investmentName = investment.querySelector(".investment-details .name").textContent
      const icon = this.querySelector("i")

      if (icon.classList.contains("fa-eye")) {
        // View investment details with animation
        investment.style.backgroundColor = "rgba(217, 70, 239, 0.1)"
        setTimeout(() => {
          investment.style.backgroundColor = ""
          investment.style.transition = "background-color 1s ease"
          alert(`View details for: ${investmentName}`)
        }, 300)
      } else if (icon.classList.contains("fa-pencil")) {
        // Edit investment with animation
        this.classList.add("animate-rotate")
        setTimeout(() => {
          this.classList.remove("animate-rotate")
          alert(`Edit investment: ${investmentName}`)
        }, 500)
      }
    })
  })

  // Recommendation buttons with enhanced effects
  const recommendationButtons = document.querySelectorAll(".recommendation-card .btn-primary")
  recommendationButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)"
      this.style.boxShadow = "0 5px 15px rgba(217, 70, 239, 0.3)"
      this.style.transition = "all 0.3s ease"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""
    })

    button.addEventListener("click", function () {
      const card = this.closest(".recommendation-card")
      const investmentName = card.querySelector("h3").textContent

      // Add ripple effect
      const ripple = document.createElement("span")
      ripple.style.position = "absolute"
      ripple.style.top = "50%"
      ripple.style.left = "50%"
      ripple.style.transform = "translate(-50%, -50%)"
      ripple.style.width = "0"
      ripple.style.height = "0"
      ripple.style.borderRadius = "50%"
      ripple.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
      ripple.style.transition = "all 0.6s ease-out"

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.style.width = "300px"
        ripple.style.height = "300px"
        ripple.style.opacity = "0"
      }, 10)

      setTimeout(() => {
        ripple.remove()
        alert(`Invest in: ${investmentName}`)
      }, 600)
    })
  })

  // Add Investment button with enhanced effects
  const addInvestmentButton = document.querySelector(".header-actions .btn-primary")
  if (addInvestmentButton) {
    addInvestmentButton.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)"
      this.style.boxShadow = "0 5px 15px rgba(217, 70, 239, 0.3)"
      this.style.transition = "all 0.3s ease"
    })

    addInvestmentButton.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""
    })

    addInvestmentButton.addEventListener("click", () => {
      // Add ripple effect
      const ripple = document.createElement("span")
      ripple.style.position = "absolute"
      ripple.style.top = "50%"
      ripple.style.left = "50%"
      ripple.style.transform = "translate(-50%, -50%)"
      ripple.style.width = "0"
      ripple.style.height = "0"
      ripple.style.borderRadius = "50%"
      ripple.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
      ripple.style.transition = "all 0.6s ease-out"

      addInvestmentButton.style.position = "relative"
      addInvestmentButton.style.overflow = "hidden"
      addInvestmentButton.appendChild(ripple)

      setTimeout(() => {
        ripple.style.width = "300px"
        ripple.style.height = "300px"
        ripple.style.opacity = "0"
      }, 10)

      setTimeout(() => {
        ripple.remove()
        alert("Add Investment functionality would open a form here")
      }, 600)
    })
  }

  // Time period change with animation
  const timePeriodSelect = document.querySelector(".time-period select")
  if (timePeriodSelect) {
    timePeriodSelect.addEventListener("change", () => {
      // Simulate loading with animation
      const chartPlaceholder = document.querySelector(".chart-placeholder")
      chartPlaceholder.style.opacity = "0.5"
      chartPlaceholder.style.transition = "opacity 0.3s ease"

      setTimeout(() => {
        // Animate chart elements
        const chartPoints = document.querySelectorAll(".chart-point")
        chartPoints.forEach((point) => {
          const originalBottom = point.style.bottom
          point.style.bottom = "0"

          setTimeout(() => {
            point.style.bottom = originalBottom
            point.style.transition = "bottom 1s ease-out"
          }, 100)
        })

        chartPlaceholder.style.opacity = "1"
      }, 500)
    })
  }

  // Animate chart elements on load
  window.addEventListener("load", () => {
    // Animate chart points
    const chartPoints = document.querySelectorAll(".chart-point")
    chartPoints.forEach((point) => {
      const originalBottom = point.style.bottom
      point.style.bottom = "0"

      setTimeout(() => {
        point.style.bottom = originalBottom
        point.style.transition = "bottom 1s ease-out"
      }, 500)
    })

    // Animate donut segments
    const donutSegments = document.querySelectorAll(".donut-segment")
    donutSegments.forEach((segment, index) => {
      segment.style.opacity = "0"

      setTimeout(
        () => {
          segment.style.opacity = "1"
          segment.style.transition = "opacity 0.5s ease-out"
        },
        300 + index * 200,
      )
    })
  })
})

