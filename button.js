/* =========================================
   CENTRAL & STORES - MENU + THEME BUTTONS
========================================= */

/* MENU */
const openMenuBtn = document.getElementById("openMenu");
const closeMenuBtn = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

function openSideMenu() {
  if (sideMenu) sideMenu.classList.add("open");
  if (menuOverlay) menuOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeSideMenu() {
  if (sideMenu) sideMenu.classList.remove("open");
  if (menuOverlay) menuOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

if (openMenuBtn) {
  openMenuBtn.addEventListener("click", openSideMenu);
}

if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", closeSideMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", closeSideMenu);
}

/* THEME */
const themeSwitch = document.getElementById("themeSwitch");
const themeModeText = document.getElementById("themeModeText");

function applyTheme(mode) {
  const isLight = mode === "light";

  document.body.classList.toggle("light-mode", isLight);

  if (themeSwitch) {
    themeSwitch.classList.toggle("active", isLight);

    const iconUse = themeSwitch.querySelector("use");
    if (iconUse) {
      iconUse.setAttribute("href", isLight ? "#icon-sun" : "#icon-moon");
    }
  }

  if (themeModeText) {
    themeModeText.textContent = isLight ? "Light Mode" : "Dark Mode";
  }
}

const savedTheme = localStorage.getItem("centralStoresTheme") || "dark";
applyTheme(savedTheme);

if (themeSwitch) {
  themeSwitch.addEventListener("click", function () {
    const nextTheme = document.body.classList.contains("light-mode")
      ? "dark"
      : "light";

    localStorage.setItem("centralStoresTheme", nextTheme);
    applyTheme(nextTheme);
  });
                         }
