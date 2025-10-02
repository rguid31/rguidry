/**
 * @file Main JavaScript file for the portfolio website.
 * @description This script handles dynamic content updates, navigation behavior (smooth scrolling),
 * modal dialog interactions (open/close), and the portfolio carousel functionality.
 */

/**
 * Executes when the entire page, including all assets, has finished loading.
 * This function is responsible for initializing event listeners and performing
 * tasks that should only run after the full page is ready.
 */
window.onload = function() {
    
    // Set the current year in the footer dynamically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add click event listener to close modals when clicking outside the modal content
    document.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('[id$="-modal"]');
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Add escape key listener to close any open modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('[id$="-modal"]:not(.hidden)');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });

    // Mobile menu toggle functionality
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

/**
 * Executes when the initial HTML document has been completely loaded and parsed.
 * This is the ideal place to initialize functionality that depends on the DOM tree,
 * such as the portfolio carousel, without waiting for images to load.
 */
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolioCarousel();
    initializePortfolioButtonTest(); 
});

/**
 * Initializes a test script for portfolio buttons.
 * This function was moved from an inline script in index.html.
 * It logs button presence and adds dummy click listeners for testing purposes.
 */
function initializePortfolioButtonTest() {
    setTimeout(() => {
        const prevBtn = document.getElementById('portfolio-prev');
        const nextBtn = document.getElementById('portfolio-next');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                // Note: These listeners are for testing. The actual carousel
                // functionality is handled by initializePortfolioCarousel.
            });

            nextBtn.addEventListener('click', () => {});
        }
    }, 2000); // Original timeout kept
}

/**
 * Sets up the portfolio items carousel.
 * This includes initializing navigation buttons, indicators, an "infinite" scroll
 * effect by cloning items, and adding keyboard navigation for accessibility.
 */
function initializePortfolioCarousel() {
    const container = document.getElementById('portfolio-container');
    const prevBtn = document.getElementById('portfolio-prev');
    const nextBtn = document.getElementById('portfolio-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!container || !prevBtn || !nextBtn || portfolioItems.length === 0) {
        console.error('Carousel elements not found. Initialization aborted.');
        return;
    }
    
    const originalItems = Array.from(portfolioItems);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
    });
    
    const allItems = document.querySelectorAll('.portfolio-item');
    const originalCount = originalItems.length; 
    
    let currentSlide = 0;
    const maxSlides = originalCount;

    /**
     * Retrieves the computed gap value (in pixels) of the carousel container.
     * @param {HTMLElement} element - The carousel container element.
     * @returns {number} The gap value in pixels.
     */
    function getGapValue(element) {
        const style = window.getComputedStyle(element);
        const gap = parseFloat(style.gap);
        return !isNaN(gap) ? gap : 0;
    }

    /**
     * Updates the carousel's visual state.
     * This function handles the `transform` property to show the correct slide,
     * updates the active indicator, and ensures navigation buttons are correctly styled.
     */
    function updateCarousel() {
        if (allItems.length === 0) return;

        const itemWidth = allItems[0].offsetWidth;
        const gapValue = getGapValue(container);
        
        const translateX = -(currentSlide * (itemWidth + gapValue));
        container.style.transform = `translateX(${translateX}px)`;
        
        if (indicators.length > 0) {
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
        
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    prevBtn.addEventListener('click', () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = maxSlides - 1; 
        }
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        if (currentSlide >= maxSlides) {
            currentSlide = 0; 
        }
        updateCarousel();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index; 
            updateCarousel();
        });
    });
    
    window.addEventListener('resize', updateCarousel);

    updateCarousel();
    
    document.addEventListener('keydown', (e) => {
        if (document.activeElement && document.activeElement.closest('#portfolio')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextBtn.click();
            }
        }
    });
}

/**
 * Opens a modal dialog by its ID and prevents background scrolling.
 * @param {string} modalId - The ID of the modal element to open.
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Closes a modal dialog by its ID and restores background scrolling.
 * @param {string} modalId - The ID of the modal element to close.
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

/**
 * Closes a modal if a click event occurs directly on its backdrop.
 * @param {Event} event - The click event object.
 * @param {string} modalId - The ID of the modal to check against.
 */
function closeModalOnBackdrop(event, modalId) {
    if (event.target.id === modalId) {
        closeModal(modalId);
    }
}