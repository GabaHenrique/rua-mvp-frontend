function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  let cart = getCart();

  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

/* ================= RENDER ================= */


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

    item.innerHTML = `
      <div class="cart-left">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="cart-middle">
        <h3>${product.name}</h3>
        <p class="cart-price">R$ ${product.price.toFixed(2)}</p>
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

  subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
  totalElement.textContent = `R$ ${subtotal.toFixed(2)}`;

  addCartEvents();
}

/* ================= EVENTOS  ================= */

function addCartEvents() {
  document.querySelectorAll(".increase").forEach(button => {
    button.addEventListener("click", () => {
      let cart = getCart();
      const id = button.dataset.id;

      const product = cart.find(p => p.id == id);
      product.quantity++;

      saveCart(cart);
      renderCart();
      updateCartCount();
    });
  });

  document.querySelectorAll(".decrease").forEach(button => {
    button.addEventListener("click", () => {
      let cart = getCart();
      const id = button.dataset.id;

      const product = cart.find(p => p.id == id);

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
      let cart = getCart();
      const id = button.dataset.id;

      cart = cart.filter(p => p.id != id);

      saveCart(cart);
      renderCart();
      updateCartCount();
    });
  });
}

/* ================= CONTADOR DE MENU  ================= */

function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  if (!cartCountElement) return;

  const cart = getCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  cartCountElement.textContent = totalItems;
}

/* ================= INICIALIZAÇÃO  ================= */

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});