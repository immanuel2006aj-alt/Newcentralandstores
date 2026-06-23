document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("allProductsGrid");
  const count = document.getElementById("productsCount");
  const title = document.getElementById("productsTitle");
  const noProducts = document.getElementById("noProductsFound");

  if (!grid) {
    console.log("ERROR: allProductsGrid id not found");
    return;
  }

  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=85";

  const products = [
    ["Ponni Boiled Rice", "Rice & Flours", "1 kg Pack"],
    ["Ponni Raw Rice", "Rice & Flours", "1 kg Pack"],
    ["Basmati Rice", "Rice & Flours", "1 kg Pack"],
    ["Jeera Samba Rice", "Rice & Flours", "1 kg Pack"],
    ["Idli Rice", "Rice & Flours", "1 kg Pack"],
    ["Sona Masoori Rice", "Rice & Flours", "1 kg Pack"],
    ["Brown Rice", "Rice & Flours", "1 kg Pack"],
    ["Red Rice", "Rice & Flours", "1 kg Pack"],
    ["Wheat Flour", "Rice & Flours", "1 kg Pack"],
    ["Maida Flour", "Rice & Flours", "500 g Pack"],
    ["Ragi Flour", "Rice & Flours", "500 g Pack"],
    ["Rice Flour", "Rice & Flours", "500 g Pack"],
    ["Gram Flour Besan", "Rice & Flours", "500 g Pack"],
    ["Corn Flour", "Rice & Flours", "500 g Pack"],
    ["Appalam Flour", "Rice & Flours", "500 g Pack"],

    ["Toor Dal", "Pulses & Dals", "1 kg Pack"],
    ["Moong Dal", "Pulses & Dals", "500 g Pack"],
    ["Urad Dal", "Pulses & Dals", "500 g Pack"],
    ["Chana Dal", "Pulses & Dals", "500 g Pack"],
    ["Masoor Dal", "Pulses & Dals", "500 g Pack"],
    ["Green Gram", "Pulses & Dals", "500 g Pack"],
    ["Black Gram", "Pulses & Dals", "500 g Pack"],
    ["White Chana", "Pulses & Dals", "500 g Pack"],
    ["Black Chana", "Pulses & Dals", "500 g Pack"],
    ["Rajma", "Pulses & Dals", "500 g Pack"],
    ["Cowpeas", "Pulses & Dals", "500 g Pack"],
    ["Horse Gram", "Pulses & Dals", "500 g Pack"],

    ["Sunflower Oil", "Oils & Ghee", "1 Litre Pack"],
    ["Groundnut Oil", "Oils & Ghee", "1 Litre Pack"],
    ["Coconut Oil", "Oils & Ghee", "500 ml Pack"],
    ["Gingelly Oil", "Oils & Ghee", "500 ml Pack"],
    ["Mustard Oil", "Oils & Ghee", "1 Litre Pack"],
    ["Olive Oil", "Oils & Ghee", "500 ml Pack"],
    ["Cow Ghee", "Oils & Ghee", "500 ml Pack"],
    ["Desi Ghee", "Oils & Ghee", "1 Litre Pack"],

    ["Turmeric Powder", "Masalas & Spices", "200 g Pack"],
    ["Chilli Powder", "Masalas & Spices", "200 g Pack"],
    ["Coriander Powder", "Masalas & Spices", "200 g Pack"],
    ["Sambar Powder", "Masalas & Spices", "200 g Pack"],
    ["Rasam Powder", "Masalas & Spices", "100 g Pack"],
    ["Garam Masala", "Masalas & Spices", "100 g Pack"],
    ["Chicken Masala", "Masalas & Spices", "100 g Pack"],
    ["Mutton Masala", "Masalas & Spices", "100 g Pack"],
    ["Biryani Masala", "Masalas & Spices", "100 g Pack"],
    ["Black Pepper", "Masalas & Spices", "100 g Pack"],
    ["Cumin Seeds", "Masalas & Spices", "100 g Pack"],
    ["Mustard Seeds", "Masalas & Spices", "100 g Pack"],

    ["White Sugar", "Essentials", "1 kg Pack"],
    ["Jaggery", "Essentials", "500 g Pack"],
    ["Iodized Salt", "Essentials", "1 kg Pack"],
    ["Rock Salt", "Essentials", "1 kg Pack"],
    ["Tamarind", "Essentials", "500 g Pack"],
    ["Vermicelli", "Essentials", "400 g Pack"],
    ["Sooji Rava", "Essentials", "500 g Pack"],
    ["Poha Aval", "Essentials", "500 g Pack"],
    ["Sabudana", "Essentials", "500 g Pack"],

    ["Potato Chips", "Snacks", "100 g Pack"],
    ["Banana Chips", "Snacks", "150 g Pack"],
    ["Mixture", "Snacks", "200 g Pack"],
    ["Murukku", "Snacks", "200 g Pack"],
    ["Marie Biscuits", "Snacks", "250 g Pack"],
    ["Cream Biscuits", "Snacks", "200 g Pack"],
    ["Salt Biscuits", "Snacks", "200 g Pack"],
    ["Peanut Candy", "Snacks", "100 g Pack"],
    ["Roasted Peanuts", "Snacks", "200 g Pack"],
    ["Rusk Biscuits", "Snacks", "200 g Pack"],

    ["Tea Powder", "Beverages", "250 g Pack"],
    ["Filter Coffee", "Beverages", "250 g Pack"],
    ["Instant Coffee", "Beverages", "100 g Jar"],
    ["Health Drink", "Beverages", "500 g Pack"],
    ["Malted Drink", "Beverages", "500 g Pack"],
    ["Lemon Drink Powder", "Beverages", "200 g Pack"],
    ["Orange Drink Powder", "Beverages", "200 g Pack"],
    ["Rose Milk Mix", "Beverages", "200 g Pack"],
    ["Badam Drink Mix", "Beverages", "200 g Pack"],
    ["Soft Drink", "Beverages", "1 Litre Bottle"],
    ["Packaged Drinking Water", "Beverages", "1 Litre Bottle"],

    ["Bath Soap", "Household", "Pack of 4"],
    ["Washing Soap", "Household", "Pack of 4"],
    ["Detergent Powder", "Household", "1 kg Pack"],
    ["Dishwash Bar", "Household", "Pack of 3"],
    ["Dishwash Liquid", "Household", "500 ml Bottle"],
    ["Floor Cleaner", "Household", "1 Litre Bottle"],
    ["Toilet Cleaner", "Household", "500 ml Bottle"],
    ["Hand Wash", "Household", "250 ml Bottle"],
    ["Toothpaste", "Household", "150 g Pack"],
    ["Toothbrush", "Household", "Pack of 2"],
    ["Match Box", "Household", "Pack of 10"],
    ["Mosquito Coil", "Household", "Pack of 10"],
    ["Garbage Bags", "Household", "Pack of 30"],
    ["Aluminium Foil", "Household", "9 Metres Roll"]
  ].map((item, index) => ({
    id: index + 1,
    name: item[0],
    category: item[1],
    size: item[2],
    image: DEFAULT_IMAGE
  }));

  let selectedCategory = "All";
  let searchText = "";

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem("centralStoresCart")) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem("centralStoresCart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    const topCount = document.getElementById("cartCount");
    const bottomCount = document.getElementById("bottomCartCount");

    if (topCount) topCount.textContent = total;
    if (bottomCount) bottomCount.textContent = total;
  }

  function addToCart(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    const cart = getCart();
    const found = cart.find((item) => item.id === productId);

    if (found) {
      found.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
  }

  function filteredProducts() {
    return products.filter((product) => {
      const categoryOK =
        selectedCategory === "All" || product.category === selectedCategory;

      const searchOK = `${product.name} ${product.category} ${product.size}`
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return categoryOK && searchOK;
    });
  }

  function createCard(product) {
    return `
      <article class="product-card">
        <button class="product-wishlist-btn" type="button" aria-label="Wishlist">
          ♡
        </button>

        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>

        <div class="product-info">
          <span class="product-category-name">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-size">${product.size}</p>

          <div class="product-card-bottom">
            <div class="product-price-call">
              <span>☎</span>
              <span>Price on<br>Call</span>
            </div>

            <button class="product-add-btn" type="button" data-id="${product.id}">
              🛒 Add
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderProducts() {
    const list = filteredProducts();

    if (count) count.textContent = list.length;

    if (title) {
      if (searchText) {
        title.textContent = "Search Results";
      } else if (selectedCategory !== "All") {
        title.textContent = selectedCategory;
      } else {
        title.textContent = "All Daily Essentials";
      }
    }

    if (list.length === 0) {
      grid.innerHTML = "";
      if (noProducts) noProducts.style.display = "block";
      return;
    }

    if (noProducts) noProducts.style.display = "none";

    grid.innerHTML = list.map(createCard).join("");

    document.querySelectorAll(".product-add-btn").forEach((button) => {
      button.addEventListener("click", () => {
        addToCart(Number(button.dataset.id));

        const oldText = button.innerHTML;
        button.innerHTML = "✓ Added";

        setTimeout(() => {
          button.innerHTML = oldText;
        }, 900);
      });
    });

    document.querySelectorAll(".product-wishlist-btn").forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");
        button.textContent = button.classList.contains("active") ? "♥" : "♡";
      });
    });
  }

  document.querySelectorAll(".category-filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.category || "All";

      document.querySelectorAll(".category-filter-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");
      renderProducts();
    });
  });

  const searchInput = document.getElementById("productSearch");
  const clearSearch = document.getElementById("searchClear");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchText = searchInput.value.trim();

      if (clearSearch) {
        clearSearch.classList.toggle("show", searchText.length > 0);
      }

      renderProducts();
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      if (!searchInput) return;

      searchInput.value = "";
      searchText = "";
      clearSearch.classList.remove("show");
      renderProducts();
      searchInput.focus();
    });
  }

  const resetButton = document.getElementById("resetProductsBtn");

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      selectedCategory = "All";
      searchText = "";

      if (searchInput) searchInput.value = "";

      document.querySelectorAll(".category-filter-btn").forEach((button) => {
        button.classList.toggle(
          "active",
          button.dataset.category === "All"
        );
      });

      renderProducts();
    });
  }

  updateCartCount();
  renderProducts();
});
