const CART_KEY = "centralStoresCart";

/* ===============================
   GET CART FROM LOCAL STORAGE
================================ */
function getCentralCart() {
  try {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.log("Cart read error:", error);
    return [];
  }
}

/* ===============================
   SAVE CART + UPDATE ALL BADGES
================================ */
function saveCentralCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateAllCartBadges();
}

/* ===============================
   TOTAL QUANTITY
================================ */
function getCartTotalQuantity() {
  const cart = getCentralCart();

  return cart.reduce((total, item) => {
    return total + (Number(item.quantity) || 1);
  }, 0);
}

/* ===============================
   UPDATE TOP + BOTTOM CART BADGES
================================ */
function updateAllCartBadges() {
  const total = getCartTotalQuantity();

  const badges = document.querySelectorAll(
    ".cart-count, .cart-badge, .nav-cart-count, [data-cart-count], #bottomCartCount"
  );

  badges.forEach((badge) => {
    badge.textContent = total;

    if (total > 0) {
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  });
}

/* ===============================
   ADD PRODUCT TO CART
================================ */
function addProductToCart(product) {
function addProductToCart(product) {
  const CART_KEY = "centralStoresCart";

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (error) {
    cart = [];
  }

  const existingItem = cart.find(
    (item) => String(item.id) === String(product.id)
  );

  if (existingItem) {
    existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;

    // force image update for old cart item
    existingItem.image = product.image || "";
    existingItem.name = product.name;
    existingItem.category = product.category;
    existingItem.weight = product.weight;
    existingItem.price = product.price;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      weight: product.weight,
      price: product.price,
      image: product.image || "",
      quantity: 1
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ===============================
   CHANGE PRODUCT QUANTITY
================================ */
function changeCartQuantity(productId, change) {
  let cart = getCentralCart();

  const product = cart.find((item) => {
    return String(item.id) === String(productId);
  });

  if (!product) return;

  product.quantity = (Number(product.quantity) || 1) + change;

  if (product.quantity <= 0) {
    cart = cart.filter((item) => {
      return String(item.id) !== String(productId);
    });
  }

  saveCentralCart(cart);

  document.dispatchEvent(
    new CustomEvent("centralCartUpdated", {
      detail: { cart }
    })
  );
}

/* ===============================
   REMOVE ONE PRODUCT COMPLETELY
================================ */
function removeProductFromCart(productId) {
  const cart = getCentralCart().filter((item) => {
    return String(item.id) !== String(productId);
  });

  saveCentralCart(cart);

  document.dispatchEvent(
    new CustomEvent("centralCartUpdated", {
      detail: { cart }
    })
  );
}

/* ===============================
   CLEAR FULL CART
================================ */
function clearCentralCart() {
  localStorage.removeItem(CART_KEY);
  updateAllCartBadges();

  document.dispatchEvent(
    new CustomEvent("centralCartUpdated", {
      detail: { cart: [] }
    })
  );
}

/* ===============================
   PAGE LOAD
================================ */
document.addEventListener("DOMContentLoaded", () => {
  updateAllCartBadges();
});

/* Another tab / page update */
window.addEventListener("storage", (event) => {
  if (event.key === CART_KEY) {
    updateAllCartBadges();
  }
});
