document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const cartBadge = document.getElementById("cartCount");

  if (!productsGrid) return;

  /* =====================================================
     PRODUCTS DATA MERGE
     productsData  -> products-name.js
     productPrices -> price.js
  ===================================================== */

  const products = (typeof productsData !== "undefined" ? productsData : []).map((product) => {
    return {
      ...product,
      price:
        typeof productPrices !== "undefined" && productPrices[product.id]
          ? productPrices[product.id]
          : product.price || 0,
    };
  });

  /* =====================================================
     CART STORAGE
  ===================================================== */

  let cart = JSON.parse(localStorage.getItem("centralStoreCart")) || [];

  function saveCart() {
    localStorage.setItem("centralStoreCart", JSON.stringify(cart));
  }

  function updateCartBadge() {
    const totalItems = cart.reduce((total, item) => total + item.qty, 0);

    if (cartBadge) {
      cartBadge.textContent = totalItems;
    }
  }

  /* =====================================================
     RENDER PRODUCTS
  ===================================================== */

  function renderProducts(items) {
    productsGrid.innerHTML = "";

    if (!items || items.length === 0) {
      productsGrid.innerHTML = `
        <div class="products-empty-state show">
          <div class="empty-icon">⌕</div>
          <h3>No products found</h3>
          <p>Try another category or search word.</p>
        </div>
      `;

      if (productCount) {
        productCount.textContent = "0";
      }

      return;
    }

    items.forEach((product) => {
      const price = Number(product.price || 0);

      productsGrid.innerHTML += `
        <article class="product-card">
          
          <div class="product-image-wrap">
            <div class="no-image-placeholder">
              <span>NO IMAGE</span>
            </div>

            <button
              class="product-wishlist-btn"
              type="button"
              data-id="${product.id}"
              aria-label="Add ${product.name} to wishlist"
            >
              ♡
            </button>
          </div>

          <div class="product-details">
            <span class="product-category">
              ${product.category || "Daily Essentials"}
            </span>

            <h3 class="product-name">
              ${product.name}
            </h3>

            <span class="product-weight">
              ${product.weight || ""}
            </span>

            <div class="product-footer">
              <strong class="product-price">
                ₹${price}
              </strong>

              <button
                class="add-cart-btn"
                type="button"
                data-id="${product.id}"
              >
                <span>+</span> Add
              </button>
            </div>
          </div>

        </article>
      `;
    });

    if (productCount) {
      productCount.textContent = items.length;
    }

    bindCartButtons();
    bindWishlistButtons();
  }

  /* =====================================================
     ADD TO CART
  ===================================================== */

  function bindCartButtons() {
    const addButtons = document.querySelectorAll(".add-cart-btn");

    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;

        const product = products.find(
          (item) => String(item.id) === String(productId)
        );

        if (!product) return;

        const alreadyInCart = cart.find(
          (item) => String(item.id) === String(productId)
        );

        if (alreadyInCart) {
          alreadyInCart.qty += 1;
        } else {
          cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            weight: product.weight,
            price: Number(product.price || 0),
            qty: 1,
          });
        }

        saveCart();
        updateCartBadge();

        button.classList.add("added");
        button.innerHTML = "✓ Added";

        setTimeout(() => {
          button.classList.remove("added");
          button.innerHTML = "<span>+</span> Add";
        }, 900);
      });
    });
  }

  /* =====================================================
     WISHLIST BUTTON
  ===================================================== */

  function bindWishlistButtons() {
    const wishlistButtons = document.querySelectorAll(".product-wishlist-btn");

    wishlistButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");

        if (button.classList.contains("active")) {
          button.innerHTML = "♥";
        } else {
          button.innerHTML = "♡";
        }
      });
    });
  }

  /* =====================================================
     SEARCH SUPPORT
     If products.html has search input with id="productSearch"
  ===================================================== */

  const productSearch = document.getElementById("productSearch");

  if (productSearch) {
    productSearch.addEventListener("input", (event) => {
      const searchText = event.target.value.toLowerCase().trim();

      const filteredProducts = products.filter((product) => {
        const name = (product.name || "").toLowerCase();
        const category = (product.category || "").toLowerCase();

        return name.includes(searchText) || category.includes(searchText);
      });

      renderProducts(filteredProducts);
    });
  }

  /* =====================================================
     CATEGORY FILTER SUPPORT
     If buttons have class="category-filter"
     Example: data-category="Rice & Flours"
  ===================================================== */

  const categoryButtons = document.querySelectorAll(".category-filter");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.category;

      categoryButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      if (!selectedCategory || selectedCategory === "All") {
        renderProducts(products);
        return;
      }

      const filteredProducts = products.filter((product) => {
        return product.category === selectedCategory;
      });

      renderProducts(filteredProducts);
    });
  });

  /* =====================================================
     FIRST LOAD
  ===================================================== */

  renderProducts(products);
  updateCartBadge();
});
