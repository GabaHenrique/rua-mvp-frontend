

async function loadProducts(category = "") {
  try {
    const products = await getProducts(category);
    renderProducts(products);
  } catch (error) {
    console.error("Erro:", error);
  }
}

function renderProducts(products) {
  const container = document.querySelector(".products-grid");

  let html = "";

  products.forEach(product => {
    

    const image = product.image 
      ? product.image 
      : "assets/imagens/produtos/default.webp";

    html += `
      <div class="product-card">
        <a href="produtoUnico.html?id=${product.id}">
          
          <div class="product-image">
            <img src="${image}" alt="${product.name}">
          </div>

          <h3 class="product-name">${product.name}</h3>

          <p class="product-price">
            ${Number(product.price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </p>

        </a>

        <button class="buy-btn" data-id="${product.id}">
          Comprar
        </button>
      </div>
    `;
  });

  container.innerHTML = html;

  setupBuyButtons(products);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".products-grid");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");



  loadProducts(category);
});