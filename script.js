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
    initializePortfolioCarousel();
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
 * @function initializePortfolioCarousel
 * @description Sets up the portfolio items carousel, including navigation,
 * indicators, infinite scroll effect, and keyboard navigation.
 */
function initializePortfolioCarousel() {
    const container = document.getElementById('portfolio-container');
    const prevBtn = document.getElementById('portfolio-prev');
    const nextBtn = document.getElementById('portfolio-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // console.log('Initializing portfolio carousel...');
    // console.log('Container found:', container);
    // console.log('Prev button found:', prevBtn);
    // console.log('Next button found:', nextBtn);
    // console.log('Portfolio items found:', portfolioItems.length);

    if (!container || !prevBtn || !nextBtn || portfolioItems.length === 0) {
        console.error('Carousel elements not found. Initialization aborted.');
        return;
    }
    
    // Duplicate the portfolio items for a basic "infinite" scroll illusion
    const originalItems = Array.from(portfolioItems);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
    });
    
    const allItems = document.querySelectorAll('.portfolio-item'); // Re-query to include clones
    const originalCount = originalItems.length; 
    
    // console.log(`Carousel initialized: ${allItems.length} items (${originalCount} original + ${originalCount} duplicates)`);
    
    let currentSlide = 0;
    // const itemsPerView = 3; // Currently not used directly in logic, but good for context
    const maxSlides = originalCount; // Controls the logical number of "pages" or positions

    /**
     * @function getGapValue
     * @description Retrieves the computed gap value (in pixels) of the carousel container.
     * @param {HTMLElement} element - The carousel container element.
     * @returns {number} The gap value in pixels. Defaults to 0 if not found or not a number.
     */
    function getGapValue(element) {
        const style = window.getComputedStyle(element);
        const gap = parseFloat(style.gap);
        return !isNaN(gap) ? gap : 0; // Default to 0px if gap is not a number (e.g., "normal")
    }

    /**
     * @function updateCarousel
     * @description Updates the carousel's position, indicators, and navigation button states.
     */
    function updateCarousel() {
        if (allItems.length === 0) return; // Should not happen if initialization was successful

        const itemWidth = allItems[0].offsetWidth; // Assumes all items have the same width
        const gapValue = getGapValue(container);
        
        // console.log(`itemWidth: ${itemWidth}, gapValue: ${gapValue}`);

        // Calculate the translateX amount in pixels.
        // This moves the container by the width of one item plus its associated gap.
        const translateX = -(currentSlide * (itemWidth + gapValue));
        // console.log(`currentSlide: ${currentSlide}, translateX: ${translateX}`);
        container.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        if (indicators.length > 0) {
            // Highlight the indicator corresponding to the current position
            const indicatorIndex = currentSlide % originalCount;
            indicators.forEach((indicator, index) => {
                if (index === indicatorIndex) {
                    indicator.classList.remove('bg-gray-300', 'hover:bg-gray-400', 'text-gray-700');
                    indicator.classList.add('bg-blue-600', 'text-white');
                } else {
                    indicator.classList.remove('bg-blue-600', 'text-white');
                    indicator.classList.add('bg-gray-300', 'hover:bg-gray-400', 'text-gray-700');
                }
            });
        }
        
        // Navigation buttons are always enabled due to the "infinite" scroll behavior
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Event listeners for navigation buttons
    // console.log('Adding event listeners to buttons...');
    
    prevBtn.addEventListener('click', () => {
        // console.log('Previous button clicked!');
        currentSlide--;
        if (currentSlide < 0) {
            // To achieve seamless wrap-around with translate,
            // you might need to quickly jump to the equivalent slide in the cloned set
            // and then transition. For this basic setup, it just jumps.
            currentSlide = maxSlides - 1; 
        }
        // console.log(`Previous clicked: currentSlide = ${currentSlide}`);
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        // console.log('Next button clicked!');
        currentSlide++;
        if (currentSlide >= maxSlides) {
            // Similar to prev, for seamless wrap-around, more complex logic is needed.
            // This basic setup resets to the beginning.
            currentSlide = 0; 
        }
        // console.log(`Next clicked: currentSlide = ${currentSlide}`);
        updateCarousel();
    });
    
    // console.log('Event listeners added successfully');
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index; 
            // console.log(`Indicator ${index} clicked: currentSlide = ${currentSlide}`);
            updateCarousel();
        });
    });
    
    // Initialize carousel on window resize to adjust positions and item widths
    window.addEventListener('resize', updateCarousel);

    // Initial setup of the carousel
    updateCarousel();
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (document.activeElement && document.activeElement.closest('#portfolio')) { // Only if focus is within portfolio
            if (e.key === 'ArrowLeft') {
                e.preventDefault(); // Prevent default window scroll
                prevBtn.click(); // Simulate click for consistent behavior
            } else if (e.key === 'ArrowRight') {
                e.preventDefault(); // Prevent default window scroll
                nextBtn.click(); // Simulate click for consistent behavior
            }
        }
    });
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