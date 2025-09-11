const evt = "ontouchstart" in window ? "touchend" : "click";

const seoList = document.querySelector(".seo-banner");
const angleLeft = document.querySelector(".angle-left");
const angleRight = document.querySelector(".angle-right");
const angles = document.querySelectorAll(".angle");

const scrollSeo = (offset) => {
  seoList?.scrollBy({ left: offset, behavior: "smooth" });
};

angleLeft?.addEventListener(evt, () => scrollSeo(-150));
angleRight?.addEventListener(evt, () => scrollSeo(150));

angles.forEach((btn) => {
  btn.addEventListener("touchstart", () => btn.classList.add("add-border"));
  btn.addEventListener("touchend", () => btn.classList.remove("add-border"));
})

document.addEventListener("DOMContentLoaded", () => {
  // Active link
  const navLink = document.querySelectorAll(".nav-link");
  if (navLink.length > 0) {
    navLink.forEach((link) => {
      link.addEventListener("click", () => {
        navLink.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }
});

const hamburger = document.querySelector(".hamburger-button");
const closeButton = document.querySelector(".close-button");
const navLinks = document.querySelector(".nav-links");
const icons = document.querySelector(".icons");
const cartButton = document.querySelector(".cart-button");

function toggleHamburger(e) {
  e.preventDefault();
  if (!icons || !navLinks || !closeButton) return;
  icons.classList.add("hidden");
  closeButton.classList.toggle("open");
  navLinks.classList.toggle("open");
}

function toggleCloseButton(e) {
  e.preventDefault();
  if (!icons || !navLinks || !closeButton) return;
  icons.classList.remove("hidden");
  closeButton.classList.remove("open");
  navLinks.classList.remove("open");
}

function addPressEffect(button) {
  if (!button) return;

  button.addEventListener("touchstart", () => {
    button.classList.add("is-pressed");
  });

  button.addEventListener("touchend", () => {
    button.classList.remove("is-pressed");
  });
}

if (hamburger) {
  hamburger.addEventListener(evt, toggleHamburger);
  addPressEffect(hamburger);
}

if (closeButton) {
  closeButton.addEventListener(evt, toggleCloseButton);
  addPressEffect(closeButton);
}
