/* =====================================================
   CENTRAL & STORES - PRODUCTS PAGE
   ===================================================== */

const categoryImages = {
  "Rice & Flours": "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80",
  "Pulses & Dals": "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80",
  "Oils & Ghee": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
  "Masalas & Spices": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80",
  "Essentials": "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=700&q=80",
  "Snacks": "https://images.unsplash.com/photo-1621939514649-280e2aa1d0e1?auto=format&fit=crop&w=700&q=80",
  "Beverages": "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80",
  "Household": "https://images.unsplash.com/photo-1583947582886-f40ec95dd752?auto=format&fit=crop&w=700&q=80"
};

/* Product Name, Category, Pack Size */
const productData = [
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
  ["Appalam Flour", "Rice & Flours", "500 g"],
  ["Aval Poha", "Rice & Flours", "500 g"],

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
  ["Double Beans", "Pulses & Dals", "500 g"],
  ["Horse Gram", "Pulses & Dals", "500 g"],
  ["Fried Gram", "Pulses & Dals", "500 g"],

  ["Sunflower Oil", "Oils & Ghee", "1 Litre"],
  ["Groundnut Oil", "Oils & Ghee", "1 Litre"],
  ["Gingelly Oil", "Oils & Ghee", "1 Litre"],
  ["Coconut Oil", "Oils & Ghee", "1 Litre"],
  ["Mustard Oil", "Oils & Ghee", "1 Litre"],
  ["Rice Bran Oil", "Oils & Ghee", "1 Litre"],
  ["Palm Oil", "Oils & Ghee", "1 Litre"],
  ["Cow Ghee", "Oils & Ghee", "500 ml"],
  ["Vanaspati Ghee", "Oils & Ghee", "500 ml"],
  ["Butter", "Oils & Ghee", "100 g"],

  ["Turmeric Powder", "Masalas & Spices", "100 g"],
  ["Chilli Powder", "Masalas & Spices", "100 g"],
  ["Coriander Powder", "Masalas & Spices", "100 g"],
  ["Garam Masala", "Masalas & Spices", "50 g"],
  ["Sambar Powder", "Masalas & Spices", "100 g"],
  ["Rasam Powder", "Masalas & Spices", "100 g"],
  ["Chicken Masala", "Masalas & Spices", "100 g"],
  ["Mutton Masala", "Masalas & Spices", "100 g"],
  ["Biryani Masala", "Masalas & Spices", "100 g"],
  ["Cumin Seeds", "Masalas & Spices", "100 g"],
  ["Mustard Seeds", "Masalas & Spices", "100 g"],
  ["Fenugreek Seeds", "Masalas & Spices", "100 g"],
  ["Fennel Seeds", "Masalas & Spices", "100 g"],
  ["Black Pepper", "Masalas & Spices", "100 g"],
  ["Cardamom", "Masalas & Spices", "25 g"],
  ["Cloves", "Masalas & Spices", "25 g"],
  ["Cinnamon", "Masalas & Spices", "50 g"],
  ["Asafoetida", "Masalas & Spices", "50 g"],

  ["Iodised Salt", "Essentials", "1 kg"],
  ["Rock Salt", "Essentials", "500 g"],
  ["White Sugar", "Essentials", "1 kg"],
  ["Brown Sugar", "Essentials", "500 g"],
  ["Jaggery", "Essentials", "500 g"],
  ["Tamarind", "Essentials", "500 g"],
  ["Tea Powder", "Essentials", "250 g"],
  ["Coffee Powder", "Essentials", "200 g"],
  ["Papad", "Essentials", "200 g"],
  ["Vermicelli", "Essentials", "500 g"],
  ["Cooking Soda", "Essentials", "100 g"],
  ["Baking Powder", "Essentials", "100 g"],

  ["Marie Biscuits", "Snacks", "250 g"],
  ["Glucose Biscuits", "Snacks", "250 g"],
  ["Cream Biscuits", "Snacks", "200 g"],
  ["Salt Biscuits", "Snacks", "200 g"],
  ["Mixture", "Snacks", "200 g"],
  ["Murukku", "Snacks", "200 g"],
  ["Potato Chips", "Snacks", "100 g"],
  ["Banana Chips", "Snacks", "100 g"],
  ["Peanut Candy", "Snacks", "100 g"],
  ["Rusk", "Snacks", "200 g"],
  ["Noodles", "Snacks", "280 g"],
  ["Instant Pasta", "Snacks", "200 g"],

  ["Tea Powder", "Beverages", "250 g"],
  ["Filter Coffee", "Beverages", "200 g"],
  ["Health Drink", "Beverages", "500 g"],
  ["Malted Drink", "Beverages", "500 g"],
  ["Lemon Drink Powder", "Beverages", "500 g"],
  ["Orange Drink Powder", "Beverages", "500 g"],
  ["Rose Milk Mix", "Beverages", "200 g"],
  ["Badam Drink Mix", "Beverages", "200 g"],
  ["Soft Drink", "Beverages", "750 ml"],
  ["Packaged Drinking Water", "Beverages", "1 Litre"],

  ["Bath Soap", "Household", "100 g"],
  ["Washing Soap", "Household", "200 g"],
  ["Detergent Powder", "Household", "1 kg"],
  ["Dishwash Bar", "Household", "200 g"],
  ["Dishwash Liquid", "Household", "500 ml"],
  ["Floor Cleaner", "Household", "500 ml"],
  ["Toilet Cleaner", "Household", "500 ml"],
  ["Hand Wash", "Household", "250 ml"],
  ["Toothpaste", "Household", "100 g"],
  ["Toothbrush", "Household", "1 Piece"],
  ["Match Box", "Household", "1 Pack"],
  ["Mosquito Coil", "Household", "1 Pack"],
  ["Garbage Bags", "Household", "1 Roll"],
  ["Aluminium Foil", "Household", "1 Roll"]
];

