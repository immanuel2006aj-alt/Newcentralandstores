/* =========================================================
   CENTRAL & STORES — PRODUCTS.JS
   Product catalogue + automatic Pexels images + cart
   ========================================================= */

const IMAGE_API_URL = "https://central-stores-image-api.onrender.com";

/* ---------------------------------------------------------
   PRODUCT DATA
   Format: [Product Name, Category, Pack Size]
   --------------------------------------------------------- */
const productData = [
  /* Rice & Flours */
  ["Ponni Boiled Rice", "Rice & Flours", "1 kg"],
  ["Ponni Raw Rice", "Rice & Flours", "1 kg"],
  ["Basmati Rice", "Rice & Flours", "1 kg"],
  ["Jeera Samba Rice", "Rice & Flours", "1 kg"],
  ["Idli Rice", "Rice & Flours", "1 kg"],
  ["Sona Masoori Rice", "Rice & Flours", "1 kg"],
  ["Brown Rice", "Rice & Flours", "1 kg"],
  ["Red Rice", "Rice & Flours", "1 kg"],
  ["Wheat Flour", "Rice & Flours", "1 kg"],
  ["Maida Flour", "Rice & Flours", "500 g"],
  ["Ragi Flour", "Rice & Flours", "500 g"],
  ["Rice Flour", "Rice & Flours", "500 g"],
  ["Gram Flour Besan", "Rice & Flours", "500 g"],
  ["Corn Flour", "Rice & Flours", "500 g"],
  ["Aval Poha", "Rice & Flours", "500 g"],

  /* Pulses & Dals */
  ["Toor Dal", "Pulses & Dals", "1 kg"],
  ["Urad Dal Whole", "Pulses & Dals", "500 g"],
  ["Urad Dal Split", "Pulses & Dals", "500 g"],
  ["Moong Dal", "Pulses & Dals", "500 g"],
  ["Chana Dal", "Pulses & Dals", "500 g"],
  ["Masoor Dal", "Pulses & Dals", "500 g"],
  ["Green Gram", "Pulses & Dals", "500 g"],
  ["Black Chana", "Pulses & Dals", "500 g"],
  ["White Chana", "Pulses & Dals", "500 g"],
  ["Rajma", "Pulses & Dals", "500 g"],
  ["Cowpeas", "Pulses & Dals", "500 g"],
  ["Horse Gram", "Pulses & Dals", "500 g"],

  /* Oils & Ghee */
  ["Sunflower Oil", "Oils & Ghee", "1 L"],
  ["Groundnut Oil", "Oils & Ghee", "1 L"],
  ["Gingelly Oil", "Oils & Ghee", "1 L"],
  ["Coconut Oil", "Oils & Ghee", "1 L"],
  ["Mustard Oil", "Oils & Ghee", "1 L"],
  ["Cow Ghee", "Oils & Ghee", "500 ml"],

  /* Masalas & Spices */
  ["Turmeric Powder", "Masalas & Spices", "200 g"],
  ["Chilli Powder", "Masalas & Spices", "200 g"],
  ["Coriander Powder", "Masalas & Spices", "200 g"],
  ["Garam Masala", "Masalas & Spices", "100 g"],
  ["Sambar Powder", "Masalas & Spices", "200 g"],
  ["Rasam Powder", "Masalas & Spices", "100 g"],
  ["Cumin Seeds", "Masalas & Spices", "100 g"],
  ["Mustard Seeds", "Masalas & Spices", "100 g"],
  ["Black Pepper", "Masalas & Spices", "100 g"],
  ["Cardamom", "Masalas & Spices", "50 g"],
  ["Cloves", "Masalas & Spices", "50 g"],
  ["Cinnamon", "Masalas & Spices", "50 g"],

  /* Essentials */
  ["Iodised Salt", "Essentials", "1 kg"],
  ["White Sugar", "Essentials", "1 kg"],
  ["Brown Sugar", "Essentials", "500 g"],
  ["Jaggery", "Essentials", "500 g"],
  ["Tamarind", "Essentials", "500 g"],
  ["Tea Powder", "Essentials", "250 g"],
  ["Coffee Powder", "Essentials", "200 g"],
  ["Papad", "Essentials", "200 g"],
  ["Vermicelli", "Essentials", "400 g"],
  ["Rava Sooji", "Essentials", "500 g"],
  ["Oats", "Essentials", "500 g"],
  ["Sabudana", "Essentials", "500 g"],

  /* Snacks */
  ["Marie Biscuits", "Snacks", "200 g"],
  ["Glucose Biscuits", "Snacks", "200 g"],
  ["Cream Biscuits", "Snacks", "150 g"],
  ["Salt Biscuits", "Snacks", "200 g"],
  ["Mixture", "Snacks", "250 g"],
  ["Murukku", "Snacks", "200 g"],
  ["Potato Chips", "Snacks", "100 g"],
  ["Banana Chips", "Snacks", "100 g"],
  ["Peanut Candy", "Snacks", "150 g"],
  ["Rusk", "Snacks", "200 g"],
  ["Noodles", "Snacks", "280 g"],
  ["Instant Pasta", "Snacks", "280 g"],

  /* Beverages */
  ["Filter Coffee", "Beverages", "200 g"],
  ["Health Drink", "Beverages", "500 g"],
  ["Malted Drink", "Beverages", "500 g"],
  ["Lemon Drink Powder", "Beverages", "200 g"],
  ["Orange Drink Powder", "Beverages", "200 g"],
  ["Rose Milk Mix", "Beverages", "200 g"],
  ["Badam Drink Mix", "Beverages", "200 g"],
  ["Soft Drink", "Beverages", "750 ml"],
  ["Packaged Drinking Water", "Beverages", "1 L"],
  ["Fruit Juice", "Beverages", "1 L"],

  /* Household */
  ["Bath Soap", "Household", "100 g"],
  ["Washing Soap", "Household", "200 g"],
  ["Detergent Powder", "Household", "1 kg"],
  ["Dishwash Bar", "Household", "200 g"],
  ["Dishwash Liquid", "Household", "500 ml"],
  ["Floor Cleaner", "Household", "1 L"],
  ["Toilet Cleaner", "Household", "500 ml"],
  ["Hand Wash", "Household", "250 ml"],
  ["Toothpaste", "Household", "150 g"],
  ["Toothbrush", "Household", "1 pc"],
  ["Match Box", "Household", "1 pack"],
  ["Mosquito Coil", "Household", "1 pack"],
  ["Garbage Bags", "Household", "1 roll"],
  ["Aluminium Foil", "Household", "9 m"]
];

