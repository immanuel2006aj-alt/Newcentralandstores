document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");

  if (!productsGrid) {
    console.log("productsGrid not found");
    return;
  }

  // productsData not loaded na page crash aagama iruka
  if (typeof productsData === "undefined" || !Array.isArray(productsData)) {
    console.log("productsData missing. Check products-data.js file.");
    productsGrid.innerHTML = `
      <div class="products-empty-state show">
        <div class="empty-icon">!</div>
        <h3>Products loading issue</h3>
        <p>products-data.js file load aagala.</p>
      </div>
    `;
    if (productCount) productCount.textContent = "0 PRODUCTS";
    return;
  }

  function renderProducts(items) {
    productsGrid.innerHTML = "";

    if (!items.length) {
      productsGrid.innerHTML = `
        <div class="products-empty-state show">
          <div class="empty-icon">⌕</div>
          <h3>No products found</h3>
          <p>Try another category or search word.</p>
        </div>
      `;
      if (productCount) productCount.textContent = "0 PRODUCTS";
      return;
    }

    items.forEach((product) => {
  const price = productPrices[product.id] ?? 0;

      productsGrid.innerHTML += `
        <article class="product-card">
          <div class="product-image-wrap">
            <div class="no-image-placeholder">
              <span>NO IMAGE</span>
            </div>

            <button
              class="product-wishlist-btn"
              type="button"
              aria-label="Add ${product.name} to wishlist"
            >♡</button>
          </div>

          <div class="product-details">
            <span class="product-category">${product.category}</span>

            <h3 class="product-name">${product.name}</h3>

            <span class="product-weight">${product.weight}</span>

            <div class="product-footer">
              <strong class="product-price">₹${price}</strong>

              <button
                class="add-cart-btn"
                type="button"
                data-id="${product.id}"
              >+ Add</button>
            </div>
          </div>
        </article>
      `;
    });

    if (productCount) {
      productCount.textContent = `${items.length} PRODUCTS`;
    }
  }

  renderProducts(productsData);
const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.category;

    // Active button change
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter products
    if (selectedCategory === "All Products") {
      renderProducts(productsData);
    } else {
      const filteredProducts = productsData.filter((product) => {
        return product.category === selectedCategory;
      });

      renderProducts(filteredProducts);
    }
  });
});
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".add-cart-btn");

    if (!button) return;

    const id = button.dataset.id;

    const product = productsData.find(
      (item) => String(item.id) === String(id)
    );

    if (!product) return;

    const price = productPrices[product.id] ?? 0;
  
    if (typeof addProductToCart === "function") {
      addProductToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        weight: product.weight,
        price: price
      });
    } else {
      console.log("addProductToCart missing. cart-common.js check pannu.");
    }

    const oldText = button.innerHTML;

    button.classList.add("added");
    button.innerHTML = "✓ Added";

    setTimeout(() => {
      button.classList.remove("added");
      button.innerHTML = oldText;
    }, 900);
  });
});
