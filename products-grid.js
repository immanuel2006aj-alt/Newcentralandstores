/* =========================================================
   CENTRAL & STORES — PREMIUM MINI PRODUCT GRID
   File: products-grid.js
========================================================= */

const products = [
  {
    id: "rice-001",
    name: "India Gate Basmati Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    price: 189,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rice-002",
    name: "Daawat Basmati Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    price: 179,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rice-003",
    name: "Fortune Biryani Special Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    price: 169,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rice-004",
    name: "Ponni Boiled Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    price: 82,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dal-001",
    name: "Toor Dal Premium",
    category: "Pulses & Dals",
    weight: "1 kg",
    price: 156,
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "oil-001",
    name: "Fortune Sunflower Oil",
    category: "Oils & Ghee",
    weight: "1 L",
    price: 145,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "masala-001",
    name: "Aachi Chicken Masala",
    category: "Masalas",
    weight: "100 g",
    price: 58,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "beverage-001",
    name: "Bru Instant Coffee",
    category: "Beverages",
    weight: "100 g",
    price: 112,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
  }
];

/* =========================================================
   CART STORAGE
========================================================= */

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("centralStoresCart")) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("centralStoresCart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const cartCountElements = document.querySelectorAll(
    "#bottomCartCount, #cartCount, .cart-count"
  );

  cartCountElements.forEach((element) => {
    element.textContent = totalItems;
  });
}

/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId, button) {
  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) return;

  const cart = getCart();

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: selectedProduct.id,
      name: selectedProduct.name,
      category: selectedProduct.category,
      weight: selectedProduct.weight,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();

  button.classList.add("added");
  button.textContent = "Added";

  setTimeout(() => {
    button.classList.remove("added");
    button.textContent = "Add";
  }, 1000);
}

/* =========================================================
   WISHLIST BUTTON
========================================================= */

function toggleWishlist(button) {
  const isActive = button.classList.toggle("active");

  button.textContent = isActive ? "♥" : "♡";
}

/* =========================================================
   PRODUCT CARD TEMPLATE
========================================================= */

function createProductCard(product) {
  return `
    <article class="mini-product-card">
      <div class="mini-product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'"
        >

        <button
          class="mini-wishlist-btn"
          type="button"
          aria-label="Add ${product.name} to wishlist"
        >
          ♡
        </button>
      </div>

      <div class="mini-product-details">
        <span class="mini-product-category">${product.category}</span>

        <h3 class="mini-product-name">${product.name}</h3>

        <span class="mini-product-weight">${product.weight}</span>

        <div class="mini-product-bottom">
          <strong class="mini-product-price">₹${product.price}</strong>

          <button
            class="mini-add-btn"
            type="button"
            data-id="${product.id}"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  `;
}

/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(productList = products) {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");

  if (!productsGrid) {
    console.error("productsGrid element not found.");
    return;
  }

  if (productCount) {
    productCount.textContent = `${productList.length} PRODUCTS`;
  }

  productsGrid.innerHTML = productList
    .map((product) => createProductCard(product))
    .join("");

  const addButtons = productsGrid.querySelectorAll(".mini-add-btn");

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.id, button);
    });
  });

  const wishlistButtons = productsGrid.querySelectorAll(".mini-wishlist-btn");

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleWishlist(button);
    });
  });
}

/* =========================================================
   CATEGORY FILTER
   Works with buttons having data-category=""
========================================================= */

function setupCategoryFilter() {
  const categoryButtons = document.querySelectorAll("[data-category]");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.category;

      categoryButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      if (
        selectedCategory === "All Products" ||
        selectedCategory === "all" ||
        selectedCategory === ""
      ) {
        renderProducts(products);
        return;
      }

      const filteredProducts = products.filter((product) => {
        return product.category === selectedCategory;
      });

      renderProducts(filteredProducts);
    });
  });
}

/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
  setupCategoryFilter();
});
