/* =========================================================
   CENTRAL & STORES - PRODUCTS.JS
   CURRENT VERSION: SIDE MENU ONLY
   Product grid / cart product loading will be added later.
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const openMenuBtn = document.getElementById("openMenuBtn");
  const closeMenuBtn = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");


  /* =========================================================
     SAFETY CHECK
  ========================================================= */

  if (!openMenuBtn || !sideMenu || !menuOverlay) {
    console.warn("Side menu elements not found.");

    console.log({
      openMenuBtn,
      sideMenu,
      menuOverlay
    });

    return;
  }


  /* =========================================================
     OPEN SIDE MENU
  ========================================================= */

  function openSideMenu() {
    sideMenu.classList.add("is-open");
    menuOverlay.classList.add("is-open");

    sideMenu.setAttribute("aria-hidden", "false");

    document.body.classList.add("menu-open");

    setTimeout(function () {
      if (closeMenuBtn) {
        closeMenuBtn.focus();
      }
    }, 250);
  }


  /* =========================================================
     CLOSE SIDE MENU
  ========================================================= */

  function closeSideMenu() {
    sideMenu.classList.remove("is-open");
    menuOverlay.classList.remove("is-open");

    sideMenu.setAttribute("aria-hidden", "true");

    document.body.classList.remove("menu-open");

    setTimeout(function () {
      openMenuBtn.focus();
    }, 250);
  }


  /* =========================================================
     BUTTON EVENTS
  ========================================================= */

  openMenuBtn.addEventListener("click", function () {
    openSideMenu();
  });

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", function () {
      closeSideMenu();
    });
  }

  menuOverlay.addEventListener("click", function () {
    closeSideMenu();
  });


  /* =========================================================
     ESC KEY CLOSE
  ========================================================= */

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSideMenu();
    }
  });


  /* =========================================================
     SWIPE LEFT TO CLOSE MENU - MOBILE
  ========================================================= */

  let touchStartX = 0;
  let touchEndX = 0;

  sideMenu.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  sideMenu.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 70) {
      closeSideMenu();
    }
  }, { passive: true });


  /* =========================================================
     PREVENT CLICK THROUGH WHEN MENU OPEN
  ========================================================= */

  sideMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });


  /* =========================================================
     READY MESSAGE
  ========================================================= */

  console.log("Central & Stores side menu ready.");
});
