/* =========================================================
   CENTRAL & STORES — APP.JS
   Product Grid + Search + Category + Cart + Wishlist
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =========================================================
     SETTINGS
     ========================================================= */

  const CART_KEY = "centralStoresCart";
  const WISHLIST_KEY = "centralStoresWishlist";

  /* =========================================================
     PAGE ELEMENTS
     ========================================================= */

  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const productsTitle = document.getElementById("productsTitle");
  const productsEmpty = document.getElementById("productsEmpty");

  const productSearch = document.getElementById("productSearch");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const bottomSearchBtn = document.getElementById("bottomSearchBtn");

  const categoryButtons = document.querySelectorAll(".category-btn");
  const resetProductsBtn = document.getElementById("resetProductsBtn");

  const cartCount = document.getElementById("cartCount");
  const bottomCartCount = document.getElementById("bottomCartCount");

  /* =========================================================
     DATA SAFETY
     products.js must contain:
     window.products = [ ... ];
     ========================================================= */

  const allProducts = Array.isArray(window.products) ? window.products : [];

  if (!productsGrid) {
    console.error("productsGrid id not found in products.html");
    return;
  }

  if (allProducts.length === 0) {
    productsGrid.innerHTML = `
      <div style="
        grid-column: 1 / -1;
        padding: 22px;
        border-radius: 14px;
        background: #171717;
        color: #ffffff;
        font-weight: 700;
        text-align: center;
      ">
        Products data not found. Check products.js
      </div>
    `;
    return;
  }

  /* =========================================================
     LOCAL STORAGE — CART
     ========================================================= */

  function getCart() {
    try {
      const savedCart = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(savedCart) ? savedCart : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function getCartItemCount() {
    return getCart().reduce(function (total, item) {
      return total + (Number(item.quantity) || 1);
    }, 0);
  }

  function updateCartBadges() {
    const totalItems = getCartItemCount();

    const badgeList = [
      cartCount,
      bottomCartCount,
      ...document.querySelectorAll(".cart-badge")
    ];

    badgeList.forEach(function (badge) {
      if (!badge) return;

      badge.textContent = totalItems;

      if (totalItems > 0) {
        badge.style.display = "flex";
      } else {
        badge.style.display = "none";
      }
    });
  }

  function addToCart(productId, button) {
    const selectedProduct = allProducts.find(function (product) {
      return product.id === productId;
    });

    if (!selectedProduct) {
      alert("Product not found. Please refresh the page.");
      return;
    }

    const cart = getCart();

    const existingItem = cart.find(function (item) {
      return item.id === selectedProduct.id;
    });

    if (existingItem) {
      existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;
    } else {
      cart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        category: selectedProduct.category,
        weight: selectedProduct.weight,
        price: Number(selectedProduct.price) || 0,
        image: selectedProduct.image,
        quantity: 1
      });
    }

    saveCart(cart);
    updateCartBadges();

    if (button) {
      const oldText = button.textContent;

      button.textContent = "Added";
      button.classList.add("added");

      setTimeout(function () {
        button.textContent = oldText || "Add";
        button.classList.remove("added");
      }, 1100);
    }
  }

  /* =========================================================
     LOCAL STORAGE — WISHLIST
     ========================================================= */

  function getWishlist() {
    try {
      const savedWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY));
      return Array.isArray(savedWishlist) ? savedWishlist : [];
    } catch (error) {
      return [];
    }
  }

  function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }

  function isWishlisted(productId) {
    return getWishlist().includes(productId);
  }

  function toggleWishlist(productId, button) {
    let wishlist = getWishlist();

    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter(function (id) {
        return id !== productId;
      });

      if (button) {
        button.classList.remove("active");
        button.textContent = "♡";
      }
    } else {
      wishlist.push(productId);

      if (button) {
        button.classList.add("active");
        button.textContent = "♥";
      }
    }

    saveWishlist(wishlist);
  }

  /* =========================================================
     PRICE FORMAT
     ========================================================= */

  function formatPrice(price) {
    const numericPrice = Number(price) || 0;

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(numericPrice);
  }

  /* =========================================================
     PRODUCT CARD TEMPLATE
     ========================================================= */

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function productCardTemplate(product) {
    const productName = escapeHtml(product.name);
    const productCategory = escapeHtml(product.category);
    const productWeight = escapeHtml(product.weight);

    const productImage =
      product.image ||
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";

    const liked = isWishlisted(product.id);

    return `
      <article class="product-card">
        <div class="product-image">
          <img
            src="${productImage}"
            alt="${productName}"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'"
          >

          <button
            type="button"
            class="product-wishlist-btn ${liked ? "active" : ""}"
            data-product-id="${product.id}"
            aria-label="Add ${productName} to wishlist"
          >
            ${liked ? "♥" : "♡"}
          </button>
        </div>

        <div class="product-details">
          <p class="product-category">${productCategory}</p>

          <h3>${productName}</h3>

          <p class="product-weight">${productWeight}</p>

          <div class="product-price-wrap">
            <span class="product-price-label">STORE PRICE</span>
            <p class="product-price">${formatPrice(product.price)}</p>
          </div>

          <button
            type="button"
            class="add-cart-btn"
            data-product-id="${product.id}"
            aria-label="Add ${productName} to cart"
          >
            Add
          </button>
        </div>
      </article>
    `;
  }

  /* =========================================================
     RENDER PRODUCTS
     ========================================================= */

  function renderProducts(productList, titleText) {
    productsGrid.innerHTML = "";

    if (!productList || productList.length === 0) {
      if (productCount) {
        productCount.textContent = "0";
      }

      if (productsTitle && titleText) {
        productsTitle.textContent = titleText;
      }

      if (productsEmpty) {
        productsEmpty.hidden = false;
      }

      return;
    }

    if (productsEmpty) {
      productsEmpty.hidden = true;
    }

    productsGrid.innerHTML = productList
      .map(productCardTemplate)
      .join("");

    if (productCount) {
      productCount.textContent = productList.length;
    }

    if (productsTitle && titleText) {
      productsTitle.textContent = titleText;
    }
  }

  /* =========================================================
     FILTER + SEARCH
     ========================================================= */

  let activeCategory = "All Products";
  let currentSearch = "";

  function getFilteredProducts() {
    return allProducts.filter(function (product) {
      const categoryMatch =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      const searchableText = [
        product.name,
        product.category,
        product.weight
      ]
        .join(" ")
        .toLowerCase();

      const searchMatch = searchableText.includes(
        currentSearch.toLowerCase()
      );

      return categoryMatch && searchMatch;
    });
  }

  function getTitleText() {
    if (currentSearch.trim()) {
      return "Search Results";
    }

    if (activeCategory !== "All Products") {
      return activeCategory;
    }

    return "All Daily Essentials";
  }

  function applyFilters() {
    renderProducts(getFilteredProducts(), getTitleText());
  }

  /* =========================================================
     PRODUCT GRID CLICK EVENTS
     ========================================================= */

  productsGrid.addEventListener("click", function (event) {
    const addButton = event.target.closest(".add-cart-btn");

    if (addButton) {
      addToCart(addButton.dataset.productId, addButton);
      return;
    }

    const wishlistButton = event.target.closest(".product-wishlist-btn");

    if (wishlistButton) {
      toggleWishlist(
        wishlistButton.dataset.productId,
        wishlistButton
      );
    }
  });

  /* =========================================================
     CATEGORY BUTTONS
     category button must have:
     class="category-btn"
     data-category="Rice & Flours"
     ========================================================= */

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedCategory =
        button.dataset.category || button.textContent.trim();

      activeCategory = selectedCategory;
      currentSearch = "";

      if (productSearch) {
        productSearch.value = "";
      }

      categoryButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      applyFilters();
    });
  });

  /* =========================================================
     SEARCH
     ========================================================= */

  if (productSearch) {
    productSearch.addEventListener("input", function (event) {
      currentSearch = event.target.value.trim();
      applyFilters();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", function () {
      currentSearch = "";

      if (productSearch) {
        productSearch.value = "";
        productSearch.focus();
      }

      applyFilters();
    });
  }

  if (bottomSearchBtn) {
    bottomSearchBtn.addEventListener("click", function () {
      if (productSearch) {
        window.scrollTo({
          top: productSearch.getBoundingClientRect().top + window.scrollY - 100,
          behavior: "smooth"
        });

        setTimeout(function () {
          productSearch.focus();
        }, 450);
      }
    });
  }

  /* =========================================================
     RESET PRODUCTS BUTTON
     ========================================================= */

  if (resetProductsBtn) {
    resetProductsBtn.addEventListener("click", function () {
      activeCategory = "All Products";
      currentSearch = "";

      if (productSearch) {
        productSearch.value = "";
      }

      categoryButtons.forEach(function (button) {
        button.classList.remove("active");

        const buttonCategory =
          button.dataset.category || button.textContent.trim();

        if (buttonCategory === "All Products") {
          button.classList.add("active");
        }
      });

      applyFilters();
    });
  }

  /* =========================================================
     INITIAL LOAD
     ========================================================= */

  renderProducts(allProducts, "All Daily Essentials");
  updateCartBadges();
});
