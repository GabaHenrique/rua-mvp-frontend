document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      window.location.href = "login.html";
      return;
    }

    const response = await fetch(`${API_URL}/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      localStorage.removeItem("adminToken");
      window.location.href = "login.html";
      return;
    }

    const data = await response.json();

    console.log("Dados do dashboard:", data);

    document.getElementById("total-orders").textContent =
      data.total_orders ?? 0;

    document.getElementById("total-sales").textContent =
      Number(data.total_sales ?? 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });

    document.getElementById("pending-orders").textContent =
      data.pending_orders ?? 0;

    const topProductsContainer = document.getElementById("top-products-list");

    if (!data.top_products || data.top_products.length === 0) {
      topProductsContainer.innerHTML = "<p>Nenhum produto vendido ainda.</p>";
      return;
    }

    topProductsContainer.innerHTML = data.top_products.map(product => `
      <div class="top-product-item">
        <span>${product.name}</span>
        <strong>${product.total_sold} vendidos</strong>
      </div>
    `).join("");

  } catch (error) {
    console.error("Erro ao carregar dashboard:", error);
  }
});