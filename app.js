/* =====================================================
   CENTRAL & STORES - COMMON APP JAVASCRIPT
   Works for index.html, products.html and cart.html
   ===================================================== */

const CART_KEY = "centralStoresCart";

/* =====================================================
   MENU
   ===================================================== */

function toggleMenu() {
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  if (!sideMenu || !menuOverlay) return;

  const isOpen = sideMenu.classList.toggle("open");

  menuOverlay.classList.toggle("show", isOpen);

  document.body.style.overflow = isOpen ? "hidden" : "";
}

function closeMenu() {
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  if (!sideMenu || !menuOverlay) return;

  sideMenu.classList.remove("open");
  menuOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

/* =====================================================
   CART STORAGE
   ===================================================== */

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
  updateCartCount();
}

function getCartTotalQuantity() {
  return getCart().reduce((total, item) => {
    return total + Number(item.quantity || 0);
  }, 0);
}

function updateCartCount() {
  const totalQuantity = getCartTotalQuantity();

  const cartCount = document.getElementById("cartCount");
  const bottomCartCount = document.getElementById("bottomCartCount");

  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }

  if (bottomCartCount) {
    bottomCartCount.textContent = totalQuantity;
  }
}

/* =====================================================
   ADD PRODUCT TO CART
   No price stored - shop owner confirms by call
   ===================================================== */

function addToCart(product) {
  const cart = getCart();

  const existingProduct = cart.find((item) => {
    return String(item.id) === String(product.id);
  });

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      weight: product.weight || "",
      image: product.image || "",
      quantity: 1
    });
  }

  saveCart(cart);
  showCartToast(product.name);
}

/* =====================================================
   CART TOAST
   ===================================================== */

function showCartToast(productName) {
  let toast = document.getElementById("cartToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cartToast";
    toast.className = "cart-toast";

    toast.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H7"></path>
        <circle cx="10" cy="20" r="1.4"></circle>
        <circle cx="18" cy="20" r="1.4"></circle>
      </svg>
      <span></span>
    `;

    document.body.appendChild(toast);
  }

  const toastText = toast.querySelector("span");

  if (toastText) {
    toastText.textContent = `${productName} added to cart`;
  }

  toast.classList.add("show");

  clearTimeout(window.cartToastTimer);

  window.cartToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* =====================================================
   INDEX PAGE ADD BUTTONS
   Only works if index.html has .add-cart-btn buttons
   ===================================================== */

function setupIndexAddButtons() {
  const buttons = document.querySelectorAll(".add-cart-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = {
        id: this.dataset.id,
        name: this.dataset.name,
        weight: this.dataset.weight,
        image: this.dataset.image
      };

      if (!product.id || !product.name) return;

      addToCart(product);

      const label = this.querySelector("span");

      if (label) {
        label.textContent = "Added";
      }

      this.classList.add("added");

      setTimeout(() => {
        if (label) {
          label.textContent = "Add";
        }

        this.classList.remove("added");
      }, 1100);
    });
  });
}

/* =====================================================
   WISHLIST BUTTON VISUAL
   ===================================================== */

function setupWishlistButtons() {
  const wishlistButtons = document.querySelectorAll(".wishlist-btn");

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
}

/* =====================================================
   ESC KEY CLOSE MENU
   ===================================================== */

function setupEscapeKey() {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

/* =====================================================
   BOTTOM SEARCH BUTTON
   Products page-la search input focus aagum
   ===================================================== */

function setupBottomSearch() {
  const searchLinks = document.querySelectorAll('a[href="#productSearchInput"]');

  searchLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const input = document.getElementById("productSearchInput");

      if (!input) return;

      event.preventDefault();

      input.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      setTimeout(() => {
        input.focus();
      }, 400);
    });
  });
}

/* =====================================================
   START COMMON APP
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  setupIndexAddButtons();
  setupWishlistButtons();
  setupEscapeKey();
  setupBottomSearch();
});
