/* =========================================================
   CENTRAL & STORES — CART.JS
   Cart load + quantity + remove + WhatsApp order enquiry
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const STORE_WHATSAPP = "9199543128730";
  const CART_KEY = "centralStoresCart";

  const cartItemsList = document.getElementById("cartItemsList");
  const emptyCart = document.getElementById("emptyCart");
  const cartProductsCard = document.getElementById("cartProductsCard");
  const customerDetailsCard = document.getElementById("customerDetailsCard");

  const cartItemCount = document.getElementById("cartItemCount");
  const bottomCartCount = document.getElementById("bottomCartCount");

  const orderForm = document.getElementById("orderForm");
  const customerPhone = document.getElementById("customerPhone");

  /* =========================================================
     SVG ICONS
  ========================================================= */

  const icon = (name) => {
    return `<svg><use href="#icon-${name}"></use></svg>`;
  };

  /* =========================================================
     CART STORAGE
  ========================================================= */

  function getCart() {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.log("Cart loading error:", error);
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function getTotalQuantity(cart) {
    return cart.reduce((total, item) => {
      return total + Number(item.quantity || 1);
    }, 0);
  }

  /* =========================================================
     CART COUNT UPDATE
  ========================================================= */

  function updateCartCount() {
    const cart = getCart();
    const totalQuantity = getTotalQuantity(cart);

    if (cartItemCount) {
      cartItemCount.textContent = totalQuantity;
    }

    if (bottomCartCount) {
      bottomCartCount.textContent = totalQuantity;
    }
  }

  /* =========================================================
     CART ITEM HTML
  ========================================================= */

  function createCartItem(item) {
    const productId = String(item.id || "");
    const productName = item.name || "Product";
    const productCategory = item.category || "Grocery";
    const productWeight = item.weight || "";
    const productImage =
      item.image ||
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80";

    const quantity = Number(item.quantity || 1);

    return `
      <article class="cart-item" data-id="${productId}">
        
        <div class="cart-item-image-wrap">
          <img
            src="${productImage}"
            alt="${productName}"
            class="cart-item-image"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80'"
          >
        </div>

        <div class="cart-item-details">

          <span class="cart-item-category">${productCategory}</span>

          <h4>${productName}</h4>

          <span class="cart-item-weight">${productWeight}</span>

          <div class="cart-item-actions">

            <div class="quantity-control">

              <button
                type="button"
                class="quantity-btn decrease-btn"
                data-id="${productId}"
                aria-label="Decrease quantity"
              >
                ${icon("minus")}
              </button>

              <span class="quantity-value">${quantity}</span>

              <button
                type="button"
                class="quantity-btn increase-btn"
                data-id="${productId}"
                aria-label="Increase quantity"
              >
                ${icon("plus")}
              </button>

            </div>

            <button
              type="button"
              class="remove-cart-item"
              data-id="${productId}"
              aria-label="Remove ${productName}"
            >
              ${icon("trash")}
              <span>Remove</span>
            </button>

          </div>

        </div>

      </article>
    `;
  }

  /* =========================================================
     RENDER CART
  ========================================================= */

  function renderCart() {
    const cart = getCart();

    updateCartCount();

    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = "";

      if (emptyCart) emptyCart.hidden = false;
      if (cartProductsCard) cartProductsCard.hidden = true;
      if (customerDetailsCard) customerDetailsCard.hidden = true;

      return;
    }

    if (emptyCart) emptyCart.hidden = true;
    if (cartProductsCard) cartProductsCard.hidden = false;
    if (customerDetailsCard) customerDetailsCard.hidden = false;

    cartItemsList.innerHTML = cart.map(createCartItem).join("");
  }

  /* =========================================================
     CHANGE QUANTITY
  ========================================================= */

  function changeQuantity(productId, change) {
    const cart = getCart();

    const updatedCart = cart
      .map((item) => {
        if (String(item.id) === String(productId)) {
          const newQuantity = Number(item.quantity || 1) + change;

          return {
            ...item,
            quantity: newQuantity
          };
        }

        return item;
      })
      .filter((item) => Number(item.quantity || 1) > 0);

    saveCart(updatedCart);
    renderCart();
  }

  /* =========================================================
     REMOVE PRODUCT
  ========================================================= */

  function removeProduct(productId) {
    const cart = getCart();

    const updatedCart = cart.filter((item) => {
      return String(item.id) !== String(productId);
    });

    saveCart(updatedCart);
    renderCart();
  }

  /* =========================================================
     CART BUTTON EVENTS
  ========================================================= */

  if (cartItemsList) {
    cartItemsList.addEventListener("click", (event) => {
      const increaseButton = event.target.closest(".increase-btn");
      const decreaseButton = event.target.closest(".decrease-btn");
      const removeButton = event.target.closest(".remove-cart-item");

      if (increaseButton) {
        changeQuantity(increaseButton.dataset.id, 1);
      }

      if (decreaseButton) {
        changeQuantity(decreaseButton.dataset.id, -1);
      }

      if (removeButton) {
        removeProduct(removeButton.dataset.id);
      }
    });
  }

  /* =========================================================
     MOBILE NUMBER ONLY NUMBERS
  ========================================================= */

  if (customerPhone) {
    customerPhone.addEventListener("input", () => {
      customerPhone.value = customerPhone.value.replace(/\D/g, "").slice(0, 10);
    });
  }

  /* =========================================================
     WHATSAPP ORDER ENQUIRY
  ========================================================= */

  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const cart = getCart();

      if (cart.length === 0) {
        alert("Your cart is empty. Please add products first.");
        return;
      }

      const customerName = document.getElementById("customerName").value.trim();
      const phone = document.getElementById("customerPhone").value.trim();
      const address = document.getElementById("customerAddress").value.trim();
      const note = document.getElementById("customerNote").value.trim();

      if (!customerName || !phone || !address) {
        alert("Please fill all required customer details.");
        return;
      }

      if (phone.length !== 10) {
        alert("Please enter a valid 10 digit mobile number.");
        customerPhone.focus();
        return;
      }

      let productList = "";

      cart.forEach((item, index) => {
        const productName = item.name || "Product";
        const productWeight = item.weight ? ` (${item.weight})` : "";
        const quantity = Number(item.quantity || 1);

        productList += `${index + 1}. ${productName}${productWeight} × ${quantity}\n`;
      });

      const whatsappMessage =
`Hello Central & Stores,

I want to place an order enquiry.

*Customer Details*
Name: ${customerName}
Mobile: ${phone}
Address: ${address}

*Selected Products*
${productList}
${note ? `*Additional Note*\n${note}\n` : ""}
Please confirm product availability, final price and delivery details.`;

      const whatsappUrl =
        `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappUrl, "_blank");
    });
  }

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  renderCart();
});
