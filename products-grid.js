document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const cartBadge = document.getElementById("cartCount");
  const emptyState = document.getElementById("productsEmptyState");

  if (!productsGrid) {
    console.error("productsGrid not found in products.html");
    return;
  }

  /* =========================================================
     PRODUCT DATA
     productsData + productPrices should be available
     from your products-data.js file
  ========================================================= */

  const products = (typeof productsData !== "undefined" ? productsData : []).map(
    (product) => ({
      ...product,
      price:
        typeof productPrices !== "undefined" && productPrices[product.id]
          ? productPrices[product.id]
          : product.price || 0
    })
  );

  let cart = JSON.parse(localStorage.getItem("centralStoreCart")) || [];
  let wishlist =
    JSON.parse(localStorage.getItem("centralStoreWishlist")) || [];

  /* =========================================================
     RENDER PRODUCTS
  ========================================================= */

  function renderProducts(items) {
    productsGrid.innerHTML = "";

    if (!items || items.length === 0) {
      if (emptyState) {
        emptyState.classList.add("show");
      }

      if (productCount) {
        productCount.textContent = "0";
      }

      return;
    }

    if (emptyState) {
      emptyState.classList.remove("show");
    }

    items.forEach((product) => {
      const isWishlisted = wishlist.includes(product.id);
      const imageHtml = product.image
        ? `<img src="${product.image}" alt="${product.name}" class="product-image">`
        : `<div class="no-image-placeholder"><span>NO IMAGE</span></div>`;

      const isAdded = cart.some((item) => item.id === product.id);

      productsGrid.innerHTML += `
        <article class="product-card">
          
          <div class="product-image-wrap">
            ${imageHtml}

            <button
              class="product-wishlist-btn ${isWishlisted ? "active" : ""}"
              type="button"
              data-wishlist-id="${product.id}"
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
                ₹${product.price}
              </strong>

              <button
                class="add-cart-btn ${isAdded ? "added" : ""}"
                type="button"
                data-product-id="${product.id}"
              >
                ${isAdded ? "✓ Added" : "+ Add"}
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
    const buttons = document.querySelectorAll(".add-cart-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        const product = products.find(
          (item) => String(item.id) === String(productId)
        );

        if (!product) return;

        const existingItem = cart.find(
          (item) => String(item.id) === String(productId)
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            weight: product.weight || "",
            image: product.image || "",
            quantity: 1
          });
        }

        localStorage.setItem("centralStoreCart", JSON.stringify(cart));

        button.classList.add("added");
        button.textContent = "✓ Added";

        updateCartBadge();
      });
    });
  }

  /* =========================================================
     WISHLIST
  ========================================================= */

  function bindWishlistButtons() {
    const buttons = document.querySelectorAll(".product-wishlist-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.wishlistId;

        if (wishlist.includes(productId)) {
          wishlist = wishlist.filter((id) => id !== productId);
          button.classList.remove("active");
          button.textContent = "♡";
        } else {
          wishlist.push(productId);
          button.classList.add("active");
          button.textContent = "♥";
        }

        localStorage.setItem(
          "centralStoreWishlist",
          JSON.stringify(wishlist)
        );
      });
    });
  }

  /* =========================================================
     CART BADGE
  ========================================================= */

  function updateCartBadge() {
    if (!cartBadge) return;

    const totalItems = cart.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );

    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? "flex" : "none";
  }

  /* =========================================================
     SEARCH SUPPORT
     If search page sends ?search=rice
  ========================================================= */

  function getSearchResults() {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("search");

    if (!searchTerm) return products;

    const keyword = searchTerm.toLowerCase().trim();

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(keyword) ||
        (product.category || "").toLowerCase().includes(keyword) ||
        (product.weight || "").toLowerCase().includes(keyword)
      );
    });
  }

  /* =========================================================
     START
  ========================================================= */

  const filteredProducts = getSearchResults();

  renderProducts(filteredProducts);
  updateCartBadge();
});
