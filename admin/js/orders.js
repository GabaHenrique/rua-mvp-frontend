const token = localStorage.getItem("adminToken");

if (!token) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadOrders();
});

async function loadOrders() {
  const ordersList = document.getElementById("orders-list");

  if (!ordersList) return;

  try {
    const response = await fetch("http://localhost:4001/orders/with-products");
    const orders = await response.json();

    console.log("Pedidos carregados:", orders);

    if (!Array.isArray(orders) || orders.length === 0) {
      ordersList.innerHTML = "<p>Nenhum pedido encontrado.</p>";
      return;
    }

    ordersList.innerHTML = orders.map(order => `
      <div class="order-card">
        <div class="order-header">
          <div>
            <h3>Pedido #${order.id}</h3>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Total:</strong> ${Number(order.total).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}</p>
          </div>
        </div>

        <div class="order-items">
          ${order.items.map(item => `
            <div class="order-item">
              <img 
                src="../${item.image}" 
                alt="${item.product_name}"
                class="order-item-image"
              >

              <div class="order-item-info">
                <p><strong>${item.product_name}</strong></p>
                <p>Quantidade: ${item.quantity}</p>
                <p>Preço: ${Number(item.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}</p>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="order-actions">
          <select class="status-select" data-id="${order.id}">
            <option value="pending" ${order.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="completed" ${order.status === "completed" ? "selected" : ""}>Completed</option>
            <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>Cancelled</option>
          </select>

          <button class="update-status-btn" data-id="${order.id}">
            Atualizar Status
          </button>
        </div>
      </div>
    `).join("");

    setupStatusButtons();

  } catch (error) {
    console.error("Erro ao carregar pedidos:", error);
    ordersList.innerHTML = "<p>Erro ao carregar pedidos.</p>";
  }
}

function setupStatusButtons() {
  document.querySelectorAll(".update-status-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const orderId = button.dataset.id;
      const select = document.querySelector(`.status-select[data-id="${orderId}"]`);

      if (!select) return;

      const newStatus = select.value;

      await updateOrderStatus(orderId, newStatus);
    });
  });
}

async function updateOrderStatus(orderId, status) {
  try {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(`http://localhost:4001/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao atualizar status");
    }

    console.log("Status atualizado:", result);

    await loadOrders();

  } catch (error) {
    console.error("Erro ao atualizar status:", error);
  }
}