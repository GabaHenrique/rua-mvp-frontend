const CART_KEY = "cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  let cart = getCart();

  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image || "default.jpg",
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

function updateCartQuantity(productId, action) {
  const cart = getCart();
  const product = cart.find(item => item.id === productId);

  if (!product) return;

  if (action === "increase") {
    product.quantity += 1;
  }

  if (action === "decrease") {
    if (product.quantity > 1) {
      product.quantity -= 1;
    }
  }

  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  document.querySelectorAll(".cart-count").forEach(counter => {
    counter.textContent = totalItems;
  });
}

function setupBuyButtons(products, redirectToCart = false) {
  const buttons = document.querySelectorAll(".buy-btn");

  buttons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const id = Number(this.dataset.id);
      const product = products.find(p => p.id === id);

      if (!product) {
        console.error("Produto não encontrado");
        return;
      }

      addToCart(product);

      if (redirectToCart) {
        window.location.href = "carrinho.html";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});