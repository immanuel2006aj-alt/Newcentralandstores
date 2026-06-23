const CART_KEY = "centralStoresCart";

/* =====================================================
   DEFAULT PRODUCT IMAGE
   Later replace each product image URL with Pixel URL
   ===================================================== */

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80";

/* =====================================================
   100 PRODUCTS
   ===================================================== */

const products = [
  { id: 1, name: "Ponni Boiled Rice", category: "Rice & Flours", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 2, name: "Ponni Raw Rice", category: "Rice & Flours", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 3, name: "Premium Basmati Rice", category: "Rice & Flours", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 4, name: "Jeera Samba Rice", category: "Rice & Flours", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 5, name: "Idli Rice", category: "Rice & Flours", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 6, name: "Brown Rice", category: "Rice & Flours", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 7, name: "Ragi Flour", category: "Rice & Flours", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 8, name: "Wheat Flour", category: "Rice & Flours", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 9, name: "Maida Flour", category: "Rice & Flours", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 10, name: "Rice Flour", category: "Rice & Flours", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 11, name: "Besan Flour", category: "Rice & Flours", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 12, name: "Corn Flour", category: "Rice & Flours", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 13, name: "Health Mix Powder", category: "Rice & Flours", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 14, name: "Appam Flour", category: "Rice & Flours", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 15, name: "Dosa Mix", category: "Rice & Flours", size: "500 g Pack", image: DEFAULT_IMAGE },

  { id: 16, name: "Toor Dal", category: "Pulses & Dals", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 17, name: "Urad Dal", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 18, name: "Chana Dal", category: "Pulses & Dals", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 19, name: "Moong Dal", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 20, name: "Masoor Dal", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 21, name: "Green Gram", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 22, name: "White Chana", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 23, name: "Black Chana", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 24, name: "Rajma", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 25, name: "Kabuli Chana", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 26, name: "Horse Gram", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 27, name: "Cowpeas", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 28, name: "Soya Chunks", category: "Pulses & Dals", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 29, name: "Roasted Gram", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 30, name: "Fried Gram", category: "Pulses & Dals", size: "500 g Pack", image: DEFAULT_IMAGE },

  { id: 31, name: "Sunflower Oil", category: "Oils & Ghee", size: "1 Litre Pack", image: DEFAULT_IMAGE },
  { id: 32, name: "Groundnut Oil", category: "Oils & Ghee", size: "1 Litre Pack", image: DEFAULT_IMAGE },
  { id: 33, name: "Coconut Oil", category: "Oils & Ghee", size: "1 Litre Pack", image: DEFAULT_IMAGE },
  { id: 34, name: "Gingelly Oil", category: "Oils & Ghee", size: "500 ml Pack", image: DEFAULT_IMAGE },
  { id: 35, name: "Mustard Oil", category: "Oils & Ghee", size: "1 Litre Pack", image: DEFAULT_IMAGE },
  { id: 36, name: "Cow Ghee", category: "Oils & Ghee", size: "500 ml Pack", image: DEFAULT_IMAGE },
  { id: 37, name: "Pure Ghee", category: "Oils & Ghee", size: "1 Litre Pack", image: DEFAULT_IMAGE },
  { id: 38, name: "Vanaspati", category: "Oils & Ghee", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 39, name: "Olive Oil", category: "Oils & Ghee", size: "500 ml Pack", image: DEFAULT_IMAGE },
  { id: 40, name: "Rice Bran Oil", category: "Oils & Ghee", size: "1 Litre Pack", image: DEFAULT_IMAGE },

  { id: 41, name: "Turmeric Powder", category: "Masalas", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 42, name: "Chilli Powder", category: "Masalas", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 43, name: "Coriander Powder", category: "Masalas", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 44, name: "Garam Masala", category: "Masalas", size: "100 g Pack", image: DEFAULT_IMAGE },
  { id: 45, name: "Sambar Powder", category: "Masalas", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 46, name: "Rasam Powder", category: "Masalas", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 47, name: "Chicken Masala", category: "Masalas", size: "100 g Pack", image: DEFAULT_IMAGE },
  { id: 48, name: "Mutton Masala", category: "Masalas", size: "100 g Pack", image: DEFAULT_IMAGE },
  { id: 49, name: "Biryani Masala", category: "Masalas", size: "100 g Pack", image: DEFAULT_IMAGE },
  { id: 50, name: "Pepper Powder", category: "Masalas", size: "100 g Pack", image: DEFAULT_IMAGE },
  { id: 51, name: "Cumin Seeds", category: "Masalas", size: "100 g Pack", image: DEFAULT_IMAGE },
  { id: 52, name: "Mustard Seeds", category: "Masalas", size: "100 g Pack", image: DEFAULT_IMAGE },
  { id: 53, name: "Fennel Seeds", category: "Masalas", size: "100 g Pack", image: DEFAULT_IMAGE },
  { id: 54, name: "Cardamom", category: "Masalas", size: "50 g Pack", image: DEFAULT_IMAGE },
  { id: 55, name: "Cloves", category: "Masalas", size: "50 g Pack", image: DEFAULT_IMAGE },

  { id: 56, name: "Tata Tea Gold", category: "Beverages", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 57, name: "Brooke Bond Tea", category: "Beverages", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 58, name: "Instant Coffee", category: "Beverages", size: "100 g Jar", image: DEFAULT_IMAGE },
  { id: 59, name: "Filter Coffee Powder", category: "Beverages", size: "250 g Pack", image: DEFAULT_IMAGE },
  { id: 60, name: "Malted Health Drink", category: "Beverages", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 61, name: "Chocolate Health Drink", category: "Beverages", size: "500 g Pack", image: DEFAULT_IMAGE },
  { id: 62, name: "Lemon Drink Powder", category: "Beverages", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 63, name: "Orange Drink Powder", category: "Beverages", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 64, name: "Rose Milk Mix", category: "Beverages", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 65, name: "Badam Drink Mix", category: "Beverages", size: "200 g Pack", image: DEFAULT_IMAGE },

  { id: 66, name: "Potato Chips", category: "Snacks", size: "150 g Pack", image: DEFAULT_IMAGE },
  { id: 67, name: "Banana Chips", category: "Snacks", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 68, name: "Mixture", category: "Snacks", size: "250 g Pack", image: DEFAULT_IMAGE },
  { id: 69, name: "Murukku", category: "Snacks", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 70, name: "Seedai", category: "Snacks", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 71, name: "Peanut Candy", category: "Snacks", size: "150 g Pack", image: DEFAULT_IMAGE },
  { id: 72, name: "Marie Biscuits", category: "Snacks", size: "250 g Pack", image: DEFAULT_IMAGE },
  { id: 73, name: "Cream Biscuits", category: "Snacks", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 74, name: "Salt Biscuits", category: "Snacks", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 75, name: "Rusk", category: "Snacks", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 76, name: "Popcorn", category: "Snacks", size: "100 g Pack", image: DEFAULT_IMAGE },
  { id: 77, name: "Salted Peanuts", category: "Snacks", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 78, name: "Cashew Nuts", category: "Snacks", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 79, name: "Almonds", category: "Snacks", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 80, name: "Raisins", category: "Snacks", size: "200 g Pack", image: DEFAULT_IMAGE },

  { id: 81, name: "Garbage Bags", category: "Household", size: "1 Roll", image: DEFAULT_IMAGE },
  { id: 82, name: "Aluminium Foil", category: "Household", size: "1 Roll", image: DEFAULT_IMAGE },
  { id: 83, name: "Cling Film", category: "Household", size: "1 Roll", image: DEFAULT_IMAGE },
  { id: 84, name: "Tissue Paper", category: "Household", size: "1 Pack", image: DEFAULT_IMAGE },
  { id: 85, name: "Kitchen Towel", category: "Household", size: "1 Roll", image: DEFAULT_IMAGE },
  { id: 86, name: "Dishwash Bar", category: "Household", size: "200 g Pack", image: DEFAULT_IMAGE },
  { id: 87, name: "Dishwash Liquid", category: "Household", size: "500 ml Bottle", image: DEFAULT_IMAGE },
  { id: 88, name: "Detergent Powder", category: "Household", size: "1 kg Pack", image: DEFAULT_IMAGE },
  { id: 89, name: "Detergent Bar", category: "Household", size: "250 g Pack", image: DEFAULT_IMAGE },
  { id: 90, name: "Floor Cleaner", category: "Household", size: "1 Litre Bottle", image: DEFAULT_IMAGE },
  { id: 91, name: "Toilet Cleaner", category: "Household", size: "500 ml Bottle", image: DEFAULT_IMAGE },
  { id: 92, name: "Hand Wash", category: "Household", size: "250 ml Bottle", image: DEFAULT_IMAGE },
  { id: 93, name: "Bath Soap", category: "Household", size: "3 Soap Pack", image: DEFAULT_IMAGE },
  { id: 94, name: "Shampoo Sachet Pack", category: "Household", size: "1 Pack", image: DEFAULT_IMAGE },
  { id: 95, name: "Toothpaste", category: "Household", size: "150 g Pack", image: DEFAULT_IMAGE },
  { id: 96, name: "Toothbrush", category: "Household", size: "1 Piece", image: DEFAULT_IMAGE },
  { id: 97, name: "Mosquito Coil", category: "Household", size: "10 Coils", image: DEFAULT_IMAGE },
  { id: 98, name: "Match Box", category: "Household", size: "1 Box", image: DEFAULT_IMAGE },
  { id: 99, name: "Agarbathi", category: "Household", size: "1 Pack", image: DEFAULT_IMAGE },
  { id: 100, name: "Camphor", category: "Household", size: "100 g Pack", image: DEFAULT_IMAGE }
];

