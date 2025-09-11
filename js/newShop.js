const overlaySidebar = document.querySelector(".overlay-x-sidebar");

// =============================
// PRODUCT NAV LINKS (Active state)
// =============================
const productLinks = document.querySelectorAll(".p-list li a");

productLinks.forEach((link) => {
  link.addEventListener("click", () => {
    productLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// =============================
// DATA & STATE
// =============================
let cart = [];
let products = [];

// =============================
// FETCH PRODUCTS
// =============================
async function getAllProducts() {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    products = await response.json();
    console.log(products)

    const grid = document.getElementById("products-container");
    grid.innerHTML = ""; 

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.dataset.id = product.id;
      card.dataset.name = product.name;
      card.dataset.price = product.price;
      card.dataset.category = product.category;

      card.innerHTML = `
        <div class="pro-image-container">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <div class="pro-details">
            <div class="product-name">${product.name}</div>
            <div class="add-to-cart">
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
          <div class="pro-price">
            <div class="product-price">₵${product.price}</div>
          </div>
        </div>
      `;

      grid.appendChild(card);
      setupOverlay(card, product);
    });

    // After rendering products → apply URL filter if any
    applyUrlCategory();
  } catch (error) {
    console.log("Failed to fetch products:", error);
  }
}

// =============================
// EXPANDED PRODUCT WITH OVERLAY
// =============================
const productOverlay = document.querySelector(".product-overlay");

console.log(productOverlay)

 

const closeXbutton = document.querySelector(".close-x-button");
if (closeXbutton) {
  closeXbutton.addEventListener("click", () => {
    productOverlay.classList.remove("overlayactive");
  });
}

function openProductOverlay(product) {
  const zoomProDescription = document.querySelector(
    ".zoom-product-description"
  );
  const expandImage = document.getElementById("zoom-image");
  const expandedPrice = document.getElementById("zoom-product-price");
  expandImage.src = product.image;

  productOverlay.classList.add("overlayactive");
  zoomProDescription.innerHTML = `${product.name}`;
  expandedPrice.innerHTML = `₵${product.price}`;
}

function setupOverlay(card, product) {
  function touchStart() {
    card.style.border = "1px solid black";
  }

  function touchEnd() {
    card.style.border = "none";
  }

  function handleClick() {
    if (window.innerWidth <= 430) {
      openProductOverlay(product);
    }
  }

  
  card.addEventListener("touchstart", () => {
    touchStart();
  });

  
  card.addEventListener("touchend", () => {
    touchEnd();
    handleClick();
  });
}

// =============================
// CATEGORY FILTERING
// =============================
function setupCategoryFiltering() {
  productLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const category = link.textContent.toLowerCase().trim();
      filterProducts(category);
    });
  });
}

function filterProducts(category) {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    if (card.dataset.category === category || category === "inventory") {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });


  productLinks.forEach((link) => {
    const linkCategory = link.textContent.toLowerCase().trim();
    if (linkCategory === category) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}


function applyUrlCategory() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  if (category) {
    filterProducts(category.toLowerCase());
  } else {
    filterProducts("inventory");
  }
}

// =============================
// CART LOGIC
// =============================

// Add to cart (event delegation)
document
  .getElementById("products-container")
  .addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart");
    
    if (button) {
      const card = button.closest(".product-card");
      const productId = card.dataset.id;
      const product = products.find((p) => p.id == productId);

      if (product) {
        addItem(product);
        openCart();
      }
    }
  });

function addItem(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
  }

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.dataset.id = item.id;

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <button class="remove">x</button>
        <img src="${item.image}" alt="${item.name}">
        <span>${item.name}</span>
      </div>
      <div class="cart-item-actions">
        <button class="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="increase">+</button>
        <span class="subtotal">₵${item.price * item.quantity}</span>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `Total: ₵${total}`;
  saveCart();
}

// Cart buttons
document.getElementById("cart-items").addEventListener("click", (event) => {
  const button = event.target;
  const cartItem = button.closest(".cart-item");
  if (!cartItem) return;

  const productId = cartItem.dataset.id;
  const item = cart.find((i) => i.id == productId);

  if (button.classList.contains("increase")) {
    item.quantity += 1;
  } else if (button.classList.contains("decrease")) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.id != productId);
    }
  } else if (button.classList.contains("remove")) {
    cart = cart.filter((i) => i.id != productId);
  }

  renderCart();
  saveCart();
});


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    renderCart();
  }
}

const sidebar = document.querySelector(".cart-sidebar");
const cartCloseButton = document.querySelector(".cart-close");

function openCart() {
  sidebar.classList.add("open");
  overlaySidebar.classList.add("open")
}

function closeCart() {
  sidebar.classList.remove("open");
  overlaySidebar.classList.remove("open")
}

cartCloseButton.addEventListener("click", closeCart);

// =============================
// INIT
// =============================
getAllProducts().then(() => {
  setupCategoryFiltering();
  loadCart();
});
