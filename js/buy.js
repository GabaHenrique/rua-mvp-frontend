function setupBuyButtons(products, redirectToCart = false) {
  const buttons = document.querySelectorAll(".buy-btn");

if (!buttons.length) {
    console.warn("Nenhum botão .buy-btn encontrado.");
    return;
  }


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
      } 
    });
  });
}