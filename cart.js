document.addEventListener("DOMContentLoaded", () => {
  const CART_KEY = "centralStoresCart";

  const cartItemsContainer = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const cartContent = document.getElementById("cartContent");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

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

  function updateAllBadges(cart) {
    const totalQuantity = cart.reduce((total, item) => {
      return total + (Number(item.quantity) || 1);
    }, 0);

    document.querySelectorAll(
      "#cartCount, .cart-count, .cart-badge, [data-cart-count]"
    ).forEach((badge) => {
      badge.textContent = totalQuantity;
    });
  }

  function renderCart() {
    const cart = getCart();

    updateAllBadges(cart);

    if (!cart.length) {
      if (emptyCart) emptyCart.style.display = "block";
      if (cartContent) cartContent.style.display = "none";
      return;
    }

    if (emptyCart) emptyCart.style.display = "none";
    if (cartContent) cartContent.style.display = "block";

    if (!cartItemsContainer) {
      console.log("cartItems id missing in cart.html");
      return;
    }

    let total = 0;

    cartItemsContainer.innerHTML = cart.map((item) => {
      const quantity = Number(item.quantity) || 1;
      const price = Number(item.price) || 0;
      const itemTotal = price * quantity;

      total += itemTotal;

      return `
        <article class="cart-item" data-id="${item.id}">
          <div class="cart-item-image">NO IMAGE</div>

          <div class="cart-item-info">
            <span class="cart-item-category">${item.category || "Grocery"}</span>
            <h3>${item.name}</h3>
            <span class="cart-item-weight">${item.weight || ""}</span>

            <strong class="cart-item-price">₹${price}</strong>

            <div class="cart-quantity">
              <button type="button" class="qty-btn" data-action="minus" data-id="${item.id}">−</button>
              <span>${quantity}</span>
              <button type="button" class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
            </div>
          </div>

          <button type="button" class="remove-cart-item" data-id="${item.id}">
            Remove
          </button>
        </article>
      `;
    }).join("");

    if (cartTotal) {
      cartTotal.textContent = `₹${total}`;
    }
  }

  document.addEventListener("click", (event) => {
    const qtyButton = event.target.closest(".qty-btn");
    const removeButton = event.target.closest(".remove-cart-item");

    if (!qtyButton && !removeButton) return;

    const id = (qtyButton || removeButton).dataset.id;
    let cart = getCart();

    if (removeButton) {
      cart = cart.filter((item) => String(item.id) !== String(id));
    }

    if (qtyButton) {
      const item = cart.find((product) => String(product.id) === String(id));

      if (item) {
        item.quantity = Number(item.quantity) || 1;

        if (qtyButton.dataset.action === "plus") {
          item.quantity += 1;
        }

        if (qtyButton.dataset.action === "minus") {
          item.quantity -= 1;
        }

        if (item.quantity <= 0) {
          cart = cart.filter((product) => String(product.id) !== String(id));
        }
      }
    }

    saveCart(cart);
    renderCart();
  });

  renderCart();
});
