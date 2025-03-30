document.addEventListener("DOMContentLoaded", () => {
  // Sidebar Toggle
  const toggleSidebar = document.getElementById("toggleSidebar")
  const closeSidebar = document.getElementById("closeSidebar")
  const sidebar = document.getElementById("sidebar")

  if (toggleSidebar && sidebar) {
    toggleSidebar.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })
  }

  if (closeSidebar && sidebar) {
    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("active")
    })
  }

  // Close sidebar on window resize if in desktop mode
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && sidebar) {
      sidebar.classList.remove("active")
    }
  })

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-pop-in, .animate-slide-in-up",
    )

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.visibility = "visible"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial visibility to hidden for elements that will be animated
  document
    .querySelectorAll(
      ".animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-pop-in, .animate-slide-in-up",
    )
    .forEach((element) => {
      element.style.visibility = "hidden"
      element.style.opacity = "0"
      element.style.transition = "all 0.8s ease-out"
    })

  // Run animation check on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // Add hover animation to cards
  const cards = document.querySelectorAll(".card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("hover")
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)"
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
      this.style.transform = ""
      this.style.boxShadow = ""
    })
  })

  // Add hover animation to stat cards
  const statCards = document.querySelectorAll(".stat-card")
  statCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const statValue = this.querySelector(".stat-value")
      if (statValue) {
        statValue.classList.add("animate-pulse")
      }
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)"
    })

    card.addEventListener("mouseleave", function () {
      const statValue = this.querySelector(".stat-value")
      if (statValue) {
        statValue.classList.remove("animate-pulse")
      }
      this.style.transform = ""
      this.style.boxShadow = ""
    })
  })

  // Animate progress bars
  const animateProgressBars = () => {
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

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left
      const y = e.clientY - e.target.getBoundingClientRect().top

      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.style.position = "absolute"
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
      }, 600)
    })
  })

  // Add animation to sidebar links
  const sidebarLinks = document.querySelectorAll(".sidebar-link")
  sidebarLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const icon = this.querySelector("i")
      if (icon) {
        icon.classList.add("animate-pulse")
        icon.style.transform = "scale(1.2)"
        icon.style.transition = "transform 0.3s ease"
      }
    })

    link.addEventListener("mouseleave", function () {
      const icon = this.querySelector("i")
      if (icon) {
        icon.classList.remove("animate-pulse")
        icon.style.transform = ""
      }
    })
  })

  // Animate chart elements
  const animateCharts = () => {
    // Animate donut charts
    const donutSegments = document.querySelectorAll(".donut-segment")
    donutSegments.forEach((segment) => {
      segment.style.transition = "transform 1.5s ease-out, opacity 1.5s ease-out"
      segment.style.opacity = "0"

      setTimeout(() => {
        segment.style.opacity = "1"
      }, 300)
    })

    // Animate bar charts
    const bars = document.querySelectorAll(".bar")
    bars.forEach((bar) => {
      const height = bar.style.height
      bar.style.height = "0"

      setTimeout(() => {
        bar.style.height = height
      }, 300)
    })
  }

  // Run chart animations on load
  window.addEventListener("load", animateCharts)
})

