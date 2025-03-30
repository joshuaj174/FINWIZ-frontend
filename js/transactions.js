document.addEventListener("DOMContentLoaded", () => {
  // Filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Filter transactions based on type
      const type = this.textContent.toLowerCase()
      const transactions = document.querySelectorAll(".transaction-item")

      if (type === "all") {
        transactions.forEach((transaction) => {
          transaction.style.display = "grid"
        })
      } else {
        transactions.forEach((transaction) => {
          const amount = transaction.querySelector(".transaction-amount")
          if (amount.classList.contains(type)) {
            transaction.style.display = "grid"
          } else {
            transaction.style.display = "none"
          }
        })
      }
    })
  })

  // Search functionality
  const searchInput = document.querySelector(".search-box input")
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    const transactions = document.querySelectorAll(".transaction-item")

    transactions.forEach((transaction) => {
      const name = transaction.querySelector(".transaction-name").textContent.toLowerCase()
      const account = transaction.querySelector(".transaction-account").textContent.toLowerCase()
      const category = transaction.querySelector(".category-tag").textContent.toLowerCase()

      if (name.includes(searchTerm) || account.includes(searchTerm) || category.includes(searchTerm)) {
        transaction.style.display = "grid"
      } else {
        transaction.style.display = "none"
      }
    })
  })

  // Date filter
  const dateFilter = document.querySelector(".date-filter select")
  dateFilter.addEventListener("change", () => {
    // Simulate loading
    const transactions = document.querySelectorAll(".transaction-item")
    transactions.forEach((transaction) => {
      transaction.style.opacity = "0.5"
    })

    setTimeout(() => {
      transactions.forEach((transaction) => {
        transaction.style.opacity = "1"
      })
    }, 500)
  })

  // Category filter
  const categoryFilter = document.querySelector(".category-filter select")
  categoryFilter.addEventListener("change", function () {
    const category = this.value.toLowerCase()
    const transactions = document.querySelectorAll(".transaction-item")

    if (category === "all categories" || category === "") {
      transactions.forEach((transaction) => {
        transaction.style.display = "grid"
      })
    } else {
      transactions.forEach((transaction) => {
        const transactionCategory = transaction.querySelector(".category-tag").textContent.toLowerCase()
        if (transactionCategory === category) {
          transaction.style.display = "grid"
        } else {
          transaction.style.display = "none"
        }
      })
    }
  })

  // Action buttons
  const actionButtons = document.querySelectorAll(".action-btn")
  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const transaction = this.closest(".transaction-item")
      const transactionName = transaction.querySelector(".transaction-name").textContent
      const icon = this.querySelector("i")

      if (icon.classList.contains("fa-pencil")) {
        // Edit transaction
        alert(`Edit transaction: ${transactionName}`)
      } else if (icon.classList.contains("fa-trash")) {
        // Delete transaction
        if (confirm(`Are you sure you want to delete transaction: ${transactionName}?`)) {
          transaction.style.height = transaction.offsetHeight + "px"
          transaction.style.overflow = "hidden"

          setTimeout(() => {
            transaction.style.height = "0"
            transaction.style.padding = "0"
            transaction.style.margin = "0"
            transaction.style.borderWidth = "0"

            setTimeout(() => {
              transaction.remove()
            }, 300)
          }, 10)
        }
      }
    })
  })

  // Pagination
  const paginationButtons = document.querySelectorAll(".pagination-btn")
  paginationButtons.forEach((button) => {
    if (!button.classList.contains("disabled")) {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        paginationButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button if it's a number
        if (!this.querySelector("i")) {
          this.classList.add("active")
        }

        // Simulate loading
        const transactions = document.querySelectorAll(".transaction-item")
        transactions.forEach((transaction) => {
          transaction.style.opacity = "0.5"
        })

        setTimeout(() => {
          transactions.forEach((transaction) => {
            transaction.style.opacity = "1"
          })
        }, 500)
      })
    }
  })

  // Add Transaction button
  const addTransactionButton = document.querySelector(".header-actions .btn-primary")
  addTransactionButton.addEventListener("click", () => {
    alert("Add Transaction functionality would open a form here")
  })
})

