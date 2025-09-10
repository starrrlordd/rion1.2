// This script toggles the 'expanded' class on an image when it is clicked
// Ensure the DOM is fully loaded before attaching event listeners

const myImage = document.getElementById("myImage");

document.addEventListener('DOMContentLoaded', function() {
    myImage.addEventListener("click", () => {

    })
})

document.getElementById('myImage').addEventListener('click', function() {
    this.classList.toggle('expanded');
});

























// Hamburger menu variables 
const hamburger = document.querySelector(".hamburger-button");
const closeButton = document.querySelector(".close-button");
const navLinks = document.querySelector(".nav-links");
const icons = document.querySelector(".icons");

// Hamburger menu toggle functionality
// Ensure the DOM is fully loaded before attaching event listeners

const toggleHamburger = function () {
    icons.classList.add("hidden");
}

//  Hamburger event listener 
hamburger.addEventListener("click", toggleHamburger);

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);