const allProducts = productData.map((item, index) => ({
  id: index + 1001,
  name: item[0],
  category: item[1],
  weight: item[2],
  image: categoryImages[item[1]]
}));

let activeCategory = "All";
let activeSearch = "";

/* SVGs used inside generated cards */
function cartIconSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H7"></path>
      <circle cx="10" cy="20" r="1.4"></circle>
      <circle cx="18" cy="20" r="1.4"></circle>
    </svg>
  `;
}

function phoneIconSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 3.5 9 3l1.7 4.3-2.1 1.4a15.3 15.3 0 0 0 6.8 6.8l1.4-2.1L21 15l-.5 2.4A3 3 0 0 1 17.6 20C10 20 4 14 4 6.4a3 3 0 0 1 2.6-2.9z"></path>
    </svg>
  `;
}

/* Cart storage */
function getProductsCart() {
  try {
    return JSON.parse(localStorage.getItem("centralStoresCart")) || [];
  } catch (error) {
    return [];
  }
}

function saveProductsCart(cart) {
  localStorage.setItem("centralStoresCart", JSON.stringify(cart));

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}

function addProductToCart(product) {
  const cart = getProductsCart();

  const existingProduct = cart.find(
    (item) => String(item.id) === String(product.id)
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      weight: product.weight,
      image: product.image,
      quantity: 1
    });
  }

  saveProductsCart(cart);

  if (typeof showCartToast === "function") {
    showCartToast(product.name);
  }
}

/* Product card */
function createProductCard(product) {
  return `
    <article class="all-product-card">
      <div class="all-product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="all-product-category">${product.category}</span>
      </div>

      <div class="all-product-details">
        <h3>${product.name}</h3>
        <p class="all-product-weight">${product.weight}</p>

        <div class="all-product-bottom">
          <div class="price-on-call">
            ${phoneIconSvg()}
            <span>Price on Call</span>
          </div>

          <button class="all-add-cart-btn" type="button" data-product-id="${product.id}">
            ${cartIconSvg()}
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

/* Filter */
function getFilteredProducts() {
  return allProducts.filter((product) => {
    const categoryMatch =
      activeCategory === "All" || product.category === activeCategory;

    const searchText = activeSearch.toLowerCase();

    const searchMatch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.weight.toLowerCase().includes(searchText);

    return categoryMatch && searchMatch;
  });
}

/* Render */
function renderProducts() {
  const grid = document.getElementById("allProductsGrid");
  const count = document.getElementById("productsCount");
  const title = document.getElementById("productsTitle");
  const empty = document.getElementById("noProductsFound");

  if (!grid) return;

  const filtered = getFilteredProducts();

  grid.innerHTML = filtered.map(createProductCard).join("");

  if (count) count.textContent = filtered.length;

  if (title) {
    if (activeSearch) {
      title.textContent = "Search Results";
    } else if (activeCategory !== "All") {
      title.textContent = activeCategory;
    } else {
      title.textContent = "All Daily Essentials";
    }
  }

  if (empty) {
    empty.classList.toggle("show", filtered.length === 0);
  }

  setupAddButtons();
}

/* Add button events */
function setupAddButtons() {
  document.querySelectorAll(".all-add-cart-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = Number(this.dataset.productId);
      const product = allProducts.find((item) => item.id === productId);

      if (!product) return;

      addProductToCart(product);

      const label = this.querySelector("span");
      if (label) label.textContent = "Added";

      this.classList.add("added");

      setTimeout(() => {
        if (label) label.textContent = "Add";
        this.classList.remove("added");
      }, 1000);
    });
  });
}

/* Category buttons */
function setupCategoryFilters() {
  const buttons = document.querySelectorAll(".category-filter-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      activeCategory = this.dataset.category;
      activeSearch = "";

      const input = document.getElementById("productSearchInput");
      const clear = document.getElementById("productSearchClear");

      if (input) input.value = "";
      if (clear) clear.classList.remove("show");

      buttons.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");

      renderProducts();
    });
  });
}

/* Search */
function setupSearch() {
  const input = document.getElementById("productSearchInput");
  const clear = document.getElementById("productSearchClear");

  if (!input) return;

  input.addEventListener("input", function () {
    activeSearch = this.value.trim();

    if (clear) {
      clear.classList.toggle("show", activeSearch.length > 0);
    }

    renderProducts();
  });

  if (clear) {
    clear.addEventListener("click", function () {
      input.value = "";
      activeSearch = "";
      clear.classList.remove("show");
      input.focus();
      renderProducts();
    });
  }
}

/* Reset button */
function setupResetButton() {
  const reset = document.getElementById("resetProductsBtn");

  if (!reset) return;

  reset.addEventListener("click", function () {
    activeCategory = "All";
    activeSearch = "";

    const input = document.getElementById("productSearchInput");
    const clear = document.getElementById("productSearchClear");

    if (input) input.value = "";
    if (clear) clear.classList.remove("show");

    document.querySelectorAll(".category-filter-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.category === "All");
    });

    renderProducts();
  });
}

/* Start */
document.addEventListener("DOMContentLoaded", function () {
  setupCategoryFilters();
  setupSearch();
  setupResetButton();
  renderProducts();
});
