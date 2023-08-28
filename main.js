const URL = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", async () => {
    const infoContainer = document.getElementById("info");
    const rangeFilterCount = document.getElementById("rangeFilterCount");
    const clearRangeFilter = document.getElementById("clearRangeFilter");
    const rangeFilterCountMin = document.getElementById("rangeFilterCountMin");
    const rangeFilterCountMax = document.getElementById("rangeFilterCountMax");
  
    let productsData = []; // Almacenará los productos obtenidos de la API
  
    // Función para mostrar los productos en el contenedor
    function displayProducts(products) {
      infoContainer.innerHTML = "";
  
      products.forEach(product => {
        infoContainer.innerHTML += `
          <div class="list-group-item">
            <h5>${product.title}</h5>
            <p>Precio: $${product.price}</p>
            <p>Cantidad: ${product.quantity}</p>
          </div>
        `;
      });
    }
  
    // Función para obtener los productos de la API
    async function fetchProducts() {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        productsData = data;
        displayProducts(productsData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }
  
    // Filtrar productos por rango de cantidad
    rangeFilterCount.addEventListener("click", () => {
      const minCount = parseFloat(rangeFilterCountMin.value) || 0;
      const maxCount = parseFloat(rangeFilterCountMax.value) || Infinity;
  
      const filteredProducts = productsData.filter(product => {
        return product.quantity >= minCount && product.quantity <= maxCount;
      });
  
      displayProducts(filteredProducts);
    });
  
    // Limpiar filtro y mostrar todos los productos
    clearRangeFilter.addEventListener("click", () => {
      rangeFilterCountMin.value = "";
      rangeFilterCountMax.value = "";
      displayProducts(productsData);
    });
  
    // Obtener productos al cargar la página
    await fetchProducts();
  });