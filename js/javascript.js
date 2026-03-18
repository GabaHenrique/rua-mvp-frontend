document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  /* ================= MENU ================= */

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("active");
    });
  }

  /* ================= SUBMENU ================= */

  document.querySelectorAll(".submenu-toggle").forEach(button => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      const submenu = this.nextElementSibling;

      if (submenu) {
        submenu.classList.toggle("active");
      }
    });
  });

  /* ================= FECHAR MENU ================= */

  document.addEventListener("click", function () {
    if (menu) menu.classList.remove("active");
  });

  /* ================= CARRINHO ================= */

  if (typeof renderCart === "function") {
    renderCart();
  }

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

});


