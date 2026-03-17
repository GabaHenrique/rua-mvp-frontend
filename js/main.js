document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  const searchWrapper = document.querySelector(".search-wrapper");
  const searchBtn = document.querySelector(".search-btn");
  const searchInput = document.getElementById("search-input");

  /* --------------------------MENU--------------------------------- */
  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("active");
    });
  }

  document.querySelectorAll(".submenu-toggle").forEach(button => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const submenu = this.nextElementSibling;
      submenu.classList.toggle("active");
    });
  });

  /* BUSCA */
  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      searchWrapper.classList.toggle("active");

      if (searchWrapper.classList.contains("active")) {
        searchInput.focus();
      }
    });
  }

  document.addEventListener("click", function () {
    if (menu) menu.classList.remove("active");
    if (searchWrapper) searchWrapper.classList.remove("active");
  });

  /* BOTÕES COMPRAR */
  

});