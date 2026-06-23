document.addEventListener("DOMContentLoaded", function () {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");

  if (!productsGrid) {
    console.log("productsGrid not found");
    return;
  }

  if (!window.products || !Array.isArray(window.products)) {
    console.log("products data not found");
    return;
  }

  const fallbackImage =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=360&q=55";

  productsGrid.innerHTML = window.products
    .map(function (product) {
      const image = product.image || fallbackImage;

      return `
        <article class="product-card">
          <div class="product-image">
            <img
              src="${image}"
              alt="${product.name}"
              loading="lazy"
              onerror="this.src='${fallbackImage}'"
            >
          </div>

          <div class="product-details">
            <p class="product-category">${product.category}</p>

            <h3>${product.name}</h3>

            <p class="product-weight">${product.weight}</p>

            <p class="product-price">₹${product.price}</p>

            <button type="button" class="add-cart-btn">
              + Add
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  if (productCount) {
    productCount.textContent = window.products.length;
  }
});
