document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const cartBadge = document.getElementById("cartCount");

  if (!productsGrid) return;

  /* =========================================================
     PRODUCTS + PRICES MERGE
     productsData -> products-name.js
     productPrices -> price.js
  ========================================================= */
  const products = productsData.map((product) => ({
    ...product,
    price: productPrices[product.id] || 0
  }));

  /* =========================================================
     RENDER PREMIUM 2 COLUMN PRODUCT GRID
  ========================================================= */
  function renderProducts(items) {
    productsGrid.innerHTML = "";

    if (!items.length) {
      productsGrid.innerHTML = `
        <div class="mini-empty-state">
          <strong>No products found</strong>
          <span>Try another category or search word.</span>
        </div>
      `;

      if (productCount) {
        productCount.textContent = "0";
      }

      return;
    }

    items.forEach((product) => {
      productsGrid.innerHTML += `
        <article class="mini-product-card">
          <div class="mini-product-image">
            <div class="mini-no-image">
              <span>NO IMAGE</span>
            </div>

            <button
              class="mini-wishlist-btn"
              type="button"
              data-id="${product.id}"
              aria-label="Add ${product.name} to wishlist"
            >
              ♡
            </button>
          </div>

          <div class="mini-product-details">
            <span class="mini-product-category">
              ${product.category}
            </span>

            <h3 class="mini-product-name">
              ${product.name}
            </h3>

            <span class="mini-product-weight">
              ${product.weight || ""}
            </span>

            <div class="mini-product-bottom">
              <strong class="mini-product-price">
                ₹${product.price}
              </strong>

              <button
                class="mini-add-btn"
                type="button"
                data-id="${product.id}"
              >
                + Add
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

  /* =========================================================
     ADD TO CART
  ========================================================= */
  function bindCartButtons() {
    const addButtons = document.querySelectorAll(".mini-add-btn");

    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;
        addToCart(productId);

        button.classList.add("added");
        button.innerHTML = "✓ Added";

        setTimeout(() => {
          button.classList.remove("added");
          button.innerHTML = "+ Add";
        }, 1200);
      });
    });
  }

  /* =========================================================
     CART STORAGE
  ========================================================= */
  function addToCart(productId) {
    const selectedProduct = products.find(
      (product) => String(product.id) === String(productId)
    );

    if (!selectedProduct) return;

    let cart = JSON.parse(localStorage.getItem("centralStoreCart")) || [];

    const existingItem = cart.find(
      (item) => String(item.id) === String(productId)
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...selectedProduct,
        quantity: 1
      });
    }

    localStorage.setItem("centralStoreCart", JSON.stringify(cart));

    updateCartBadge();
  }

  /* =========================================================
     WISHLIST
  ========================================================= */
  function bindWishlistButtons() {
    const wishlistButtons = document.querySelectorAll(".mini-wishlist-btn");

    wishlistButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;

        button.classList.toggle("active");

        if (button.classList.contains("active")) {
          button.innerHTML = "♥";
          saveWishlist(productId);
        } else {
          button.innerHTML = "♡";
          removeWishlist(productId);
        }
      });
    });
  }

  function saveWishlist(productId) {
    let wishlist = JSON.parse(
      localStorage.getItem("centralStoreWishlist")
    ) || [];

    if (!wishlist.includes(String(productId))) {
      wishlist.push(String(productId));
    }

    localStorage.setItem(
      "centralStoreWishlist",
      JSON.stringify(wishlist)
    );
  }

  function removeWishlist(productId) {
    let wishlist = JSON.parse(
      localStorage.getItem("centralStoreWishlist")
    ) || [];

    wishlist = wishlist.filter(
      (id) => String(id) !== String(productId)
    );

    localStorage.setItem(
      "centralStoreWishlist",
      JSON.stringify(wishlist)
    );
  }

  /* =========================================================
     CART BADGE UPDATE
  ========================================================= */
  function updateCartBadge() {
    if (!cartBadge) return;

    const cart = JSON.parse(localStorage.getItem("centralStoreCart")) || [];

    const totalItems = cart.reduce((total, item) => {
      return total + (item.quantity || 0);
    }, 0);

    cartBadge.textContent = totalItems;
  }

  /* =========================================================
     INITIAL LOAD
  ========================================================= */
  renderProducts(products);
  updateCartBadge();
});
