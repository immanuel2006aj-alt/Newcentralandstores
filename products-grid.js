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
    id: "oil-001",
    name: "Fortune Sunflower Oil",
    category: "Oils & Ghee",
    weight: "1 L",
    price: 145,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dal-001",
    name: "Toor Dal Premium",
    category: "Pulses & Dals",
    weight: "1 kg",
    price: 156,
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "snack-001",
    name: "Sunfeast Marie Light",
    category: "Biscuits",
    weight: "250 g",
    price: 45,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "drink-001",
    name: "Bru Instant Coffee",
    category: "Beverages",
    weight: "100 g",
    price: 98,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
  }
];

let cart = JSON.parse(localStorage.getItem("centralCart")) || [];

function saveCart() {
  localStorage.setItem("centralCart", JSON.stringify(cart));
}

function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  const bottomCartCount = document.getElementById("bottomCartCount");
  const headerCartCount = document.getElementById("headerCartCount");

  if (bottomCartCount) bottomCartCount.textContent = totalItems;
  if (headerCartCount) headerCartCount.textContent = totalItems;
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      ...product,
      qty: 1
    });
  }

  saveCart();
  updateCartCount();

  const button = document.querySelector(`[data-product-id="${productId}"]`);

  if (button) {
    const oldText = button.innerHTML;

    button.classList.add("added");
    button.innerHTML = "✓ Added";

    setTimeout(() => {
      button.classList.remove("added");
      button.innerHTML = oldText;
    }, 1200);
  }
}

function renderProducts() {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");

  if (!productsGrid) return;

  if (productCount) {
    productCount.textContent = `${products.length} PRODUCTS`;
  }

  productsGrid.innerHTML = products
    .map(
      (product) => `
        <article class="mini-product-card">

          <div class="mini-product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <button class="mini-wishlist" type="button" aria-label="Add ${product.name} to wishlist">♡</button>
          </div>

          <div class="mini-product-info">
            <span class="mini-product-category">${product.category}</span>

            <h3>${product.name}</h3>

            <p class="mini-product-weight">${product.weight}</p>

            <div class="mini-product-bottom">
              <span class="mini-product-price">₹${product.price}</span>

              <button
                class="mini-add-btn"
                type="button"
                data-product-id="${product.id}"
              >
                Add
              </button>
            </div>
          </div>

        </article>
      `
    )
    .join("");

  document.querySelectorAll(".mini-add-btn").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.productId);
    });
  });

  document.querySelectorAll(".mini-wishlist").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      button.textContent = button.classList.contains("active") ? "♥" : "♡";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
});
