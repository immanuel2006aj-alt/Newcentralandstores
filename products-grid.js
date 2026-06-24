document.addEventListener("DOMContentLoaded", () => {

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".add-btn, .add-cart-btn");

    if (!button) return;

    const card = button.closest(".product-card");

    if (!card) return;

    const name = card.querySelector(".product-name")?.textContent.trim();
    const category = card.querySelector(".product-category")?.textContent.trim();
    const weight = card.querySelector(".product-weight")?.textContent.trim();
    const price = card.querySelector(".product-price")?.textContent.trim();

    if (!name) return;

    const id = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    addProductToCart({
      id,
      name,
      category,
      weight,
      price
    });

    const oldText = button.innerHTML;

    button.classList.add("added");
    button.innerHTML = "✓ Added";

    setTimeout(() => {
      button.classList.remove("added");
      button.innerHTML = oldText;
    }, 800);
  });

});
