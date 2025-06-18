console.log('Script.js loaded successfully!');

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
};

// Execute JavaScript after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired!');
    initializePortfolioCarousel();
});

// Portfolio Carousel functionality
function initializePortfolioCarousel() {
    const container = document.getElementById('portfolio-container');
    const prevBtn = document.getElementById('portfolio-prev');
    const nextBtn = document.getElementById('portfolio-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    console.log('Initializing portfolio carousel...');
    console.log('Container found:', container);
    console.log('Prev button found:', prevBtn);
    console.log('Next button found:', nextBtn);
    console.log('Portfolio items found:', portfolioItems.length);

    if (!container || !prevBtn || !nextBtn || portfolioItems.length === 0) {
        console.error('Carousel elements not found. Initialization aborted.');
        return;
    }
    
    // Duplicate the portfolio items for infinite scroll
    const originalItems = Array.from(portfolioItems);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
    });
    
    // Get all items after duplication
    const allItems = document.querySelectorAll('.portfolio-item');
    const totalItems = allItems.length; // Should be 12 (6 original + 6 duplicates)
    const originalCount = originalItems.length; // 6 original items
    
    console.log(`Carousel initialized: ${totalItems} items (${originalCount} original + ${originalCount} duplicates)`);
    
    let currentSlide = 0;
    const itemsPerView = 3; // Show 3 items at a time
    const maxSlides = originalCount; // We can scroll through all 6 original positions
    
    // Function to get the computed gap value in pixels
    function getGapValue(element) {
        const style = window.getComputedStyle(element);
        return parseFloat(style.gap) || 32; // Default to 32px if gap is not found
    }

    // Function to update carousel position
    function updateCarousel() {
        // Get the current item width and gap value
        const itemWidth = allItems[0].offsetWidth;
        const gapValue = getGapValue(container);
        
        console.log(`itemWidth: ${itemWidth}, gapValue: ${gapValue}`);

        // Calculate the translateX in pixels
        // We move by the width of one item plus its right gap
        const translateX = -(currentSlide * (itemWidth + gapValue));
        console.log(`currentSlide: ${currentSlide}, translateX: ${translateX}`);
        container.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators (if we have them)
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
        
        // Navigation buttons are always enabled for infinite scroll
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Event listeners for navigation buttons
    console.log('Adding event listeners to buttons...');
    
    prevBtn.addEventListener('click', () => {
        console.log('Previous button clicked!');
        currentSlide--;
        // Wrap around to the last position when going below 0
        if (currentSlide < 0) {
            currentSlide = maxSlides - 1; // Show the last position (5)
        }
        console.log(`Previous clicked: currentSlide = ${currentSlide}`);
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        console.log('Next button clicked!');
        currentSlide++;
        // Wrap around to the first position when going past the max
        if (currentSlide >= maxSlides) {
            currentSlide = 0; // Reset to show first 3 items
        }
        console.log(`Next clicked: currentSlide = ${currentSlide}`);
        updateCarousel();
    });
    
    console.log('Event listeners added successfully');
    
    // Event listeners for indicators (if we have them)
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index; // Use the indicator index directly
            console.log(`Indicator ${index} clicked: currentSlide = ${currentSlide}`);
            updateCarousel();
        });
    });
    
    // Initialize carousel on window resize to adjust positions
    window.addEventListener('resize', updateCarousel);

    // Initialize carousel
    updateCarousel();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault(); // Prevent default scroll behavior
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = maxSlides - 1; // Show the last position (5)
            }
            console.log(`Left arrow pressed: currentSlide = ${currentSlide}`);
            updateCarousel();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault(); // Prevent default scroll behavior
            currentSlide++;
            if (currentSlide >= maxSlides) {
                currentSlide = 0; // Reset to show first 3 items
            }
            console.log(`Right arrow pressed: currentSlide = ${currentSlide}`);
            updateCarousel();
        }
    });
}

// Function to open a modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Function to close a modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = ''; // Restore background scrolling
    }
}

// Function to close a modal when clicking the backdrop
function closeModalOnBackdrop(event, modalId) {
    // Only close if the click was directly on the backdrop (modal element)
    if (event.target.id === modalId) {
        closeModal(modalId);
    }
}