document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("product-form");

  if (!form) return;

  const productId = getProductIdFromUrl();

  if (productId) {
    document.getElementById("form-title").textContent = "Editar Produto";
    document.getElementById("submit-btn").textContent = "Atualizar Produto";

    await loadProductData(productId);
  }

  form.addEventListener("submit", handleSubmit);
});

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadProductData(productId) {
  try {
    const response = await fetch(`http://localhost:4001/products/${productId}`);
    const product = await response.json();

    if (!response.ok) {
      throw new Error(product.error || "Erro ao carregar produto");
    }

    document.getElementById("name").value = product.name || "";
    document.getElementById("description").value = product.description || "";
    document.getElementById("price").value = product.price || "";
    document.getElementById("stock").value = product.stock || "";
    document.getElementById("category").value = product.category || "";
    document.getElementById("image").value = product.image || "";

  } catch (error) {
    console.error("Erro ao carregar dados do produto:", error);
    showMessage(error.message, "error");
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  const token = localStorage.getItem("adminToken");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const productId = getProductIdFromUrl();

  const payload = {
    name: document.getElementById("name").value.trim(),
    description: document.getElementById("description").value.trim(),
    price: Number(document.getElementById("price").value),
    stock: Number(document.getElementById("stock").value),
    category: document.getElementById("category").value,
    image: document.getElementById("image").value.trim()
  };

  try {
    const isEditing = Boolean(productId);

    const response = await fetch(
      isEditing
        ? `http://localhost:4001/products/${productId}`
        : `http://localhost:4001/products`,
      {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      }
    );

    let result = {};
    try {
      result = await response.json();
    } catch {}

    if (!response.ok) {
      throw new Error(result.error || "Erro ao salvar produto");
    }

    showMessage(
      isEditing ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!",
      "success"
    );

    setTimeout(() => {
      window.location.href = "products.html";
    }, 1000);

  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    showMessage(error.message, "error");
  }
}

function showMessage(message, type) {
  const formMessage = document.getElementById("form-message");

  formMessage.textContent = message;
  formMessage.classList.remove("error-message", "success-message");

  if (type === "success") {
    formMessage.classList.add("success-message");
  } else {
    formMessage.classList.add("error-message");
  }
}