function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("cart-subtotal");
  const totalElement = document.getElementById("cart-total");

  if (!cartContainer) return;

  const cart = getCart();

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Seu carrinho está vazio</p>";
    subtotalElement.textContent = "R$ 0,00";
    totalElement.textContent = "R$ 0,00";
    return;
  }

  let subtotal = 0;

  cart.forEach(product => {
    subtotal += product.price * product.quantity;

    const item = document.createElement("div");
    item.classList.add("cart-item");

    const imagePath = product.image.startsWith("assets/")
      ? product.image
      : `assets/imagens/produtos/${product.image}`;

    item.innerHTML = `
      <div class="cart-left">
        <img src="${imagePath}" alt="${product.name}">
      </div>

      <div class="cart-middle">
        <h3>${product.name}</h3>
        <p class="cart-price">
          ${Number(product.price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
        </p>
      </div>

      <div class="cart-right">
        <div class="quantity-controls">
          <button class="decrease" data-id="${product.id}">-</button>
          <span>${product.quantity}</span>
          <button class="increase" data-id="${product.id}">+</button>
        </div>

        <button class="remove-btn" data-id="${product.id}">
          Remover
        </button>
      </div>
    `;

    cartContainer.appendChild(item);
  });

  subtotalElement.textContent = subtotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  totalElement.textContent = subtotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  addCartEvents();
}

function addCartEvents() {
  document.querySelectorAll(".increase").forEach(button => {
    button.addEventListener("click", () => {
      let cart = getCart();
      const id = Number(button.dataset.id);

      const product = cart.find(p => p.id === id);
      if (!product) return;

      product.quantity++;

      saveCart(cart);
      renderCart();
      updateCartCount();
    });
  });

  document.querySelectorAll(".decrease").forEach(button => {
    button.addEventListener("click", () => {
      let cart = getCart();
      const id = Number(button.dataset.id);

      const product = cart.find(p => p.id === id);
      if (!product) return;

      if (product.quantity > 1) {
        product.quantity--;
      }

      saveCart(cart);
      renderCart();
      updateCartCount();
    });
  });

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      removeFromCart(Number(button.dataset.id));
      renderCart();
      updateCartCount();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});