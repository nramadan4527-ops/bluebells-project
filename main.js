/* ===== Cart Counter ===== */
let cartCount = 0;

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.innerText = cartCount;
  }
}

function addToCart(name, price) {
  cartCount++;
  document.getElementById("cart-count").innerText = cartCount;

  alert(name + " added to cart 🛒");
}

window.addEventListener("load", () => {
  updateCartCount();
});

/* ===== Navbar Scroll Effect ===== */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ===== Hero Button Animation ===== */
const heroBtn = document.querySelector(".btn");

if (heroBtn) {
  heroBtn.addEventListener("mouseenter", () => {
    heroBtn.style.transform = "scale(1.05)";
  });

  heroBtn.addEventListener("mouseleave", () => {
    heroBtn.style.transform = "scale(1)";
  });
}

/* ===== Page Load Animation ===== */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});