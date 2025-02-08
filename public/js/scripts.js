// Handle Signup Form Submission
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert(`Account successfully created!\nUsername: ${result.username}\nPassword: ${result.password}`);
      window.location.href = "/login";
    } else {
      alert(result.error);
    }
  } catch (err) {
    alert("An error occurred. Please try again.");
  }
});

// Handle Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Login successful! Redirecting...");
      window.location.href = "http://mrfrankinc.vercel.app"; // Redirect to d.com
    } else {
      alert(result.error);
    }
  } catch (err) {
    alert("An error occurred. Please try again.");
  }
});
