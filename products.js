/* =====================================================
   CENTRAL & STORES — PRODUCTS.JS
   100 Products + Search + Category Filter + Cart
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const CART_KEY = "centralStoresCart";
  const WISHLIST_KEY = "centralStoresWishlist";

  const allProductsGrid = document.getElementById("allProductsGrid");
  const productsCount = document.getElementById("productsCount");
  const productsTitle = document.getElementById("productsTitle");
  const noProductsFound = document.getElementById("noProductsFound");

  const productSearch = document.getElementById("productSearch");
  const searchClear = document.getElementById("searchClear");
  const resetProductsBtn = document.getElementById("resetProductsBtn");

  const cartCount = document.getElementById("cartCount");
  const bottomCartCount = document.getElementById("bottomCartCount");

  const openMenuBtn = document.getElementById("openMenu");
  const closeMenuBtn = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const bottomSearchBtn = document.getElementById("bottomSearchBtn");

  let selectedCategory = "All";
  let currentSearch = "";

  /* =====================================================
     DEFAULT IMAGE
     Later each product image field replace with Pixel URL.
  ===================================================== */

  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=85";

  /* =====================================================
     PRODUCT DATABASE — 100 PRODUCTS
     image: "PASTE_PIXEL_IMAGE_URL_HERE"
  ===================================================== */

  const products = [
    // RICE & FLOURS — 15
    { id: 1, name: "Premium Ponni Rice", size: "5 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 2, name: "Premium Ponni Rice", size: "10 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 3, name: "Basmati Rice", size: "1 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 4, name: "Basmati Rice", size: "5 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 5, name: "Jeera Samba Rice", size: "1 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 6, name: "Idli Rice", size: "5 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 7, name: "Raw Rice", size: "5 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 8, name: "Brown Rice", size: "1 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 9, name: "Wheat Flour Atta", size: "1 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 10, name: "Wheat Flour Atta", size: "5 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 11, name: "Maida Flour", size: "1 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 12, name: "Ragi Flour", size: "500 g Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 13, name: "Bajra Flour", size: "500 g Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 14, name: "Rice Flour", size: "1 kg Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },
    { id: 15, name: "Besan Flour", size: "500 g Pack", category: "Rice & Flours", image: DEFAULT_IMAGE },

    // PULSES & DALS — 15
    { id: 16, name: "Toor Dal", size: "1 kg Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 17, name: "Toor Dal", size: "500 g Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 18, name: "Moong Dal", size: "1 kg Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 19, name: "Moong Dal", size: "500 g Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 20, name: "Urad Dal", size: "1 kg Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 21, name: "Urad Dal", size: "500 g Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 22, name: "Chana Dal", size: "1 kg Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 23, name: "Chana Dal", size: "500 g Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 24, name: "Masoor Dal", size: "1 kg Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 25, name: "Green Gram", size: "500 g Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 26, name: "White Chana", size: "500 g Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 27, name: "Black Chana", size: "500 g Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 28, name: "Rajma", size: "500 g Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 29, name: "Cowpeas", size: "500 g Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },
    { id: 30, name: "Horse Gram", size: "500 g Pack", category: "Pulses & Dals", image: DEFAULT_IMAGE },

    // OILS & GHEE — 10
    { id: 31, name: "Sunflower Oil", size: "1 Litre Pack", category: "Oils & Ghee", image: DEFAULT_IMAGE },
    { id: 32, name: "Sunflower Oil", size: "5 Litre Pack", category: "Oils & Ghee", image: DEFAULT_IMAGE },
    { id: 33, name: "Groundnut Oil", size: "1 Litre Pack", category: "Oils & Ghee", image: DEFAULT_IMAGE },
    { id: 34, name: "Groundnut Oil", size: "5 Litre Pack", category: "Oils & Ghee", image: DEFAULT_IMAGE },
    { id: 35, name: "Coconut Oil", size: "500 ml Pack", category: "Oils & Ghee", image: DEFAULT_IMAGE },
    { id: 36, name: "Coconut Oil", size: "1 Litre Pack", category: "Oils & Ghee", image: DEFAULT_IMAGE },
    { id: 37, name: "Gingelly Oil", size: "500 ml Pack", category: "Oils & Ghee", image: DEFAULT_IMAGE },
    { id: 38, name: "Mustard Oil", size: "1 Litre Pack", category: "Oils & Ghee", image: DEFAULT_IMAGE },
    { id: 39, name: "Pure Cow Ghee", size: "500 ml Pack", category: "Oils & Ghee", image: DEFAULT_IMAGE },
    { id: 40, name: "Pure Cow Ghee", size: "1 Litre Pack", category: "Oils & Ghee", image: DEFAULT_IMAGE },

    // MASALAS & SPICES — 15
    { id: 41, name: "Turmeric Powder", size: "200 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 42, name: "Chilli Powder", size: "200 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 43, name: "Coriander Powder", size: "200 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 44, name: "Garam Masala", size: "100 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 45, name: "Sambar Powder", size: "200 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 46, name: "Rasam Powder", size: "100 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 47, name: "Chicken Masala", size: "100 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 48, name: "Mutton Masala", size: "100 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 49, name: "Biryani Masala", size: "100 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 50, name: "Black Pepper", size: "100 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 51, name: "Cumin Seeds", size: "100 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 52, name: "Mustard Seeds", size: "100 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 53, name: "Fenugreek Seeds", size: "100 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 54, name: "Fennel Seeds", size: "100 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },
    { id: 55, name: "Cardamom", size: "50 g Pack", category: "Masalas & Spices", image: DEFAULT_IMAGE },

    // ESSENTIALS — 10
    { id: 56, name: "White Sugar", size: "1 kg Pack", category: "Essentials", image: DEFAULT_IMAGE },
    { id: 57, name: "Jaggery Powder", size: "500 g Pack", category: "Essentials", image: DEFAULT_IMAGE },
    { id: 58, name: "Rock Salt", size: "1 kg Pack", category: "Essentials", image: DEFAULT_IMAGE },
    { id: 59, name: "Iodized Salt", size: "1 kg Pack", category: "Essentials", image: DEFAULT_IMAGE },
    { id: 60, name: "Tamarind", size: "500 g Pack", category: "Essentials", image: DEFAULT_IMAGE },
    { id: 61, name: "Papad", size: "200 g Pack", category: "Essentials", image: DEFAULT_IMAGE },
    { id: 62, name: "Vermicelli", size: "400 g Pack", category: "Essentials", image: DEFAULT_IMAGE },
    { id: 63, name: "Poha Aval", size: "500 g Pack", category: "Essentials", image: DEFAULT_IMAGE },
    { id: 64, name: "Sooji Rava", size: "500 g Pack", category: "Essentials", image: DEFAULT_IMAGE },
    { id: 65, name: "Sabudana", size: "500 g Pack", category: "Essentials", image: DEFAULT_IMAGE },

    // SNACKS — 10
    { id: 66, name: "Potato Chips", size: "100 g Pack", category: "Snacks", image: DEFAULT_IMAGE },
    { id: 67, name: "Mixture", size: "200 g Pack", category: "Snacks", image: DEFAULT_IMAGE },
    { id: 68, name: "Murukku", size: "200 g Pack", category: "Snacks", image: DEFAULT_IMAGE },
    { id: 69, name: "Banana Chips", size: "150 g Pack", category: "Snacks", image: DEFAULT_IMAGE },
    { id: 70, name: "Peanut Candy", size: "100 g Pack", category: "Snacks", image: DEFAULT_IMAGE },
    { id: 71, name: "Marie Biscuits", size: "250 g Pack", category: "Snacks", image: DEFAULT_IMAGE },
    { id: 72, name: "Cream Biscuits", size: "200 g Pack", category: "Snacks", image: DEFAULT_IMAGE },
    { id: 73, name: "Salted Peanuts", size: "200 g Pack", category: "Snacks", image: DEFAULT_IMAGE },
    { id: 74, name: "Roasted Chana", size: "200 g Pack", category: "Snacks", image: DEFAULT_IMAGE },
    { id: 75, name: "Nendran Banana Chips", size: "150 g Pack", category: "Snacks", image: DEFAULT_IMAGE },

    // BEVERAGES — 10
    { id: 76, name: "Tea Powder", size: "250 g Pack", category: "Beverages", image: DEFAULT_IMAGE },
    { id: 77, name: "Tea Powder", size: "500 g Pack", category: "Beverages", image: DEFAULT_IMAGE },
    { id: 78, name: "Instant Coffee", size: "100 g Jar", category: "Beverages", image: DEFAULT_IMAGE },
    { id: 79, name: "Filter Coffee Powder", size: "250 g Pack", category: "Beverages", image: DEFAULT_IMAGE },
    { id: 80, name: "Health Drink Mix", size: "500 g Pack", category: "Beverages", image: DEFAULT_IMAGE },
    { id: 81, name: "Malted Drink Powder", size: "500 g Pack", category: "Beverages", image: DEFAULT_IMAGE },
    { id: 82, name: "Rose Milk Mix", size: "200 g Pack", category: "Beverages", image: DEFAULT_IMAGE },
    { id: 83, name: "Lemon Tea", size: "100 g Pack", category: "Beverages", image: DEFAULT_IMAGE },
    { id: 84, name: "Green Tea", size: "100 g Pack", category: "Beverages", image: DEFAULT_IMAGE },
    { id: 85, name: "Badam Drink Mix", size: "200 g Pack", category: "Beverages", image: DEFAULT_IMAGE },

    // HOUSEHOLD — 15
    { id: 86, name: "Dishwash Bar", size: "Pack of 3", category: "Household", image: DEFAULT_IMAGE },
    { id: 87, name: "Dishwash Liquid", size: "500 ml Bottle", category: "Household", image: DEFAULT_IMAGE },
    { id: 88, name: "Detergent Powder", size: "1 kg Pack", category: "Household", image: DEFAULT_IMAGE },
    { id: 89, name: "Detergent Bar", size: "Pack of 4", category: "Household", image: DEFAULT_IMAGE },
    { id: 90, name: "Floor Cleaner", size: "1 Litre Bottle", category: "Household", image: DEFAULT_IMAGE },
    { id: 91, name: "Toilet Cleaner", size: "500 ml Bottle", category: "Household", image: DEFAULT_IMAGE },
    { id: 92, name: "Hand Wash", size: "250 ml Bottle", category: "Household", image: DEFAULT_IMAGE },
    { id: 93, name: "Bath Soap", size: "Pack of 4", category: "Household", image: DEFAULT_IMAGE },
    { id: 94, name: "Toothpaste", size: "150 g Pack", category: "Household", image: DEFAULT_IMAGE },
    { id: 95, name: "Toothbrush", size: "Pack of 2", category: "Household", image: DEFAULT_IMAGE },
    { id: 96, name: "Tissue Paper", size: "Pack of 2", category: "Household", image: DEFAULT_IMAGE },
    { id: 97, name: "Garbage Bags", size: "Pack of 30", category: "Household", image: DEFAULT_IMAGE },
    { id: 98, name: "Aluminium Foil", size: "9 Metres Roll", category: "Household", image: DEFAULT_IMAGE },
    { id: 99, name: "Match Box", size: "Pack of 10", category: "Household", image: DEFAULT_IMAGE },
    { id: 100, name: "Mosquito Coil", size: "Pack of 10", category: "Household", image: DEFAULT_IMAGE }
  ];

  /* =====================================================
     STORAGE FUNCTIONS
  ===================================================== */

  function getStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
      return [];
    }
  }

  function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getCart() {
    return getStorage(CART_KEY);
  }

  function getWishlist() {
    return getStorage(WISHLIST_KEY);
  }

  function updateCartCount() {
    const cart = getCart();

    const total = cart.reduce(function (sum, item) {
      return sum + (item.quantity || 1);
    }, 0);

    if (cartCount) cartCount.textContent = total;
    if (bottomCartCount) bottomCartCount.textContent = total;
  }

  function addToCart(productId) {
    const product = products.find(function (item) {
      return item.id === productId;
    });

    if (!product) return;

    const cart = getCart();

    const existingItem = cart.find(function (item) {
      return item.id === product.id;
    });

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        size: product.size,
        category: product.category,
        image: product.image,
        quantity: 1,
        priceType: "Price on Call"
      });
    }

    setStorage(CART_KEY, cart);
    updateCartCount();
  }

  function toggleWishlist(productId) {
    let wishlist = getWishlist();

    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter(function (id) {
        return id !== productId;
      });
    } else {
      wishlist.push(productId);
    }

    setStorage(WISHLIST_KEY, wishlist);
  }

  /* =====================================================
     PRODUCT CARD HTML
  ===================================================== */

  function productCardHTML(product) {
    const wishlist = getWishlist();
    const isWishlisted = wishlist.includes(product.id);

    return `
      <article class="product-card" data-product-id="${product.id}">
        <button
          class="product-wishlist-btn ${isWishlisted ? "active" : ""}"
          type="button"
          data-wishlist-id="${product.id}"
          aria-label="Add ${product.name} to wishlist"
        >
          <svg><use href="#icon-heart"></use></svg>
        </button>

        <div class="product-image-wrap">
          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='${DEFAULT_IMAGE}'"
          >
        </div>

        <div class="product-info">
          <span class="product-category-name">${product.category}</span>

          <h3 class="product-name">${product.name}</h3>

          <p class="product-size">${product.size}</p>

          <div class="product-card-bottom">
            <div class="product-price-call">
              <svg><use href="#icon-phone"></use></svg>
              <span>Price on<br>Call</span>
            </div>

            <button
              class="product-add-btn"
              type="button"
              data-add-id="${product.id}"
            >
              <svg><use href="#icon-cart"></use></svg>
              Add
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /* =====================================================
     FILTER + RENDER
  ===================================================== */

  function getFilteredProducts() {
    return products.filter(function (product) {
      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchText =
        `${product.name} ${product.size} ${product.category}`.toLowerCase();

      const searchMatch = searchText.includes(currentSearch.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }

  function updateTitle(filteredProducts) {
    if (!productsTitle) return;

    if (currentSearch) {
      productsTitle.textContent = `Search Results`;
    } else if (selectedCategory !== "All") {
      productsTitle.textContent = selectedCategory;
    } else {
      productsTitle.textContent = "All Daily Essentials";
    }

    if (productsCount) {
      productsCount.textContent = filteredProducts.length;
    }
  }

  function renderProducts() {
    if (!allProductsGrid) return;

    const filteredProducts = getFilteredProducts();

    updateTitle(filteredProducts);

    if (filteredProducts.length === 0) {
      allProductsGrid.innerHTML = "";
      if (noProductsFound) noProductsFound.classList.add("show");
      return;
    }

    if (noProductsFound) noProductsFound.classList.remove("show");

    allProductsGrid.innerHTML = filteredProducts
      .map(productCardHTML)
      .join("");

    attachProductCardEvents();
  }

  function attachProductCardEvents() {
    document.querySelectorAll("[data-add-id]").forEach(function (button) {
      button.addEventListener("click", function () {
        const productId = Number(button.dataset.addId);

        addToCart(productId);

        const originalHTML = button.innerHTML;

        button.innerHTML = `
          <svg><use href="#icon-check"></use></svg>
          Added
        `;

        button.classList.add("added");

        setTimeout(function () {
          button.innerHTML = originalHTML;
          button.classList.remove("added");
        }, 1000);
      });
    });

    document.querySelectorAll("[data-wishlist-id]").forEach(function (button) {
      button.addEventListener("click", function () {
        const productId = Number(button.dataset.wishlistId);

        toggleWishlist(productId);
        button.classList.toggle("active");
      });
    });
  }

  /* =====================================================
     CATEGORY BUTTONS
  ===================================================== */

  document.querySelectorAll(".category-filter-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCategory = button.dataset.category || "All";

      document.querySelectorAll(".category-filter-btn").forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      renderProducts();

      document
        .getElementById("allProducts")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* =====================================================
     SEARCH
  ===================================================== */

  function updateSearchClearButton() {
    if (!searchClear || !productSearch) return;

    searchClear.classList.toggle(
      "show",
      productSearch.value.trim().length > 0
    );
  }

  if (productSearch) {
    productSearch.addEventListener("input", function () {
      currentSearch = productSearch.value.trim();
      updateSearchClearButton();
      renderProducts();
    });
  }

  if (searchClear) {
    searchClear.addEventListener("click", function () {
      if (!productSearch) return;

      productSearch.value = "";
      currentSearch = "";
      updateSearchClearButton();
      renderProducts();
      productSearch.focus();
    });
  }

  if (resetProductsBtn) {
    resetProductsBtn.addEventListener("click", function () {
      selectedCategory = "All";
      currentSearch = "";

      if (productSearch) productSe
