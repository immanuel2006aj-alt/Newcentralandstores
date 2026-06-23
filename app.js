/* =========================================================
   CENTRAL & STORES - APP.JS
   Products Grid + Price + Cart + Search + Categories
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     SETTINGS
     ========================================================= */

  const CART_KEY = "centralStoresCart";

  const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80";

  /* =========================================================
     GET PAGE ELEMENTS
     ========================================================= */

  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const productsTitle = document.getElementById("productsTitle");
  const productsEmptyState = document.getElementById("productsEmptyState");

  const productSearch = document.getElementById("productSearch");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const resetProductsBtn = document.getElementById("resetProductsBtn");

  const categoryButtons = document.querySelectorAll(".category-btn");

  const cartCount = document.getElementById("cartCount");
  const bottomCartCount = document.getElementById("bottomCartCount");

  /* =========================================================
     CHECK PRODUCTS.JS
     products.js must contain:
     const products = [ ... ];
     ========================================================= */

  if (typeof products === "undefined" || !Array.isArray(products)) {
    console.error("products.js not loaded or products array missing.");
    return;
  }

  if (!productsGrid) {
    console.error("productsGrid not found in products.html");
    return;
  }

  /* =========================================================
     CART FUNCTIONS
     ========================================================= */

  function getCart() {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Cart loading error:", error);
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function getCartTotalQuantity() {
    const cart = getCart();

    return cart.reduce(function (total, item) {
      return total + (Number(item.quantity) || 1);
    }, 0);
  }

  function updateCartBadges() {
    const totalQuantity = getCartTotalQuantity();

    if (cartCount) {
      cartCount.textContent = totalQuantity;
      cartCount.style.display = totalQuantity > 0 ? "flex" : "none";
    }

    if (bottomCartCount) {
      bottomCartCount.textContent = totalQuantity;
      bottomCartCount.style.display = totalQuantity > 0 ? "flex" : "none";
    }
  }

  function addToCart(productId, button) {
    const selectedProduct = products.find(function (product) {
      return product.id === productId;
    });

    if (!selectedProduct) return;

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
        image: selectedProduct.image || FALLBACK_IMAGE,
        quantity: 1
      });
    }

    saveCart(cart);
    updateCartBadges();

    if (button) {
      const oldContent = button.innerHTML;

      button.innerHTML = `
        <span class="add-cart-icon">✓</span>
        <span>Added</span>
      `;

      button.classList.add("added");

      setTimeout(function () {
        button.innerHTML = oldContent;
        button.classList.remove("added");
      }, 1100);
    }
  }

  /* =========================================================
     PRICE FORMAT
     ========================================================= */

  function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(price) || 0);
  }

  /* =========================================================
     PRODUCT CARD TEMPLATE
     ========================================================= */

  function productCardTemplate(product) {
    const imageUrl = product.image && product.image.trim()
      ? product.image
      : FALLBACK_IMAGE;

    return `
      <article class="product-card">

        <div class="product-image">

          <img
            src="${imageUrl}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
          >

          <button
            type="button"
            class="product-wishlist-btn"
            aria-label="Add ${product.name} to wishlist"
          >
            ♡
          </button>

        </div>

        <div class="product-details">

          <p class="product-category">
            ${product.category || "Grocery Product"}
          </p>

          <h3>${product.name}</h3>

          <p class="product-weight">
            ${product.weight || "1 Pack"}
          </p>

          <div class="product-price-wrap">
            <span class="product-price-label">PRICE</span>
            <p class="product-price">
              ${formatPrice(product.price)}
            </p>
          </div>

          <button
            type="button"
            class="add-cart-btn"
            data-product-id="${product.id}"
          >
            <span class="add-cart-icon">+</span>
            <span>Add</span>
          </button>

        </div>

      </article>
    `;
  }

  /* =========================================================
     RENDER PRODUCTS
     ========================================================= */

  function renderProducts(productList) {
    productsGrid.innerHTML = "";

    if (!productList || productList.length === 0) {
      if (productCount) {
        productCount.textContent = "0";
      }

      if (productsEmptyState) {
        productsEmptyState.hidden = false;
      }

      return;
    }

    if (productsEmptyState) {
      productsEmptyState.hidden = true;
    }

    productsGrid.innerHTML = productList
      .map(productCardTemplate)
      .join("");

    if (productCount) {
      productCount.textContent = productList.length;
    }
  }

  /* =========================================================
     CATEGORY FILTER
     ========================================================= */

  function filterByCategory(category) {
    if (!category || category === "All Products") {
      if (productsTitle) {
        productsTitle.textContent = "All Daily Essentials";
      }

      renderProducts(products);
      return;
    }

    const filteredProducts = products.filter(function (product) {
      return product.category === category;
    });

    if (productsTitle) {
      productsTitle.textContent = category;
    }

    renderProducts(filteredProducts);
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
      wishlistButton.classList.toggle("active");

      wishlistButton.textContent = wishlistButton.classList.contains("active")
        ? "♥"
        : "♡";
    }
  });

  /* =========================================================
     SEARCH
     ========================================================= */

  if (productSearch) {
    productSearch.addEventListener("input", function (event) {
      const searchValue = event.target.value.trim().toLowerCase();

      const filteredProducts = products.filter(function (product) {
        const searchableText = [
          product.name,
          product.category,
          product.weight
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchValue);
      });

      if (productsTitle) {
        productsTitle.textContent = searchValue
          ? "Search Results"
          : "All Daily Essentials";
      }

      renderProducts(filteredProducts);
    });
  }

  /* =========================================================
     SEARCH CLEAR BUTTON
     ========================================================= */

  if (searchClearBtn && productSearch) {
    searchClearBtn.addEventListener("click", function () {
      productSearch.value = "";

      if (productsTitle) {
        productsTitle.textContent = "All Daily Essentials";
      }

      renderProducts(products);
      productSearch.focus();
    });
  }

  /* =========================================================
     RESET PRODUCTS BUTTON
     ========================================================= */

  if (resetProductsBtn) {
    resetProductsBtn.addEventListener("click", function () {
      if (productSearch) {
        productSearch.value = "";
      }

      if (productsTitle) {
        productsTitle.textContent = "All Daily Essentials";
      }

      categoryButtons.forEach(function (button) {
        button.classList.remove("active");
      });

      const allProductsButton = document.querySelector(
        '.category-btn[data-category="All Products"]'
      );

      if (allProductsButton) {
        allProductsButton.classList.add("active");
      }

      renderProducts(products);
    });
  }

  /* =========================================================
     CATEGORY BUTTONS
     HTML example:
     <button class="category-btn active" data-category="All Products">
     ========================================================= */

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedCategory = button.dataset.category;

      categoryButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      if (productSearch) {
        productSearch.value = "";
      }

      filterByCategory(selectedCategory);
    });
  });

  /* =========================================================
     INITIAL LOAD
     ========================================================= */

  renderProducts(products);
  updateCartBadges();
}); in 
