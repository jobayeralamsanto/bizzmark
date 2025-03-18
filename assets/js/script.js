// start script for mobile menu

// Function to toggle mobile menu
function toggleMobileMenu() {
  var mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("show");
}

// Function to close mobile menu
function closeMobileMenu() {
  var mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.remove("show");
}

// end script for mobile menu

AOS.init({
  once: false,
  duration: 1200,
  mirror: true,
});
