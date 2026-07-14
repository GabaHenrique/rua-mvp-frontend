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
    subtotal += Number (product.price) * product.quantity;

    const imagePath = product.image.startsWith("assets/")
      ? product.image
      : `assets/imagens/produtos/${product.image}`;

const item = document.createElement("div");
    item.classList.add("cart-item");

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

  const formattedTotal = subtotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  if (subtotalElement) subtotalElement.textContent = formattedTotal;
  if (totalElement) totalElement.textContent = formattedTotal;

  addCartEvents();
}

function addCartEvents() {
  document.querySelectorAll(".increase").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      updateCartQuantity(id, "increase");
      renderCart();
      updateCartCount();
    });
  });

  document.querySelectorAll(".decrease").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      updateCartQuantity(id, "decrease");
      renderCart();
      updateCartCount();
    });
  });

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      removeFromCart(id);
      renderCart();
      updateCartCount();
    });
  });
}

async function checkout() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }
  const total = cart.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0);

  const payload = {
    total, 
    items: cart.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      price: Number(item.price)
    }))
  };

  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
if (!response.ok) {
      throw new Error("Erro ao finalizar pedido");
    }
    console.log("Pedido criado:", result);

    clearCart();
    updateCartCount();
    renderCart();
window.location.href = "sucesso.html";
    

  } catch (error) {
    console.error("Erro no checkout:", error);
    
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();

  const checkoutBtn = document.getElementById("checkout-btn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkout);
  }
});