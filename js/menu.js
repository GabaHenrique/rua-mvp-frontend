    document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

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

    });

    