/* Convert simple product array to product objects */
const products = productData.map((item, index) => ({
  id: index + 1,
  name: item[0],
  category: item[1],
  size: item[2]
}));

let activeCategory = "All";
let searchText = "";

/* ---------------------------------------------------------
   SVG ICONS — no emoji
   --------------------------------------------------------- */
const icons = {
  cart: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L20 8H7"></path>
      <circle cx="10" cy="20" r="1"></circle>
      <circle cx="18" cy="20" r="1"></circle>
    </svg>
  `,
  phone: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 2.9a2 2 0 0 1-.5 2.1L9.1 11a16 16 0 0 0 3.9 3.9l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.7 2.9.8a2 2 0 0 1 1.7 2z"></path>
    </svg>
  `,
  search: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7"></circle>
      <path d="m20 20-4-4"></path>
    </svg>
  `,
  box: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21 8-9-5-9 5 9 5 9-5Z"></path>
      <path d="M3 8v8l9 5 9-5V8"></path>
      <path d="M12 13v8"></path>
    </svg>
  `
};

/* ---------------------------------------------------------
   AUTO IMAGE LOADER
   --------------------------------------------------------- */
async function getProductImage(productName, category) {
  const cacheKey = `centralStoreImage_${productName}`;

  const savedImage = localStorage.getItem(cacheKey);

  if (savedImage) {
    return savedImage;
  }

  try {
    const response = await fetch(
      `${IMAGE_API_URL}/api/product-image?product=${encodeURIComponent(productName)}&category=${encodeURIComponent(category)}`
    );

    const data = await response.json();

    if (data.success && data.image) {
      localStorage.setItem(cacheKey, data.image);
      return data.image;
    }
  } catch (error) {
    console.log("Image loading failed for:", productName);
  }

  return "";
}

