document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:4000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro no login");
    }

    // 🔥 salva token
    localStorage.setItem("adminToken", data.token);

    alert("Login realizado com sucesso!");

    // 🔥 redireciona para dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);
    alert("Erro: " + error.message);
  }
});