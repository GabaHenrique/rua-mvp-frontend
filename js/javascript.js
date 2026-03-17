document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  
  /* ================= MENU ================= */

  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  /* Submenu */
  document.querySelectorAll(".submenu-toggle").forEach(button => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const submenu = this.nextElementSibling;
      submenu.classList.toggle("active");
    });
  });

  /* ================= BUSCA ================= */



  /* ================= FECHAR AO CLICAR FORA ================= */

  document.addEventListener("click", function () {
    menu.classList.remove("active");
    searchWrapper.classList.remove("active");
  });

});



document.addEventListener("DOMContentLoaded", function () {

  // outros códigos...

  document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", function () {

      const id = parseInt(this.dataset.id);

      const product = products.find(p => p.id === id);

      if (!product) return;

      addToCart(product);

      window.location.href = "carrinho.html";

      document.addEventListener("DOMContentLoaded", renderCart);

  });


document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});


  });
});