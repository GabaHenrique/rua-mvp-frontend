document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", function () {

      const id = parseInt(this.dataset.id);
      const product = products.find(p => p.id === id);

      if (!product) {
        console.log("Produto não encontrado");
        return;
      }

      addToCart(product);
      window.location.href = "carrinho.html";

    });
  });

});