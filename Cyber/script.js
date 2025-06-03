// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });
    // Close menu on link click (mobile UX)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
    document.addEventListener("DOMContentLoaded", function () {
    const servicesGrid = document.querySelector(".services-grid");
    const toggleBtn = document.getElementById("toggle-services-btn");

    toggleBtn.addEventListener("click", function () {
        servicesGrid.classList.toggle("show-more");
        toggleBtn.textContent = servicesGrid.classList.contains("show-more") ? "Show Less" : "Show More";
    });
});

} 