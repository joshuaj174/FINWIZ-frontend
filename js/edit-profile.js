// Simplified edit-profile.js without Firebase integration
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Get mock user data
    const userData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Anytown, USA",
      country: "USA",
      dob: "1990-01-01",
    }

    // Populate form fields
    document.getElementById("fullName").value = userData.fullName
    document.getElementById("email").value = userData.email
    document.getElementById("phone").value = userData.phone
    document.getElementById("address").value = userData.address
    document.getElementById("dob").value = userData.dob
    document.getElementById("country").value = userData.country
  } catch (error) {
    console.error("Error loading profile data:", error)
  }

  // Form submission
  const profileForm = document.getElementById("profileForm")
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simply show success message and redirect
      alert("Profile updated successfully!")
      window.location.href = "profile.html"
    })
  }

  // Cancel button
  const cancelBtn = document.getElementById("cancelBtn")
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      window.location.href = "profile.html"
    })
  }
})

