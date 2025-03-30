document.addEventListener("DOMContentLoaded", () => {
  // Add Payment Method button
  const addPaymentButton = document.querySelector(".header-actions .btn-primary")
  if (addPaymentButton) {
    addPaymentButton.addEventListener("click", () => {
      alert("Add Payment Method functionality would open a form here")
    })
  }

  // Add New Payment Method card
  const addNewCard = document.querySelector(".payment-card.add-new")
  if (addNewCard) {
    addNewCard.addEventListener("click", () => {
      alert("Add Payment Method functionality would open a form here")
    })
  }

  // Card action buttons
  const actionButtons = document.querySelectorAll(".card-action-btn")
  actionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation()
      const card = this.closest(".payment-card")
      const cardType = card.classList.contains("credit-card") ? "Credit Card" : "Bank Account"
      const icon = this.querySelector("i")

      if (icon.classList.contains("fa-pencil")) {
        // Edit payment method
        alert(`Edit ${cardType} details`)
      } else if (icon.classList.contains("fa-trash")) {
        // Delete payment method
        if (confirm(`Are you sure you want to delete this ${cardType}?`)) {
          card.style.opacity = "0"
          setTimeout(() => {
            card.style.height = "0"
            card.style.padding = "0"
            card.style.margin = "0"
            setTimeout(() => {
              card.remove()
            }, 300)
          }, 300)
        }
      }
    })
  })

  // Analytics selects
  const analyticsSelects = document.querySelectorAll(".analytics-card select")
  analyticsSelects.forEach((select) => {
    select.addEventListener("change", function () {
      const card = this.closest(".analytics-card")
      const chartPlaceholder = card.querySelector(".chart-placeholder")

      // Simulate loading
      chartPlaceholder.style.opacity = "0.5"

      setTimeout(() => {
        chartPlaceholder.style.opacity = "1"
      }, 500)
    })
  })

  // Hover effects for payment cards
  const paymentCards = document.querySelectorAll(".payment-card")
  paymentCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.15)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""
    })
  })
})

