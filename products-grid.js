/* =========================================================
   CENTRAL & STORES — FLIPKART STYLE PRODUCT GRID
========================================================= */

const products = [
  {
    id: "rice-001",
    name: "India Gate Basmati Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "rice-002",
    name: "Daawat Basmati Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "rice-003",
    name: "Fortune Biryani Special Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "rice-004",
    name: "Ponni Boiled Rice",
    category: "Rice & Flours",
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "dal-001",
    name: "Toor Dal Premium",
    category: "Pulses & Dals",
    weight: "1 kg",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e5?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "oil-001",
    name: "Fortune Sunflower Oil",
    category: "Oils & Ghee",
    weight: "1 L",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "masala-001",
    name: "Aachi Chicken Masala",
    category: "Masalas",
    weight: "100 g",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "coffee-001",
    name: "Bru Instant Coffee",
    category: "Beverages",
    weight: "100 g",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80"
  }
];

function createProductCard(product) {
  return `
    <article class="flipkart-product-card">
      <div class="flipkart-product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        <button
          class="flipkart-wishlist-btn"
          type="button"
          aria-label="Add ${product.name} to wishlist"
        >
          ♡
        </button>
      </div>

      <div class="flipkart-product-details">
        <span class="flipkart-product-category">${product.category}</span>

        <h3 class="flipkart-product-name">${product.name}</h3>

        <span class="flipkart-product-weight">${product.weight}</span>
      </div>
    </article>
  `;
}

function renderProducts(productList = products) {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");

  if (!productsGrid) return;

  if (productCount) {
    productCount.textContent = `${productList.length} PRODUCTS`;
  }

  productsGrid.innerHTML = productList
    .map((product) => createProductCard(product))
    .join("");

  document.querySelectorAll(".flipkart-wishlist-btn").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      button.textContent = button.classList.contains("active") ? "♥" : "♡";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
