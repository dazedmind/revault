export const logout = async () => {
  try {
    // Call the logout API endpoint
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      // Clear all auth-related items from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      
      // Redirect to login page
      window.location.href = '/login';
    } else {
      throw new Error(data.message || 'Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
    // Even if the API call fails, we should still clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    window.location.href = '/login';
  }
}; 