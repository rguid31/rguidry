// This function runs once the entire page is loaded
window.onload = function() {
    
    // Set the current year in the footer dynamically
    // This means you won't have to update it manually every year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // You can add more interactive elements here later.
    // For example, a "scroll to top" button, portfolio filters,
    // or animations that trigger on scroll.
    console.log("Portfolio ready and running from script.js!");

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};
