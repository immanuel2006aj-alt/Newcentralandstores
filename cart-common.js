const CART_KEY = "centralStoresCart";

function getCentralCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveCentralCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateAllCartBadges();
}

function updateAllCartBadges() {
  const cart = getCentralCart();

  const total = cart.reduce((sum, item) => {
    return sum + (Number(item.quantity) || 1);
  }, 0);

  document.querySelectorAll(
    ".cart-count, .cart-badge, [data-cart-count]"
  ).forEach((badge) => {
    badge.textContent = total;
  });
}

function addProductToCart(product) {
  const cart = getCentralCart();

  const existingItem = cart.find(
    (item) => String(item.id) === String(product.id)
  );

  if (existingItem) {
    existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category || "",
      weight: product.weight || "",
      price: Number(product.price) || 0,
      quantity: 1
    });
  }

  saveCentralCart(cart);
}

document.addEventListener("DOMContentLoaded", () => {
  updateAllCartBadges();
});
