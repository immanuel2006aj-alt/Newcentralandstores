/* =========================================================
   CENTRAL & STORES - PRODUCTS.CSS
   PREMIUM PRODUCT GRID + PRICE + ADD CART BUTTON
   ========================================================= */

:root {
  --black: #151515;
  --gold: #e8aa00;
  --gold-light: #ffbd00;
  --gold-dark: #b58500;
  --white: #ffffff;
  --page-bg: #f8f7f3;
  --border: #e9e4d9;
  --muted: #777777;
}

/* =========================================================
   PRODUCTS LIST SECTION
   ========================================================= */

.products-list-section {
  padding: 34px 18px 110px;
  background: var(--page-bg);
}

.products-list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 22px;
}

.section-eyebrow {
  display: block;
  margin-bottom: 7px;
  color: var(--gold-dark);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1.8px;
  text-transform: uppercase;
}

.products-list-heading h2 {
  margin: 0;
  color: var(--black);
  font-size: 31px;
  font-weight: 900;
  line-height: 1.1;
}

.products-count-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 88px;
  min-height: 88px;
  padding: 10px;
  border: 1px solid #ead58c;
  border-radius: 22px;
  background: #fff8df;
  box-shadow: 0 6px 18px rgba(232, 170, 0, 0.1);
}

.products-count-box strong {
  color: var(--black);
  font-size: 28px;
  font-weight: 900;
  line-height: 1;
}

.products-count-box span {
  margin-top: 6px;
  color: var(--gold-dark);
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1px;
}

/* =========================================================
   PRODUCT GRID
   ========================================================= */

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

/* =========================================================
   PRODUCT CARD
   ========================================================= */

.product-card {
  overflow: hidden;
  min-width: 0;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(20, 20, 20, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:active {
  transform: scale(0.98);
}

.product-image {
  position: relative;
  padding: 8px 8px 0;
  background: #f7f3e9;
}

.product-image img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 0.7;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

/* =========================================================
   WISHLIST BUTTON
   ========================================================= */

.product-wishlist-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 39px;
  height: 39px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.96);
  color: #171717;
  font-size: 27px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.product-wishlist-btn.active {
  color: #d73b3b;
}

/* =========================================================
   PRODUCT DETAILS
   ========================================================= */

.product-details {
  display: flex;
  flex-direction: column;
  min-height: 252px;
  padding: 13px 12px 13px;
}

.product-category {
  margin: 0 0 7px;
  color: var(--gold-dark);
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.8px;
  line-height: 1.2;
  text-transform: uppercase;
}

.product-details h3 {
  display: -webkit-box;
  overflow: hidden;
  min-height: 48px;
  margin: 0;
  color: var(--black);
  font-size: 16px;
  font-weight: 900;
  line-height: 1.3;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-weight {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 14px;
  font-weight: 600;
}

.product-price-wrap {
  margin-top: 12px;
}

.product-price-label {
  display: block;
  margin-bottom: 3px;
  color: var(--gold-dark);
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 1px;
}

.product-price {
  margin: 0;
  color: var(--black);
  font-size: 18px;
  font-weight: 900;
  line-height: 1.1;
}

/* =========================================================
   PREMIUM ADD BUTTON
   ========================================================= */

.add-cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 47px;
  margin-top: auto;
  padding: 10px 12px;
  border: 0;
  border-radius: 11px;
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: #111111;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 9px 16px rgba(230, 170, 0, 0.24);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.add-cart-btn:active {
  transform: scale(0.96);
}

.add-cart-btn.added {
  background: var(--black);
  color: var(--white);
}

.add-cart-icon {
  font-size: 27px;
  font-weight: 400;
  line-height: 0;
}

/* =========================================================
   EMPTY PRODUCTS STATE
   ========================================================= */

.products-empty-state {
  grid-column: 1 / -1;
  padding: 45px 20px;
  text-align: center;
  border: 1px dashed #d8c985;
  border-radius: 18px;
  background: #fffdf6;
}

.products-empty-state[hidden] {
  display: none;
}

.products-empty-state h3 {
  margin: 14px 0 8px;
  color: var(--black);
  font-size: 20px;
}

.products-empty-state p {
  margin: 0 0 18px;
  color: var(--muted);
}

.products-empty-state button {
  padding: 12px 18px;
  border: 0;
  border-radius: 10px;
  background: var(--black);
  color: var(--white);
  font-weight: 800;
  cursor: pointer;
}

/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 380px) {
  .products-list-section {
    padding-right: 13px;
    padding-left: 13px;
  }

  .products-grid {
    gap: 9px;
  }

  .products-list-heading h2 {
    font-size: 27px;
  }

  .products-count-box {
    width: 74px;
    min-height: 74px;
    border-radius: 18px;
  }

  .products-count-box strong {
    font-size: 24px;
  }

  .product-card {
    border-radius: 14px;
  }

  .product-image {
    padding: 7px 7px 0;
  }

  .product-details {
    min-height: 235px;
    padding: 10px 10px 11px;
  }

  .product-category {
    font-size: 8px;
  }

  .product-details h3 {
    min-height: 42px;
    font-size: 13px;
  }

  .product-weight {
    font-size: 12px;
  }

  .product-price {
    font-size: 16px;
  }

  .add-cart-btn {
    min-height: 42px;
    font-size: 13px;
  }

  .add-cart-icon {
    font-size: 23px;
  }
}

/* =========================================================
   TABLET
   ========================================================= */

@media (min-width: 600px) {
  .products-list-section {
    padding: 48px 30px 120px;
  }

  .products-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  .product-details {
    min-height: 246px;
    padding: 14px;
  }

  .product-category {
    font-size: 10px;
  }

  .product-details h3 {
    font-size: 15px;
  }
}

/* =========================================================
   DESKTOP
   ========================================================= */

@media (min-width: 1000px) {
  .products-list-section {
    max-width: 1280px;
    margin: 0 auto;
    padding: 58px 40px 120px;
  }

  .products-list-heading h2 {
    font-size: 34px;
  }

  .products-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 34px rgba(20, 20, 20, 0.1);
  }

  .product-details {
    min-height: 252px;
    padding: 16px;
  }

  .product-details h3 {
    font-size: 17px;
  }

  .add-cart-btn {
    min-height: 50px;
  }
}
