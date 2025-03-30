// Simplified profile.js without Firebase integration
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Get mock user data
    const userData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Anytown, USA",
      country: "USA",
      dob: "January 1, 1990",
    }

    // Update profile information
    document.getElementById("userName").textContent = userData.fullName
    document.getElementById("userEmail").textContent = userData.email
    document.getElementById("userPhone").textContent = userData.phone

    // Update account details
    document.getElementById("fullNameValue").textContent = userData.fullName
    document.getElementById("emailValue").textContent = userData.email
    document.getElementById("phoneValue").textContent = userData.phone
    document.getElementById("dobValue").textContent = userData.dob
    document.getElementById("addressValue").textContent = userData.address
    document.getElementById("countryValue").textContent = userData.country
  } catch (error) {
    console.error("Error loading profile data:", error)
  }

  // Change password button
  const changePasswordBtn = document.getElementById("changePasswordBtn")
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener("click", () => {
      alert("Password reset functionality would be implemented here.")
    })
  }
})

