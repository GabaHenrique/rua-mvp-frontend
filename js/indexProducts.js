document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("home-products");

  if (!container) return;

  try {
    const response = await fetch("http://localhost:4000/products");
    const products = await response.json();

    const productsArray = Array.isArray(products) ? products : products.products;

    console.log("Produtos recebidos:", productsArray);

    const featuredProducts = getFeaturedProductsByCategory(productsArray).slice(0, 4);

    console.log("Produtos escolhidos para home:", featuredProducts);

    renderHomeProducts(featuredProducts, container);
    setupBuyButtons(featuredProducts);

  } catch (error) {
    console.error("Erro ao carregar produtos da home:", error);
  }
});

function getFeaturedProductsByCategory(products) {
  const categories = [
    "bikes",
    "bancos",
    "cubos",
    "manoplas",
    "pedais",
    "quadros"
  ];

  const featured = [];
  const usedIds = new Set();

  // tenta pegar 1 por categoria
  categories.forEach(category => {
    const productsFromCategory = products.filter(product =>
      product.category &&
      product.category.toLowerCase().includes(category) &&
      !usedIds.has(product.id)
    );

    if (productsFromCategory.length > 0) {
      const randomIndex = Math.floor(Math.random() * productsFromCategory.length);
      const selectedProduct = productsFromCategory[randomIndex];

      featured.push(selectedProduct);
      usedIds.add(selectedProduct.id);
    }
  });

  // completa até 4 produtos, se necessário
  if (featured.length < 4) {
    const remainingProducts = products.filter(product => !usedIds.has(product.id));

    while (featured.length < 4 && remainingProducts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingProducts.length);
      const selectedProduct = remainingProducts.splice(randomIndex, 1)[0];

      featured.push(selectedProduct);
      usedIds.add(selectedProduct.id);
    }
  }

  return featured;
}

function renderHomeProducts(products, container) {
  if (!products.length) {
    container.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  container.innerHTML = products.map(product => {
    const image = product.image
      ? product.image
      : `assets/imagens/produtos/default.jpg`;

    return `
      <div class="product-card">
        <a href="produtoUnico.html?id=${product.id}" class="product-link">
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
  }).join("");
}