async function loadVisibleProductImages() {
  const imageElements = document.querySelectorAll(".product-image[data-product]");

  for (const imageElement of imageElements) {
    const productName = imageElement.dataset.product;
    const category = imageElement.dataset.category;

    const imageUrl = await getProductImage(productName, category);

    if (imageUrl) {
      imageElement.src = imageUrl;
      imageElement.classList.add("image-loaded");
    } else {
      imageElement.closest(".product-card")?.classList.add("image-not-found");
    }
  }
}

/* ---------------------------------------------------------
   CART
   --------------------------------------------------------- */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("centralStoresCart")) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("centralStoresCart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const product = products.find((item) => item.id === Number(productId));

  if (!product) return;

  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      size: product.size,
      quantity: 1
    });
  }

  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

function updateCartCount() {
  const count = getCart().reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = count;
    element.style.display = count > 0 ? "flex" : "none";
  });
}

function showToast(message) {
  let toast = document.querySelector(".product-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "product-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.centralStoresToastTimer);

  window.centralStoresToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

/* ---------------------------------------------------------
   FILTER + SEARCH
   --------------------------------------------------------- */
function getFilteredProducts() {
  return products.filter((product) => {
    const matchCategory =
      activeCategory === "All" || product.category === activeCategory;

    const fullText =
      `${product.name} ${product.category} ${product.size}`.toLowerCase();

    const matchSearch = fullText.includes(searchText.toLowerCase());

    return matchCategory && matchSearch;
  });
}

function getCategories() {
  return ["All", ...new Set(products.map((product) => product.category))];
}

/* ---------------------------------------------------------
   RENDER CATEGORY BUTTONS
   HTML must contain: <div id="categoryFilters"></div>
   --------------------------------------------------------- */
function renderCategoryFilters() {
  const categoryFilters = document.getElementById("categoryFilters");

  if (!categoryFilters) return;

  categoryFilters.innerHTML = getCategories()
    .map(
      (category) => `
        <button
          class="category-chip ${category === activeCategory ? "active" : ""}"
          type="button"
          data-category="${category}"
        >
          ${category}
        </button>
      `
    )
    .join("");

  categoryFilters.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderCategoryFilters();
      renderProducts();
    });
  });
}

/* ---------------------------------------------------------
   RENDER PRODUCTS
   HTML must contain:
   <div id="productCount"></div>
   <div id="productGrid"></div>
   --------------------------------------------------------- */
function renderProducts() {
  const productGrid = document.getElementById("productGrid");
  const productCount = document.getElementById("productCount");
  const productsToShow = getFilteredProducts();

  if (!productGrid) return;

  if (productCount) {
    productCount.textContent = `${productsToShow.length} Products`;
  }

  if (productsToShow.length === 0) {
    productGrid.innerHTML = `
      <div class="no-products">
        <div class="no-products-icon">${icons.search}</div>
        <h3>No products found</h3>
        <p>Try another product name or category.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = productsToShow
    .map(
      (product) => `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-image-wrap">
            <div class="product-image-loader"></div>

            <img
              class="product-image"
              src=""
              data-product="${product.name}"
              data-category="${product.category}"
              alt="${product.name}"
              loading="lazy"
            >

            <span class="product-category-label">${product.category}</span>
          </div>

          <div class="product-card-content">
            <h3>${product.name}</h3>
            <p class="product-size">${product.size}</p>

            <div class="product-card-actions">
              <span class="price-on-call">
                ${icons.phone}
                <span>Price on<br>Call</span>
              </span>

              <button
                type="button"
                class="add-product-btn"
                data-add-product="${product.id}"
                aria-label="Add ${product.name} to cart"
              >
                ${icons.cart}
                <span>Add</span>
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  productGrid.querySelectorAll("[data-add-product]").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.addProduct);
    });
  });

  loadVisibleProductImages();
}

/* ---------------------------------------------------------
   SEARCH
   HTML must contain: <input id="productSearch">
   --------------------------------------------------------- */
function setupSearch() {
  const productSearch = document.getElementById("productSearch");

  if (!productSearch) return;

  productSearch.addEventListener("input", (event) => {
    searchText = event.target.value.trim();
    renderProducts();
  });
}

/* ---------------------------------------------------------
   PAGE START
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCategoryFilters();
  renderProducts();
  setupSearch();
  updateCartCount();
});
