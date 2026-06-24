document.addEventListener("DOMContentLoaded", function () {
  const products = Array.isArray(window.products) ? window.products : [];

  const grid = document.getElementById("productsGrid");
  const count = document.getElementById("productCount");
  const emptyState = document.getElementById("productsEmptyState");
  const CART_KEY = "centralStoresCart";

  if (!grid) {
    console.log("productsGrid not found");
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

  function updateCartCount() {
    const cart = getCart();

    const total = cart.reduce(function (sum, item) {
      return sum + (Number(item.quantity) || 1);
    }, 0);

    const bottomCartCount = document.getElementById("bottomCartCount");

    if (bottomCartCount) {
      bottomCartCount.textContent = total;
    }
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function createProductCard(product) {
    const safeName = escapeHtml(product.name);
    const safeCategory = escapeHtml(product.category);
    const safeWeight = escapeHtml(product.weight);
    const safeImage = escapeHtml(product.image);

    return `
      <article class="premium-product-card">
        <div class="premium-product-image">
          <img src="${safeImage}" alt="${safeName}" loading="lazy">

          <button
            type="button"
            class="premium-wishlist-btn"
            aria-label="Add ${safeName} to wishlist"
          >♡</button>
        </div>

        <div class="premium-product-content">
          <p class="premium-product-category">${safeCategory}</p>

          <h3 class="premium-product-name">${safeName}</h3>

          <p class="premium-product-weight">${safeWeight}</p>

          <div class="premium-product-price">
            ₹${product.price}
          </div>

          <button
            type="button"
            class="premium-add-btn"
            data-product-id="${product.id}"
          >
            <span class="premium-add-icon">+</span>
            <span>Add to Cart</span>
          </button>
        </div>
      </article>
    `;
  }

  function renderProducts(list) {
    const productList = Array.isArray(list) ? list : [];

    if (count) {
      count.textContent = productList.length;
    }

    if (productList.length === 0) {
      grid.innerHTML = "";

      if (emptyState) {
        emptyState.hidden = false;
      }

      return;
    }

    if (emptyState) {
      emptyState.hidden = true;
    }

    grid.innerHTML = productList.map(createProductCard).join("");
  }

  function addToCart(productId, button) {
    const product = products.find(function (item) {
      return item.id === productId;
    });

    if (!product) return;

    const cart = getCart();

    const existing = cart.find(function (item) {
      return item.id === product.id;
    });

    if (existing) {
      existing.quantity = (Number(existing.quantity) || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        weight: product.weight,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    saveCart(cart);
    updateCartCount();

    if (button) {
      const original = button.innerHTML;

      button.innerHTML = `
        <span class="premium-add-icon">✓</span>
        <span>Added</span>
      `;

      button.classList.add("is-added");

      setTimeout(function () {
        button.innerHTML = original;
        button.classList.remove("is-added");
      }, 900);
    }
  }

  grid.addEventListener("click", function (event) {
    const addButton = event.target.closest(".premium-add-btn");

    if (addButton) {
      addToCart(addButton.dataset.productId, addButton);
      return;
    }

    const wishlistButton = event.target.closest(".premium-wishlist-btn");

    if (wishlistButton) {
      wishlistButton.classList.toggle("is-active");

      wishlistButton.textContent = wishlistButton.classList.contains("is-active")
        ? "♥"
        : "♡";
    }
  });

  renderProducts(products);
  updateCartCount();
});
// MENU TEST
const openMenuBtn = document.getElementById("openMenu");

if (openMenuBtn) {
  openMenuBtn.addEventListener("click", () => {
    alert("MENU BUTTON WORKING");
  });
}
