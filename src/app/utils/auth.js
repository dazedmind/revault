// File: src/app/utils/auth.js
// Enhanced version with comprehensive logout logging

export const logout = async () => {
  try {
    console.log("🚪 Starting logout process...");

    // Get token before clearing localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      // Call the logout API endpoint to log the activity
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📨 Logout API response:", data);

      if (data.success) {
        console.log("✅ Logout activity logged successfully");
      } else {
        console.warn("⚠️ Logout API returned non-success:", data.message);
      }
    } else {
      console.log("ℹ️ No token found, proceeding with local cleanup");
    }

    // Clear all auth-related items from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    console.log("🧹 Cleared localStorage items");

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    console.error("❌ Logout error:", error);

    // Even if the API call fails, we should still clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    console.log("🧹 Cleared localStorage items after error");

    // Still redirect to login
    window.location.href = "/login";
  }
};

// Enhanced logout function specifically for navbar usage
export const performLogout = async () => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    await logout();
  }
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return false;
  }

  try {
    // Basic JWT validation (you can make this more robust)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    // Check if token is expired
    if (payload.exp < currentTime) {
      console.log("🕒 Token expired, clearing auth data");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      return false;
    }

    return true;
  } catch (error) {
    console.error("❌ Token validation error:", error);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    return false;
  }
};

// Function to get current user info from token
export const getCurrentUser = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      user_id: payload.user_id,
      firstName: payload.firstName,
      email: payload.email,
      role: payload.role,
      userNumber: payload.userNumber,
    };
  } catch (error) {
    console.error("❌ Error parsing user from token:", error);
    return null;
  }
};
