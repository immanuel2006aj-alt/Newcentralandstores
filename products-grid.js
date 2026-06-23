const products = [
  {
    id: 1,
    category: "Rice & Flours",
    name: "India Gate Basmati Rice",
    weight: "1 kg",
    price: 189,
    image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    category: "Rice & Flours",
    name: "Daawat Basmati Rice",
    weight: "1 kg",
    price: 179,
    image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    category: "Rice & Flours",
    name: "Fortune Biryani Special Rice",
    weight: "1 kg",
    price: 169,
    image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    category: "Rice & Flours",
    name: "Ponni Boiled Rice",
    weight: "1 kg",
    price: 82,
    image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    category: "Oils & Ghee",
    name: "Fortune Sunflower Oil",
    weight: "1 L",
    price: 145,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    category: "Beverages",
    name: "Three Roses Tea",
    weight: "250 g",
    price: 125,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    category: "Biscuits",
    name: "Oreo Original Biscuits",
    weight: "120 g",
    price: 35,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    category: "Instant Foods",
    name: "Maggi 2-Minute Noodles",
    weight: "280 g",
    price: 56,
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=500&q=80"
  }
];

const productsGrid = document.getElementById("productsGrid");
const productCount = document.getElementById("productCount");

function renderProducts(productList) {
  if (!productsGrid) return;

  productsGrid.innerHTML = productList.map((product) => {
    return `
      <article class="mini-product-card">
        <div class="mini-product-image">
          <img src="${product.image}" alt="${product.name}">
          <button class="mini-wishlist-btn" type="button" aria-label="Add ${product.name} to wishlist">♡</button>
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

  if (productCount) {
    productCount.textContent = `${productList.length} PRODUCTS`;
  }

  document.querySelectorAll(".mini-add-btn").forEach((button) => {
    button.addEventListener("click", function () {
      this.textContent = "Added ✓";
      this.classList.add("added");

      setTimeout(() => {
        this.textContent = "+ Add";
        this.classList.remove("added");
      }, 1200);
    });
  });

  document.querySelectorAll(".mini-wishlist-btn").forEach((button) => {
    button.addEventListener("click", function () {
      this.textContent = this.textContent === "♡" ? "♥" : "♡";
    });
  });
}

renderProducts(products);
