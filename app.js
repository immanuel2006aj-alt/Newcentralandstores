/* =========================================================
   CENTRAL & STORES - APP.JS
   Product Grid + Search + Category + Cart
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     SETTINGS
  ========================================================= */

  const CART_KEY = "centralStoresCart";

  /* =========================================================
     PAGE ELEMENTS
  ========================================================= */

  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const productsTitle = document.getElementById("productsTitle");
  const productsEmpty = document.getElementById("productsEmptyState");

  const productSearch = document.getElementById("productSearch");
  const searchClearBtn = document.getElementById("searchClearBtn");

  const categoryButtons = document.querySelectorAll(".category-btn");
  const resetProductsBtn = document.getElementById("resetProductsBtn");

  const cartBadges = document.querySelectorAll(
    "#cartCount, #bottomCartCount, .cart-badge"
  );

  /* =========================================================
     SAFETY CHECK
  ========================================================= */

  if (!productsGrid) {
    console.log("Products grid not found. Check id='productsGrid' in products.html");
    return;
  }

  if (typeof products === "undefined" || !Array.isArray(products)) {
    console.log("Products data not found. Check products.js file.");
    return;
  }

  /* =========================================================
     STATE
  ========================================================= */

  let activeCategory = "All Products";
  let searchText = "";

  /* =========================================================
     CART FUNCTIONS
  ========================================================= */

  function getCart() {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.log("Cart loading error:", error);
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function getCartTotalQuantity() {
    const cart = getCart();

    return cart.reduce(function (total, item) {
      return total + (Number(item.quantity) || 0);
    }, 0);
  }

  function updateCartBadges() {
    const totalItems = getCartTotalQuantity();

    cartBadges.forEach(function (badge) {
      badge.textContent = totalItems;
    });
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
        price: selectedProduct.price,
        image: selectedProduct.image,
        quantity: 1
      });
    }

    saveCart(cart);
    updateCartBadges();

    if (button) {
      const originalText = button.innerHTML;

      button.innerHTML = "Added";
      button.classList.add("added");

      setTimeout(function () {
        button.innerHTML = originalText;
        button.classList.remove("added");
      }, 1000);
    }
  }

  /* =========================================================
     PRODUCT CARD TEMPLATE
  ========================================================= */

  function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(price) || 0);
  }

  function productCardTemplate(product) {
    const safeImage =
      product.image && product.image.trim() !== ""
        ? product.image
        : "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80";

    return `
      <article class="product-card">
        <div class="product-image">
          <img
            src="${safeImage}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'"
          >

          <button
            type="button"
            class="product-wishlist-btn"
            aria-label="Save ${product.name}"
          >♡</button>
        </div>

        <div class="product-details">
          <span class="product-category">${product.category}</span>

          <h3>${product.name}</h3>

          <p class="product-weight">${product.weight}</p>

          <div class="product-card-bottom">
            <strong class="product-price">${formatPrice(product.price)}</strong>

            <button
              type="button"
              class="add-cart-btn"
              data-product-id="${product.id}"
              aria-label="Add ${product.name} to cart"
            >Add</button>
          </div>
        </div>
      </article>
    `;
  }

  /* =========================================================
     FILTER FUNCTIONS
  ========================================================= */

  function getFilteredProducts() {
    return products.filter(function (product) {
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

      const searchMatch = searchableText.includes(searchText.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }

  function renderProducts(productList) {
    productsGrid.innerHTML = "";

    if (!productList || productList.length === 0) {
      if (productCount) productCount.textContent = "0";

      if (productsEmpty) {
        productsEmpty.hidden = false;
      }

      return;
    }

    if (productsEmpty) {
      productsEmpty.hidden = true;
    }

    productsGrid.innerHTML = productList
      .map(function (product) {
        return productCardTemplate(product);
      })
      .join("");

    if (productCount) {
      productCount.textContent = productList.length;
    }
  }

  function refreshProducts() {
    const filteredProducts = getFilteredProducts();

    renderProducts(filteredProducts);

    if (productsTitle) {
      if (activeCategory === "All Products") {
        productsTitle.textContent = "All Daily Essentials";
      } else {
        productsTitle.textContent = activeCategory;
      }
    }
  }

  /* =========================================================
     PRODUCT GRID EVENTS
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

      if (wishlistButton.classList.contains("active")) {
        wishlistButton.textContent = "♥";
      } else {
        wishlistButton.textContent = "♡";
      }
    }
  });

  /* =========================================================
     SEARCH EVENTS
  ========================================================= */

  if (productSearch) {
    productSearch.addEventListener("input", function (event) {
      searchText = event.target.value.trim();

      if (searchClearBtn) {
        searchClearBtn.hidden = searchText.length === 0;
      }

      refreshProducts();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", function () {
      searchText = "";

      if (productSearch) {
        productSearch.value = "";
        productSearch.focus();
      }

      searchClearBtn.hidden = true;

      refreshProducts();
    });
  }

  /* =========================================================
     CATEGORY BUTTON EVENTS
  ========================================================= */

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeCategory = button.dataset.category || button.textContent.trim();

      categoryButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      refreshProducts();
    });
  });

  /* =========================================================
     RESET PRODUCTS BUTTON
  ========================================================= */

  if (resetProductsBtn) {
    resetProductsBtn.addEventListener("click", function () {
      activeCategory = "All Products";
      searchText = "";

      if (productSearch) {
        productSearch.value = "";
      }

      if (searchClearBtn) {
        searchClearBtn.hidden = true;
      }

      categoryButtons.forEach(function (button) {
        const categoryName =
          button.dataset.category || button.textContent.trim();

        button.classList.remove("active");

        if (categoryName === "All Products") {
          button.classList.add("active");
        }
      });

      refreshProducts();
    });
  }

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  refreshProducts();
  updateCartBadges();
});
