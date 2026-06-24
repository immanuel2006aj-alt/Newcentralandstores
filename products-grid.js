document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");
  const productCount = document.getElementById("productCount");
  const cartBadge = document.getElementById("cartCount");

  if (!productsGrid) return;

  const products = productsData.map((product) => ({
    ...product,
    price: productPrices[product.id] || 0
  }));

  function renderProducts(items) {
    productsGrid.innerHTML = "";

    items.forEach((product) => {
      productsGrid.innerHTML += `
        <article class="premium-product-card">
          <div class="premium-product-image">
            <div class="no-product-image">
              <span>NO IMAGE</span>
            </div>

            <button
              class="premium-wishlist-btn"
              type="button"
              aria-label="Add ${product.name} to wishlist"
            >
              ♡
            </button>
          </div>

          <div class="premium-product-info">
            <span class="premium-product-category">
              ${product.category}
            </span>

            <h3 class="premium-product-name">
              ${product.name}
            </h3>

            <span class="premium-product-weight">
              ${product.weight}
            </span>

            <div class="premium-product-footer">
              <strong class="premium-product-price">
                ₹${product.price}
              </strong>

              <button
                class="premium-add-cart-btn"
                type="button"
                data-id="${product.id}"
              >
                <span>+</span> Add
              </button>
            </div>
          </div>
        </article>
      `;
    });

    if (productCount) {
      productCount.textContent = items.length;
    }

    bindCartButtons();
    bindWishlistButtons();
  }

  function bindCartButtons() {
    const addButtons = document.querySelectorAll(".premium-add-cart-btn");

    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = Number(button.dataset.id);

        const selectedProduct = products.find(
          (product) => product.id === productId
        );

        if (!selectedProduct) return;

        addToCart(selectedProduct, button);
      });
    });
  }

  function addToCart(product, button) {
    const cart = JSON.parse(localStorage.getItem("centralCart")) || [];

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem("centralCart", JSON.stringify(cart));

    button.classList.add("added");
    button.innerHTML = "✓ Added";

    setTimeout(() => {
      button.classList.remove("added");
      button.innerHTML = "<span>+</span> Add";
    }, 1000);

    updateCartBadge();
  }

  function bindWishlistButtons() {
    const wishlistButtons = document.querySelectorAll(
      ".premium-wishlist-btn"
    );

    wishlistButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");

        if (button.classList.contains("active")) {
          button.textContent = "♥";
        } else {
          button.textContent = "♡";
        }
      });
    });
  }

  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("centralCart")) || [];

    const totalItems = cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    if (cartBadge) {
      cartBadge.textContent = totalItems;
    }
  }

  renderProducts(products);
  updateCartBadge();
});
