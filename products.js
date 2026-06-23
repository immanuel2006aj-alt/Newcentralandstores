/* =========================================
   SIDE MENU CONTROLS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("openMenuBtn");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenu = document.getElementById("closeMenu");

  function openSideMenu() {
    if (!sideMenu || !menuOverlay) return;

    sideMenu.classList.add("is-open");
    menuOverlay.classList.add("is-open");
    sideMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  }

  function closeSideMenu() {
    if (!sideMenu || !menuOverlay) return;

    sideMenu.classList.remove("is-open");
    menuOverlay.classList.remove("is-open");
    sideMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  menuButton?.addEventListener("click", openSideMenu);
  closeMenu?.addEventListener("click", closeSideMenu);
  menuOverlay?.addEventListener("click", closeSideMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSideMenu();
  });
});
