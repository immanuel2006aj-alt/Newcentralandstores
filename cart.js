document.addEventListener("DOMContentLoaded", () => {
  const CART_KEY = "centralStoresCart";
  const cartImageLinks = {
    "India Gate Basmati Rice": "india-gate-basmati-rice.jpg",
    "Daawat Basmati Rice": "daawat-basmati-rice.jpg"
  };

  const emptyCart = document.getElementById("emptyCart");
  const cartProductsCard = document.getElementById("cartProductsCard");
  const cartItemCount = document.getElementById("cartItemCount");
  const cartItemsList = document.getElementById("cartItemsList");
  const customerDetailsCard = document.getElementById("customerDetailsCard");

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

  function updateBadges(cart) {
    const total = cart.reduce((sum, item) => {
      return sum + (Number(item.quantity) || 1);
    }, 0);

    document.querySelectorAll(
      "#cartCount, .cart-count, .cart-badge, [data-cart-count]"
    ).forEach((badge) => {
      badge.textContent = total;
    });
  }

  function renderCart() {
    const cart = getCart();

    updateBadges(cart);

    if (!cart.length) {
      if (emptyCart) emptyCart.hidden = false;
      if (cartProductsCard) cartProductsCard.hidden = true;
      if (customerDetailsCard) customerDetailsCard.hidden = true;
      return;
    }

    if (emptyCart) emptyCart.hidden = true;
    if (cartProductsCard) cartProductsCard.hidden = false;
    if (customerDetailsCard) customerDetailsCard.hidden = false;

    if (!cartItemsList) return;

    const totalQuantity = cart.reduce((sum, item) => {
      return sum + (Number(item.quantity) || 1);
    }, 0);

    if (cartItemCount) {
      cartItemCount.textContent = totalQuantity;
    }

    cartItemsList.innerHTML = cart.map((item) => {
      const quantity = Number(item.quantity) || 1;
      const price = Number(item.price) || 0;

      return `
        <article class="cart-item" data-id="${item.id}">
<div class="cart-product-image">
  ${
    (productImages && productImages[item.id])
  ? `<img src="${productImages[item.id]}" alt="${item.name}">`
  : `<span>NO IMAGE</span>`
</div>
          <div class="cart-item-info">
            <span class="cart-item-category">${item.category || "Grocery"}</span>

            <h3 class="cart-item-name">${item.name}</h3>

            <span class="cart-item-weight">${item.weight || ""}</span>

            <strong class="cart-item-price">₹${price}</strong>

            <div class="cart-quantity-control">
              <button type="button" class="quantity-btn" data-action="minus" data-id="${item.id}">−</button>
              <span class="quantity-value">${quantity}</span>
              <button type="button" class="quantity-btn" data-action="plus" data-id="${item.id}">+</button>
            </div>
          </div>

          <button type="button" class="remove-item-btn" data-id="${item.id}">
            Remove
          </button>
        </article>
      `;
    }).join("");
  }

  document.addEventListener("click", (event) => {
    const quantityButton = event.target.closest(".quantity-btn");
    const removeButton = event.target.closest(".remove-item-btn");

    if (!quantityButton && !removeButton) return;

    const clickedButton = quantityButton || removeButton;
    const id = clickedButton.dataset.id;

    let cart = getCart();

    if (removeButton) {
      cart = cart.filter((item) => String(item.id) !== String(id));
    }

    if (quantityButton) {
      const product = cart.find((item) => String(item.id) === String(id));

      if (product) {
        product.quantity = Number(product.quantity) || 1;

        if (quantityButton.dataset.action === "plus") {
          product.quantity += 1;
        } else {
          product.quantity -= 1;
        }

        if (product.quantity <= 0) {
          cart = cart.filter((item) => String(item.id) !== String(id));
        }
      }
    }

    saveCart(cart);
    renderCart();
  });

  renderCart();
});
