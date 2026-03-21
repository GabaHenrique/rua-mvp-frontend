const token = localStorage.getItem("adminToken");

if (!token) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("adminToken");

  // Se já estiver logado, vai direto pro dashboard
  if (token) {
    window.location.href = "dashboard.html";
    return;
  }

  const form = document.getElementById("login-form");

  if (form) {
    form.addEventListener("submit", handleLogin);
  }
});

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const loginBtn = document.getElementById("login-btn");
  const message = document.getElementById("login-message");

  message.textContent = "";
  loginBtn.disabled = true;
  loginBtn.textContent = "Entrando...";

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
      throw new Error(data.error || "Erro ao fazer login");
    }

    localStorage.setItem("adminToken", data.token);

    message.textContent = "Login realizado com sucesso!";
    message.classList.add("success-message");
    message.classList.remove("error-message");

    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("Erro no login:", error);

    message.textContent = error.message;
    message.classList.add("error-message");
    message.classList.remove("success-message");
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Entrar";
  }
}