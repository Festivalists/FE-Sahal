const loginForm = document.getElementById('login-form');
const messageElement = document.getElementById('message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Prepare data for fetch request
  const data = { email, password };

  try {
    const response = await fetch(`${API}/auth`, {
      method: 'POST', // Set method to POST for sending data
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
        'Ngrok-Version': '2'
      }, // Set content type
      body: JSON.stringify(data), // Convert data to JSON string
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse error response as JSON
      messageElement.textContent = errorData.message; // Display error message
    } else {
      const loginData = await response.json(); // Parse response as JSON
      // Success scenario: Store token and redirect
      // storeToken(loginData.data.token); // Call function to store token (implementation needed)
      window.location.href = 'dashboard.html'; // Redirect to dashboard
    }
  } catch (error) {
    messageElement.textContent = error.message; // Display error message
  }
});

// Function to store token (implementation example using localStorage)
function storeToken(token) {
  localStorage.setItem('festivalist_token', token);
}
