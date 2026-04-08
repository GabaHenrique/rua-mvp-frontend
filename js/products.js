//  busca produtos do backend
async function getProducts() {
  const response = await fetch("http://localhost:4000/products?category=cubos");
  
  if (!response.ok) {

    throw new Error("Erro ao buscar produtos");
  }

  return await response.json();
}

// 🔥 filtra por categoria
function filterByCategory(products, category) {
  return products.filter(p => p.category === category);
}