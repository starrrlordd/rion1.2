// Setting the active product link in the product list 
const productLinks = document.querySelectorAll(".p-list li a");

// Looping through the links and setting the active link
if (productLinks) {
  productLinks.forEach( (link) => {
    link.addEventListener("click", () => {
      product.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    })
  })
}

// Filtering the products according to what's clicked
const productCards = document.querySelectorAll(".product-card");
const product = document.querySelectorAll(".product");

productLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const category = link.textContent.toLowerCase().trim();
    productCards.forEach((card) => {
      if (card.dataset.category === category || category === "inventory") {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Event listener for filtering products based on category from URL
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  // Show/hide product cards
  if (category) {
    productCards.forEach((card) => {
      if (card.dataset.category === category || category === "inventory") {
        card.style.display = "block"; 
      } else {
        card.style.display = "none"; 
      }
    });

    // Set active link based on category
    productLinks.forEach((link) => {
      const linkCategory = link.textContent.toLowerCase().trim();
      if (linkCategory === category.toLowerCase().trim()) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  } else {
    // If no category, show all and default to inventory active
    productCards.forEach((card) => {
      card.style.display = "block";
    });

    productLinks.forEach((link) => {
      const linkCategory = link.textContent.toLowerCase().trim();
      if (linkCategory === "inventory") {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
});