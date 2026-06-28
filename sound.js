// ===============================
// Central & Stores Sound Effects
// ===============================

const addCartSound = new Audio("add-cart.mp3");
addCartSound.volume = 0.6;

function playAddCartSound() {
    addCartSound.currentTime = 0;
    addCartSound.play().catch(() => {});
}

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".add-cart-btn").forEach(button => {

        button.addEventListener("click", () => {
            playAddCartSound();
        });

    });

});
