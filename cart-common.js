const CART_KEY = "centralStoreCart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((total, item) => {
    return total + Number(item.quantity || 0);
  }, 0);
}

function updateAllCartBadges() {
  const count = getCartCount();

  document.querySelectorAll(
    "#cartCount, .cart-count, .cart-badge, [data-cart-count]"
  ).forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

function addProductToCart(product) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category || "",
      weight: product.weight || "",
      price: product.price || "₹0",
      quantity: 1
    });
  }

  saveCart(cart);
  updateAllCartBadges();
}

document.addEventListener("DOMContentLoaded", updateAllCartBadges);
