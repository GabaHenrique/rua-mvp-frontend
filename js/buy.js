function setupBuyButtons(products, redirectToCart = true) {
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
      updateCartCount();

      if (redirectToCart) {
        window.location.href = "carrinho.html";
      } else {
        alert(`${product.name} foi adicionado ao carrinho!`);
      }
    });
  });
}