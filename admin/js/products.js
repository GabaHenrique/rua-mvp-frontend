console.log("API_URL:", API_URL);

const token = localStorage.getItem("adminToken");

if (!token) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
});

async function loadProducts() {
  const productsList = document.getElementById("products-list");

  if (!productsList) return;

  try {
    const response = await fetch("http://localhost:4001/products");
    const products = await response.json();

    console.log("Produtos carregados no admin:", products);

    if (!Array.isArray(products) || products.length === 0) {
      productsList.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }

    productsList.innerHTML = `
      <div class="products-table">
        <div class="products-table-header">
          <span>Imagem</span>
          <span>Nome</span>
          <span>Preço</span>
          <span>Estoque</span>
          <span>Ações</span>
        </div>

        ${products.map(product => `
          <div class="products-table-row">
            <div class="product-image-cell">
              <img 
                src="../assets/imagens/produtos/${product.image}" 
                alt="${product.name}" 
                class="product-thumb"
              >
            </div>

            <div>${product.name}</div>

            <div>
              ${Number(product.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </div>

            <div>${product.stock}</div>

            <div class="product-actions">
              <a href="product-form.html?id=${product.id}" class="edit-btn">Editar</a>
              <button class="delete-btn" data-id="${product.id}">Excluir</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    setupDeleteButtons();

  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    productsList.innerHTML = "<p>Erro ao carregar produtos.</p>";
  }
}

function setupDeleteButtons() {
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const productId = button.dataset.id;

      const confirmed = confirm("⚠️ Tem certeza que deseja excluir este produto?\n\nEssa ação não pode ser desfeita.");

      if (!confirmed) return;

      await deleteProduct(productId);
    });
  });
}

async function deleteProduct(productId) {
  try {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Você precisa estar logado como admin.");
      return;
    }

    const response = await fetch(`http://localhost:4001/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      let result = {};
      try {
        result = await response.json();
      } catch {}

      throw new Error(result.error || "Erro ao excluir produto");
    }

    alert("Produto excluído com sucesso!");
    await loadProducts();

  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    alert("Erro ao excluir produto: " + error.message);
  }
};

    
