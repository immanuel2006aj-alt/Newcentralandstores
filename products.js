/* =========================================================
   CENTRAL & STORES — PRODUCTS.JS
   Side Menu + Cart Count + Search UI
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const CART_KEY = "centralStoresCart";

  /* =========================================================
     CART COUNT
  ========================================================= */

  function getCart() {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      const cart = savedCart ? JSON.parse(savedCart) : [];
      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      return [];
    }
  }

  function updateCartCount() {
    const cart = getCart();

    const totalQuantity = cart.reduce((total, item) => {
      return total + Number(item.quantity || 1);
    }, 0);

    const cartCount = document.getElementById("cartCount");
    const bottomCartCount = document.getElementById("bottomCartCount");

    if (cartCount) {
      cartCount.textContent = totalQuantity;
    }

    if (bottomCartCount) {
      bottomCartCount.textContent = totalQuantity;
    }
  }

  updateCartCount();

  /* =========================================================
     SIDE MENU OPEN / CLOSE
  ========================================================= */

  const openMenuBtn = document.getElementById("openMenu");
  const closeMenuBtn = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  function openSideMenu() {
    if (!sideMenu || !menuOverlay) return;

    sideMenu.classList.add("open");
    menuOverlay.classList.add("show");
    document.body.classList.add("menu-open");

    sideMenu.setAttribute("aria-hidden", "false");
  }

  function closeSideMenu() {
    if (!sideMenu || !menuOverlay) return;

    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("show");
    document.body.classList.remove("menu-open");

    sideMenu.setAttribute("aria-hidden", "true");
  }

  if (openMenuBtn) {
    openMenuBtn.addEventListener("click", openSideMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeSideMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeSideMenu);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSideMenu();
    }
  });

  /* =========================================================
     SEARCH BOX FOCUS
  ========================================================= */

  const productSearch = document.getElementById("productSearch");
  const bottomSearchBtn = document.getElementById("bottomSearchBtn");

  if (bottomSearchBtn && productSearch) {
    bottomSearchBtn.addEventListener("click", () => {
      productSearch.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      setTimeout(() => {
        productSearch.focus();
      }, 500);
    });
  }

});
