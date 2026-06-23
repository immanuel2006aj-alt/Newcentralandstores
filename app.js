document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("productsGrid");
  const count = document.getElementById("productCount");

  if (grid) {
    grid.innerHTML = `
      <div style="
        grid-column: 1 / -1;
        padding: 30px;
        background: red;
        color: white;
        font-size: 20px;
        font-weight: bold;
        border-radius: 15px;
      ">
        APP.JS WORKING — PRODUCTS: ${products.length}
      </div>
    `;
  }

  if (count) {
    count.textContent = products.length;
  }
});
