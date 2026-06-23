document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const productsEmpty = document.getElementById("productsEmptyState");

  const CART_KEY = "centralStoresCart";
  const products = Array.isArray(window.products) ? window.products : [];

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

    const totalItems = cart.reduce((total, item) => {
      return total + (Number(item.quantity) || 1);
    }, 0);

    const cartCount = document.getElementById("bottomCartCount");

    if (cartCount) {
      cartCount.textContent = totalItems;
    }
  }

  function productCardTemplate(product) {
    const price = Number(product.price);

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
            aria-label="Wishlist"
          >♡</button>
        </div>

        <div class="product-details">
          <p class="product-category">${product.category}</p>

          <h3>${product.name}</h3>

          <p class="product-weight">${product.weight}</p>

          <div class="product-price-wrap">
            <span class="product-price-label">PRICE</span>
            <p class="product-price">₹${isNaN(price) ? "0" : price}</p>
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

  function renderProducts(productList) {
    if (!productsGrid) return;

    productsGrid.innerHTML = "";

    if (!productList || productList.length === 0) {
      if (productCount) productCount.textContent = "0";
      if (productsEmpty) productsEmpty.hidden = false;
      return;
    }

    if (productsEmpty) productsEmpty.hidden = true;

    productsGrid.innerHTML = productList
      .map(productCardTemplate)
      .join("");

    if (productCount) {
      productCount.textContent = productList.length;
    }
  }

  function addToCart(productId, button) {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (!selectedProduct) return;

    const cart = getCart();

    const existingItem = cart.find(
      (item) => item.id === selectedProduct.id
    );

    if (existingItem) {
      existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;
    } else {
      cart.push({
        ...selectedProduct,
        quantity: 1
      });
    }

    saveCart(cart);
    updateCartCount();

    if (button) {
      const oldText = button.innerHTML;

      button.innerHTML = `
        <span class="add-cart-icon">✓</span>
        <span>Added</span>
      `;

      button.classList.add("added");

      setTimeout(() => {
        button.innerHTML = oldText;
        button.classList.remove("added");
      }, 900);
    }
  }

  if (productsGrid) {
    productsGrid.addEventListener("click", (event) => {
      const addButton = event.target.closest(".add-cart-btn");

      if (addButton) {
        addToCart(addButton.dataset.productId, addButton);
        return;
      }

      const wishlistButton = event.target.closest(".product-wishlist-btn");

      if (wishlistButton) {
        wishlistButton.classList.toggle("active");

        wishlistButton.textContent =
          wishlistButton.classList.contains("active") ? "♥" : "♡";
      }
    });
  }

  renderProducts(products);
  updateCartCount();
});
