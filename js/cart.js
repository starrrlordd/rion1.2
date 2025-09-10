let cart = [];
loadCart(); 
renderCart(); 

function loadCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) { 
    cart = JSON.parse(storedCart);  
  }
}


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function renderCart() {
  const cartContainer = document.querySelector(".cart-container");
  const cartTotalEl = document.querySelector(".cart-total");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p>Your cart is empty</p>`;
    cartTotalEl.textContent = "₵ 0.00";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div class="image-description">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="cart-item-details">
        <div class="cart-item-text">${item.name}</div>
        <div class="cart-item-price">₵ ${item.price}</div>
        
      </div>
      </div>
      
      <div class="quantity-buttons">
        <div class="cart-item-quantity">
          <button class="qty-btn decrease" data-index="${index}">-</button>
          <span>${item.quantity || 1}</span>
          <button class="qty-btn increase" data-index="${index}">+</button>
        </div>
      </div>  
      <div class="remove-stotal">
      <button class="remove-btn transparent-button black" data-index="${index}">Remove</button>
      <div class="cart-item-subtotal">₵ ${(item.price * (item.quantity || 1)).toFixed(2)}</div>
      </div>        
    `;

    total += item.price * (item.quantity || 1);
    cartContainer.append(cartItem);
  });

  cartTotalEl.textContent = `₵ ${total.toFixed(2)}`;

  const clearCart = document.querySelector(".clear-cart");
  if (clearCart) {
    clearCart.addEventListener("click", () => {
      cart = [];
      saveCart();
      renderCart();
    })
  }

  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll(".increase").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart[index].quantity = (cart[index].quantity || 1) + 1;
      saveCart();
      renderCart();
    });
  });

  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1); 
      }
      saveCart();
      renderCart();
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });
  });
}
