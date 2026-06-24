document.addEventListener("DOMContentLoaded", function () {
  const openMenuBtn = document.getElementById("openMenu");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuClose = document.getElementById("menuClose");

  if (!openMenuBtn || !sideMenu || !menuOverlay) return;

  function openSideMenu() {
    sideMenu.classList.add("open");
    menuOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeSideMenu() {
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  openMenuBtn.addEventListener("click", openSideMenu);

  if (menuClose) {
    menuClose.addEventListener("click", closeSideMenu);
  }

  menuOverlay.addEventListener("click", closeSideMenu);
});
