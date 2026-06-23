/* =========================================================
   CENTRAL & STORES - APP.JS
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const CART_KEY = "centralStoresCart";

  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const productsEmpty = document.getElementById("productsEmptyState");
  const productSearch = document.getElementById("productSearch");
  const productsTitle = document.getElementById("productsTitle");
  const resetProductsBtn = document.getElementById("resetProductsBtn");
  const categoryButtons = document.querySelectorAll(".category-btn");

  /* ---------------------------------------------------------
     IMPORTANT:
     products.js must load before app.js
     --------------------------------------------------------- */

  const productData =
    typeof window.products !== "undefined" && Array.isArray(window.products)
      ? window.products
      : [];

  if (!productsGrid) {
    console.error("productsGrid ID missing in products.html");
    return;
  }

  if (productData.length === 0) {
    productsGrid.innerHTML = `
      <div style="
        grid-column:1/-1;
        background:#fff;
        border:1px solid #e9e4d9;
        border-radius:16px;
        padding:25px;
        text-align:center;
      ">
        <h3 style="margin:0 0 10px;">Products not loading</h3>
        <p style="margin:0;color:#777;">
          Check products.js and script order.
        </p>
      </div>
    `;

    if (productCount) productCount.textContent = "0";
    return;
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function formatPrice(price) {
    const amount = Number(price) || 0;

    return "₹" + amount.toLocaleString("en-IN");
  }

  function updateCartBadges() {
    const cart = getCart();

    const totalItems = cart.reduce(function (total, item) {
      return total + (Number(item.quantity) || 1);
    }, 0);

    const badges = document.querySelectorAll(
      "#cartCount, #bottomCartCount, .cart-badge"
    );

    badges.forEach(function (badge) {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? "flex" : "none";
    });
  }

  function productCardTemplate(product) {
  const price = Number(product.price || 0);

  return `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        <button
          type="button"
          class="product-wishlist-btn"
          aria-label="Add ${product.name} to wishlist"
        >♡</button>
      </div>

      <div class="product-details">
        <p class="product-category">${product.category}</p>

        <h3>${product.name}</h3>

        <p class="product-weight">${product.weight}</p>

        <div class="product-price-wrap">
          <span class="product-price-label">PRICE</span>
          <p class="product-price">₹${price}</p>
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

  function renderProducts(list) {
    productsGrid.innerHTML = "";

    if (!list || list.length === 0) {
      if (productCount) productCount.textContent = "0";

      if (productsEmpty) {
        productsEmpty.hidden = false;
      }

      return;
    }

    if (productsEmpty) {
      productsEmpty.hidden = true;
    }

    productsGrid.innerHTML = list.map(productCardTemplate).join("");

    if (productCount) {
      productCount.textContent = list.length;
    }
  }

  function addToCart(productId, button) {
    const selectedProduct = productData.find(function (product) {
      return String(product.id) === String(productId);
    });

    if (!selectedProduct) return;

    const cart = getCart();

    const existingItem = cart.find(function (item) {
      return String(item.id) === String(selectedProduct.id);
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
      const oldHTML = button.innerHTML;

      button.innerHTML = `
        <span class="add-cart-icon">✓</span>
        <span>Added</span>
      `;

      button.classList.add("added");

      setTimeout(function () {
        button.innerHTML = oldHTML;
        button.classList.remove("added");
      }, 1000);
    }
  }

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

  if (productSearch) {
    productSearch.addEventListener("input", function (event) {
      const value = event.target.value.trim().toLowerCase();

      const filtered = productData.filter(function (product) {
        const text = [
          product.name,
          product.category,
          product.weight
        ]
          .join(" ")
          .toLowerCase();

        return text.includes(value);
      });

      if (productsTitle) {
        productsTitle.textContent = value
          ? "Search Results"
          : "All Daily Essentials";
      }

      renderProducts(filtered);
    });
  }

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const category = button.dataset.category || "All Products";

      categoryButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      if (productSearch) {
        productSearch.value = "";
      }

      if (category === "All Products") {
        if (productsTitle) {
          productsTitle.textContent = "All Daily Essentials";
        }

        renderProducts(productData);
        return;
      }

      const filtered = productData.filter(function (product) {
        return product.category === category;
      });

      if (productsTitle) {
        productsTitle.textContent = category;
      }

      renderProducts(filtered);
    });
  });

  if (resetProductsBtn) {
    resetProductsBtn.addEventListener("click", function () {
      if (productSearch) {
        productSearch.value = "";
      }

      if (productsTitle) {
        productsTitle.textContent = "All Daily Essentials";
      }

      renderProducts(productData);
    });
  }

  renderProducts(productData);
  updateCartBadges();
});
