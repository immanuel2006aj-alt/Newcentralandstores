const products = [
  {
    id: "rice-001",
    name: "India Gate Basmati Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    price: 189
  },
  {
    id: "rice-002",
    name: "Daawat Basmati Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    price: 179
  },
  {
    id: "rice-003",
    name: "Fortune Biryani Special Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    price: 169
  },
  {
    id: "rice-004",
    name: "Ponni Boiled Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    price: 82
  },
  {
    id: "dal-001",
    name: "Toor Dal Premium",
    category: "Pulses & Dals",
    weight: "1 kg",
    price: 156
  },
  {
    id: "oil-001",
    name: "Fortune Sunflower Oil",
    category: "Oils & Ghee",
    weight: "1 L",
    price: 145
  },
  {
    id: "masala-001",
    name: "Aachi Chicken Masala",
    category: "Masalas",
    weight: "100 g",
    price: 48
  },
  {
    id: "coffee-001",
    name: "Bru Instant Coffee",
    category: "Beverages",
    weight: "100 g",
    price: 95
  }
];

const productsGrid = document.getElementById("productsGrid");
const productCount = document.getElementById("productCount");

function renderProducts() {
  if (!productsGrid) return;

  if (productCount) {
    productCount.textContent = `${products.length} PRODUCTS`;
  }

  productsGrid.innerHTML = products.map((product) => {
    return `
      <article class="mini-product-card">
        <div class="mini-product-image">
          <span class="mini-image-placeholder">Product Image</span>

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
              + Add
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", renderProducts);