/* =====================================================
   PAGE ELEMENTS
   ===================================================== */

const productsGrid = document.getElementById("productsGrid");
const productCount = document.getElementById("productCount");
const productsHeading = document.getElementById("productsHeading");
const noProducts = document.getElementById("noProducts");

const productSearch = document.getElementById("productSearch");
const searchClear = document.getElementById("searchClear");
const bottomSearchBtn = document.getElementById("bottomSearchBtn");

const cartCount = document.getElementById("cartCount");
const bottomCartCount = document.getElementById("bottomCartCount");

const filterButtons = document.querySelectorAll(".filter-btn");

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

let selectedCategory = "All";
let searchTerm = "";

/* =====================================================
   CART
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

function totalQuantity(cart) {
  return cart.reduce((total, item) => total + Number(item.quantity || 1), 0);
}

function updateCartCount() {
  const quantity = totalQuantity(getCart());

  if (cartCount) {
    cartCount.textContent = quantity;
  }

  if (bottomCartCount) {
    bottomCartCount.textContent = quantity;
  }
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  const cart = getCart();

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity = Number(existingProduct.quantity || 1) + 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      size: product.size,
      weight: product.size,
      image: product.image,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();
  showAddedMessage(product.name);
}

/* =====================================================
   PRODUCT CARD
   ===================================================== */

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function productCardHTML(product) {
  const name = escapeHTML(product.name);
  const category = escapeHTML(product.category);
  const size = escapeHTML(product.size);
  const image = product.image || DEFAULT_IMAGE;

  return `
    <article class="product-card">
      <button class="wishlist-btn" type="button" aria-label="Add ${name} to wishlist">
        <svg><use href="#icon-heart"></use></svg>
      </button>

      <div class="product-image">
        <img
          src="${image}"
          alt="${name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}'"
        >
      </div>

      <div class="product-details">
        <span class="product-category">${category}</span>
        <h3>${name}</h3>
        <p class="product-weight">${size}</p>

        <button class="add-cart-btn" type="button" data-product-id="${product.id}">
          <svg><use href="#icon-cart"></use></svg>
          Add
        </button>
      </div>
    </article>
  `;
}

