/* =====================================================
   CENTRAL & STORES — APP.JS
   Menu + Search + Cart + Wishlist
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const CART_KEY = "centralStoresCart";

  /* =====================================================
     ELEMENTS
  ===================================================== */

  const openMenuBtn = document.getElementById("openMenu");
  const closeMenuBtn = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  const homeSearch = document.getElementById("homeSearch");
  const searchClear = document.getElementById("searchClear");

  const cartCount = document.getElementById("cartCount");
  const bottomCartCount = document.getElementById("bottomCartCount");

  const addCartButtons = document.querySelectorAll(".add-cart-btn");
  const wishlistButtons = document.querySelectorAll(".wishlist-btn");

  /* =====================================================
     CART HELPERS
  ===================================================== */

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

  function getCartTotalCount() {
    const cart = getCart();

    return cart.reduce(function (total, item) {
      return total + (item.quantity || 1);
    }, 0);
  }

  function updateCartCount() {
    const count = getCartTotalCount();

    if (cartCount) {
      cartCount.textContent = count;
    }

    if (bottomCartCount) {
      bottomCartCount.textContent = count;
    }
  }

  function addToCart(productName, productSize) {
    const cart = getCart();

    const existingProduct = cart.find(function (item) {
      return item.name === productName && item.size === productSize;
    });

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      cart.push({
        id: Date.now(),
        name: productName,
        size: productSize,
        quantity: 1,
        priceType: "Price on Call",
        addedAt: new Date().toISOString()
      });
    }

    saveCart(cart);
    updateCartCount();
  }

  /* =====================================================
     MENU
  ===================================================== */

  function openMenu() {
    if (!sideMenu || !menuOverlay) return;

    sideMenu.classList.add("open");
    menuOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!sideMenu || !menuOverlay) return;

    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  if (openMenuBtn) {
    openMenuBtn.addEventListener("click", openMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", closeMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.querySelectorAll(".menu-links a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* =====================================================
     HOME SEARCH
     Goes to products.html with search word
  ===================================================== */

  function goToProductSearch() {
    if (!homeSearch) return;

    const query = homeSearch.value.trim();

    if (query.length > 0) {
      window.location.href =
        "products.html?search=" + encodeURIComponent(query);
    } else {
      window.location.href = "products.html";
    }
  }

  if (homeSearch) {
    homeSearch.addEventListener("input", function () {
      if (searchClear) {
        searchClear.classList.toggle("show", homeSearch.value.length > 0);
      }
    });

    homeSearch.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        goToProductSearch();
      }
    });

    homeSearch.addEventListener("focus", function () {
      if (homeSearch.value.length > 0 && searchClear) {
        searchClear.classList.add("show");
      }
    });
  }

  if (searchClear) {
    searchClear.addEventListener("click", function () {
      if (!homeSearch) return;

      homeSearch.value = "";
      searchClear.classList.remove("show");
      homeSearch.focus();
    });
  }

  /* =====================================================
     ADD TO CART
  ===================================================== */

  addCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const productName = button.dataset.product || "Product";
      const productSize = button.dataset.size || "";

      addToCart(productName, productSize);

      const oldHTML = button.innerHTML;

      button.innerHTML = "Added ✓";
      button.style.background = "#f2bd24";
      button.style.color = "#111111";

      setTimeout(function () {
        button.innerHTML = oldHTML;
        button.style.background = "";
        button.style.color = "";
      }, 1100);
    });
  });

  /* =====================================================
     WISHLIST HEART
  ===================================================== */

  wishlistButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const isActive = button.classList.toggle("active");

      if (isActive) {
        button.style.color = "#d63b3b";
        button.style.background = "#fff0f0";
      } else {
        button.style.color = "";
        button.style.background = "";
      }
    });
  });

  /* =====================================================
     BOTTOM NAV ACTIVE STATE
  ===================================================== */

  document.querySelectorAll(".bottom-nav-item").forEach(function (navItem) {
    navItem.addEventListener("click", function () {
      document.querySelectorAll(".bottom-nav-item").forEach(function (item) {
        item.classList.remove("active");
      });

      navItem.classList.add("active");
    });
  });

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  updateCartCount();
});
