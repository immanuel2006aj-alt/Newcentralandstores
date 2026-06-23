"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const productSearch = document.getElementById("productSearch");
  const productsEmpty = document.getElementById("productsEmpty");

  const CART_KEY = "centralStoresCart";

  if (!productsGrid) {
    console.error("productsGrid not found in products.html");
    return;
  }

  if (typeof products === "undefined") {
    console.error("products array not found. Check products.js loading first.");
    return;
  }

  function getCart() {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function updateCartBadges() {
    const cart = getCart();

    const totalItems = cart.reduce((total, item) => {
      return total + Number(item.quantity || 1);
    }, 0);

    document.querySelectorAll("#cartCount, #bottomCartCount").forEach((badge) => {
      badge.textContent = totalItems;
    });
  }

  function productCardTemplate(product) {
    return `
      <article class="product-card">
        <div class="product-image-wrap">
          <img
            src="${product.image || DEFAULT_IMAGE}"
            alt="${product.name}"
            class="product-image"
            loading="lazy"
            onerror="this.src='${DEFAULT_IMAGE}'"
          >
        </div>

        <div class="product-card-content">
          <p class="product-category">${product.category}</p>

          <h3 class="product-name">${product.name}</h3>

          <p class="product-unit">${product.weight}</p>

          <div class="product-card-bottom">
            <strong class="product-price">₹${product.price}</strong>

            <button
              type="button"
              class="add-to-cart-btn"
              data-product-id="${product.id}"
            >
              <span>+</span> Add
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderProducts(productList) {
    if (!productList || productList.length === 0) {
      productsGrid.innerHTML = "";

      if (productCount) {
        productCount.textContent = "0";
      }

      if (productsEmpty) {
        productsEmpty.hidden = false;
      }

      return;
    }

    productsGrid.innerHTML = productList
      .map(productCardTemplate)
      .join("");

    if (productCount) {
      productCount.textContent = productList.length;
    }

    if (productsEmpty) {
      productsEmpty.hidden = true;
    }
  }

  function addToCart(productId, button) {
    const selectedProduct = products.find((product) => {
      return product.id === productId;
    });

    if (!selectedProduct) return;

    const cart = getCart();

    const existingItem = cart.find((item) => {
      return item.id === selectedProduct.id;
    });

    if (existingItem) {
      existingItem.quantity = Number(existingItem.quantity || 1) + 1;
    } else {
      cart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        category: selectedProduct.category,
        weight: selectedProduct.weight,
        price: selectedProduct.price,
        image: selectedProduct.image || DEFAULT_IMAGE,
        quantity: 1
      });
    }

    saveCart(cart);
    updateCartBadges();

    if (button) {
      button.innerHTML = "✓ Added";
      button.classList.add("added");

      setTimeout(() => {
        button.innerHTML = "<span>+</span> Add";
        button.classList.remove("added");
      }, 1000);
    }
  }

  productsGrid.addEventListener("click", (event) => {
    const addButton = event.target.closest(".add-to-cart-btn");

    if (!addButton) return;

    addToCart(addButton.dataset.productId, addButton);
  });

  if (productSearch) {
    productSearch.addEventListener("input", () => {
      const searchText = productSearch.value.toLowerCase().trim();

      const filteredProducts = products.filter((product) => {
        const productText = [
          product.name,
          product.category,
          product.weight
        ]
          .join(" ")
          .toLowerCase();

        return productText.includes(searchText);
      });

      renderProducts(filteredProducts);
    });
  }

  renderProducts(products);
  updateCartBadges();
});
