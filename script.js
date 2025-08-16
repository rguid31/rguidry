// console.log('Script.js loaded successfully!');

/**
 * @file script.js
 * @description Main JavaScript file for the portfolio website, handling dynamic content,
 * navigation, modals, and the portfolio carousel.
 */

// This function runs once the entire page is loaded
window.onload = function() {
    
    // Set the current year in the footer dynamically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // console.log("Portfolio ready and running from script.js!");

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add click event listener to close modals when clicking outside
    document.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('[id$="-modal"]');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Add escape key listener to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('[id$="-modal"]:not(.hidden)');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const closeIcon = mobileMenuButton.querySelector('.mobile-menu-close');
            const burgerIcon = mobileMenuButton.querySelector('.mobile-menu-icon');
            const isHidden = mobileMenu.classList.contains('nav-mobile--hidden');
            if (isHidden) {
                mobileMenu.classList.remove('nav-mobile--hidden');
                mobileMenu.style.display = 'block';
                if (closeIcon) closeIcon.classList.remove('hidden');
                if (burgerIcon) burgerIcon.classList.add('hidden');
            } else {
                mobileMenu.classList.add('nav-mobile--hidden');
                mobileMenu.style.display = 'none';
                if (closeIcon) closeIcon.classList.add('hidden');
                if (burgerIcon) burgerIcon.classList.remove('hidden');
            }
        });
    }
};

// Execute JavaScript after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // console.log('DOMContentLoaded event fired!');
    // initializePortfolioCarousel(); // Removed - now handled by main.js
    initializePortfolioButtonTest(); 
});

/**
 * @function initializePortfolioButtonTest
 * @description Initializes a test script for portfolio buttons.
 * This function was moved from an inline script in index.html.
 * It logs button presence and adds dummy click listeners for testing purposes.
 */
function initializePortfolioButtonTest() {
    // console.log('Testing portfolio buttons from script.js...');
    setTimeout(() => {
        const prevBtn = document.getElementById('portfolio-prev');
        const nextBtn = document.getElementById('portfolio-next');
        // console.log('External script test - Prev button:', prevBtn);
        // console.log('External script test - Next button:', nextBtn);

        if (prevBtn && nextBtn) {
            // console.log('Buttons found - adding test listeners from external script');

            prevBtn.addEventListener('click', () => {
                // Note: These listeners are for testing and will log to console.
                // The actual carousel functionality is handled by initializePortfolioCarousel.
                // console.log('EXTERNAL SCRIPT TEST: Prev button clicked!');
            });

            nextBtn.addEventListener('click', () => {
                // console.log('EXTERNAL SCRIPT TEST: Next button clicked!');
            });
        } else {
            // console.log('Portfolio buttons NOT found by external script! prevBtn: ' + prevBtn + ', nextBtn: ' + nextBtn);
        }
    }, 2000); // Original timeout kept
}

/**
 * @function openModal
 * @description Opens a modal dialog by its ID.
 * @param {string} modalId - The ID of the modal element to open.
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex'); // Assuming 'flex' is used to display it
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

/**
 * @function closeModal
 * @description Closes a modal dialog by its ID.
 * @param {string} modalId - The ID of the modal element to close.
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = ''; // Restore background scrolling
    }
}

/**
 * @function closeModalOnBackdrop
 * @description Closes a modal if a click event occurs directly on its backdrop.
 * @param {Event} event - The click event.
 * @param {string} modalId - The ID of the modal to check against.
 */
function closeModalOnBackdrop(event, modalId) {
    // Only close if the click was directly on the backdrop (the modal element itself)
    if (event.target.id === modalId) {
        closeModal(modalId);
    }
}