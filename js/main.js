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



document.addEventListener("click", function (e) {
  const isClickInsideMenu = menu.contains(e.target);
  const isClickToggle = menuToggle.contains(e.target);

  if (!isClickInsideMenu && !isClickToggle) {
    menu.classList.remove("active");
  }
});
 
  

});