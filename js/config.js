const API_URL = "https://backend-mvp-nodejs.onrender.com";

// Esta função agora será global e acessível pelos outros scripts
async function getProducts(category = "") {
    try {
        // Monta a URL. Se vier categoria, adiciona o parâmetro ?category=...
        const url = category 
            ? `${API_URL}/products?category=${category}` 
            : `${API_URL}/products`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        // Garante que sempre retornamos um Array para o products.js não quebrar
        return Array.isArray(data) ? data : (data.products || []);
        
    } catch (error) {
        console.error("Erro ao buscar produtos no servidor:", error);
        return []; // Retorna array vazio em caso de erro
    }
}