/* =====================================================
   RENDER PRODUCTS
   ===================================================== */

function renderProducts() {
  if (!productsGrid) return;

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    const searchMatch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.size.toLowerCase().includes(searchTerm);

    return categoryMatch && searchMatch;
  });

  productsGrid.innerHTML = filteredProducts.map(productCardHTML).join("");

  if (productCount) {
    productCount.textContent = filteredProducts.length;
  }

  if (productsHeading) {
    productsHeading.textContent =
      selectedCategory === "All"
        ? "All Daily Essentials"
        : selectedCategory;
  }

  if (noProducts) {
    noProducts.hidden = filteredProducts.length !== 0;
  }

  document.querySelectorAll(".add-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(Number(button.dataset.productId));
    });
  });
}

/* =====================================================
   TOAST
   ===================================================== */

function showAddedMessage(productName) {
  let toast = document.getElementById("addToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "addToast";
    toast.style.position = "fixed";
    toast.style.left = "50%";
    toast.style.bottom = "92px";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    toast.style.zIndex = "9999";
    toast.style.maxWidth = "calc(100vw - 32px)";
    toast.style.padding = "11px 15px";
    toast.style.borderRadius = "10px";
    toast.style.background = "#121212";
    toast.style.color = "#ffffff";
    toast.style.fontFamily = "Poppins, sans-serif";
    toast.style.fontSize = "12px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 10px 25px rgba(0,0,0,.2)";
    toast.style.opacity = "0";
    toast.style.transition = "0.25s ease";
    document.body.appendChild(toast);
  }

  toast.textContent = `${productName} added to cart`;

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  clearTimeout(window.addToastTimer);

  window.addToastTimer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
  }, 1800);
}

/* =====================================================
   FILTERS + SEARCH
   ===================================================== */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category || "All";

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    renderProducts();
  });
});

if (productSearch) {
  productSearch.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLowerCase();

    if (searchClear) {
      searchClear.classList.toggle("show", searchTerm.length > 0);
    }

    renderProducts();
  });
}

if (searchClear) {
  searchClear.addEventListener("click", () => {
    if (!productSearch) return;

    productSearch.value = "";
    searchTerm = "";
    searchClear.classList.remove("show");

    renderProducts();
    productSearch.focus();
  });
}

if (bottomSearchBtn) {
  bottomSearchBtn.addEventListener("click", () => {
    if (!productSearch) return;

    productSearch.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    setTimeout(() => {
      productSearch.focus();
    }, 450);
  });
}

/* =====================================================
   SIDE MENU
   ===================================================== */

function openSideMenu() {
  if (sideMenu) sideMenu.classList.add("open");
  if (menuOverlay) menuOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeSideMenu() {
  if (sideMenu) sideMenu.classList.remove("open");
  if (menuOverlay) menuOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

if (openMenu) {
  openMenu.addEventListener("click", openSideMenu);
}

if (closeMenu) {
  closeMenu.addEventListener("click", closeSideMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeSideMenu);
}

/* =====================================================
   START
   ===================================================== */

renderProducts();
updateCartCount();
