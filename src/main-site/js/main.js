// Navigation scroll effect and progress bar
document.addEventListener('DOMContentLoaded', function() {
    try {
        const nav = document.querySelector('.nav');
        if (!nav) {
            throw new Error('Navigation element not found');
        }
        let lastScroll = 0;

        // Function to update progress bar
        function updateProgressBar() {
            try {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight - windowHeight;
                const scrolled = window.scrollY;
                const progress = scrolled / documentHeight;
                
                // Update the progress bar width
                nav.style.setProperty('--scroll-progress', progress);
                nav.style.setProperty('--scroll-transform', `scaleX(${progress})`);
            } catch (error) {
                console.error('Error updating progress bar:', error);
            }
        }

        // Add scroll event listener
        window.addEventListener('scroll', function() {
            try {
                const currentScroll = window.scrollY;
                
                // Update progress bar
                updateProgressBar();
                
                // Add shadow when scrolled
                if (currentScroll > 0) {
                    nav.classList.add('nav--scrolled');
                } else {
                    nav.classList.remove('nav--scrolled');
                }
                
                lastScroll = currentScroll;
            } catch (error) {
                console.error('Error handling scroll event:', error);
            }
        });

        // Initial call to set progress bar on page load
        updateProgressBar();

        // Mobile menu toggle logic
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            const menuIcon = mobileMenuButton.querySelector('.mobile-menu-icon');
            const closeIcon = mobileMenuButton.querySelector('.mobile-menu-close');
            
            if (!menuIcon || !closeIcon) {
                throw new Error('Mobile menu icons not found');
            }

            mobileMenuButton.addEventListener('click', () => {
                try {
                    mobileMenu.classList.toggle('nav-mobile--hidden');
                    menuIcon.classList.toggle('hidden');
                    closeIcon.classList.toggle('hidden');
                    // Prevent body scroll when menu is open
                    document.body.style.overflow = mobileMenu.classList.contains('nav-mobile--hidden') ? '' : 'hidden';
                } catch (error) {
                    console.error('Error toggling mobile menu:', error);
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                try {
                    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.classList.contains('nav-mobile--hidden')) {
                        mobileMenu.classList.add('nav-mobile--hidden');
                        menuIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                        document.body.style.overflow = '';
                    }
                } catch (error) {
                    console.error('Error handling mobile menu click outside:', error);
                }
            });

            // Close mobile menu when clicking a link
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    try {
                        mobileMenu.classList.add('nav-mobile--hidden');
                        menuIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                        document.body.style.overflow = '';
                    } catch (error) {
                        console.error('Error handling mobile menu link click:', error);
                    }
                });
            });
        }

        // Ensure scroll restoration is 'auto' for back/forward navigation
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'auto';
        }

        // Initialize portfolio carousel
        initializePortfolioCarousel();
        
        // Initialize lazy loading
        initializeLazyLoading();
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
});

// Ensure carousel is initialized after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (typeof initializePortfolioCarousel === 'function') {
        initializePortfolioCarousel();
    }
});

// Lazy Loading Implementation
function initializeLazyLoading() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy-load');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all images with loading="lazy"
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.classList.add('lazy-load');
            imageObserver.observe(img);
        });
    }
}

// Portfolio Carousel Functionality
function initializePortfolioCarousel() {
    console.log('🔧 Initializing portfolio carousel from main.js...');
    
    const container = document.getElementById('portfolio-container');
    const prevBtn = document.getElementById('portfolio-prev');
    const nextBtn = document.getElementById('portfolio-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    console.log('🔍 Carousel elements found:', {
        container: !!container,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        indicators: indicators.length,
        portfolioItems: portfolioItems.length
    });
    
    // Debug: Log all portfolio items
    console.log('📋 Portfolio items found:', portfolioItems);
    portfolioItems.forEach((item, index) => {
        console.log(`Item ${index}:`, item.textContent?.trim().substring(0, 50));
    });
    
    if (!container || !prevBtn || !nextBtn || portfolioItems.length === 0) {
        console.log('❌ Portfolio carousel elements not found, skipping initialization');
        return;
    }
    
    console.log('✅ All carousel elements found, proceeding with initialization');
    
    // Debug: Check if idea-board-item exists
    const ideaBoardItem = document.getElementById('idea-board-item');
    console.log('🔍 Idea Board Item found:', !!ideaBoardItem);
    if (ideaBoardItem) {
        console.log('📋 Idea Board Item content:', ideaBoardItem.textContent?.trim().substring(0, 50));
    }
    
    let currentSlide = 0;
    const totalSlides = portfolioItems.length; // 7 items total
    
    console.log(`📊 Carousel setup: ${totalSlides} total slides`);
    
    function getItemsPerView() {
        return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    }
    
    function getMaxSlide() {
        const itemsPerView = getItemsPerView();
        // For 7 items: allow navigation to show last items
        // Desktop (3 items): max slide = 4 (shows items 4,5,6)
        // Tablet (2 items): max slide = 5 (shows items 5,6)  
        // Mobile (1 item): max slide = 6 (shows item 6)
        return totalSlides - 1;
    }
    
    function updateCarousel() {
        // Wait for DOM to be ready and get actual computed width
        setTimeout(() => {
            const itemsPerView = getItemsPerView();
            
            // Use fixed item width calculation that matches CSS
            let itemWidth;
            let gap;
            
            if (itemsPerView === 3) {
                // Desktop: 3 items per view with 2rem gap
                itemWidth = 400; // max-width from CSS
                gap = 32; // 2rem = 32px
            } else if (itemsPerView === 2) {
                // Tablet: 2 items per view with 2rem gap
                itemWidth = 400; // max-width from CSS
                gap = 32; // 2rem = 32px
            } else {
                // Mobile: 1 item per view with 1rem gap
                itemWidth = 400; // max-width from CSS
                gap = 16; // 1rem = 16px
            }
            
            const translateX = -(currentSlide * (itemWidth + gap));
            
            console.log(`Debug: currentSlide=${currentSlide}, itemsPerView=${itemsPerView}, maxSlide=${getMaxSlide()}, translateX=${translateX}, totalSlides=${totalSlides}`);
            console.log(`Debug: itemWidth=${itemWidth}, gap=${gap}`);
            
            container.style.transform = `translateX(${translateX}px)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.remove('bg-gray-300', 'text-gray-700');
                    indicator.classList.add('bg-blue-600', 'text-white');
                } else {
                    indicator.classList.remove('bg-blue-600', 'text-white');
                    indicator.classList.add('bg-gray-300', 'text-gray-700');
                }
            });
            
            const maxSlide = getMaxSlide();
            
            // Update button states - Fix: Allow navigation to all slides
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide >= maxSlide;
            
            console.log(`Debug: Button states - prev disabled: ${prevBtn.disabled}, next disabled: ${nextBtn.disabled}, maxSlide: ${maxSlide}`);
            
            if (prevBtn.disabled) {
                prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
            
            if (nextBtn.disabled) {
                nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }, 10);
    }
    
    // Navigation event listeners
    prevBtn.addEventListener('click', () => {
        console.log('Prev clicked, current slide:', currentSlide);
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const maxSlide = getMaxSlide();
        console.log('Next clicked, current slide:', currentSlide, 'max slide:', maxSlide);
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    });
    
    // Indicator event listeners - each represents starting at that item
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log(`Indicator ${index} clicked - setting currentSlide to ${index}`);
            currentSlide = index;
            updateCarousel();
        });
        
        // Add keyboard navigation for accessibility
        indicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log(`Indicator ${index} activated via keyboard - setting currentSlide to ${index}`);
                currentSlide = index;
                updateCarousel();
            }
        });
    });
    
    // Keyboard navigation for carousel
    container.addEventListener('keydown', (e) => {
        const maxSlide = getMaxSlide();
        if (e.key === 'ArrowLeft' && currentSlide > 0) {
            e.preventDefault();
            currentSlide--;
            updateCarousel();
        } else if (e.key === 'ArrowRight' && currentSlide < maxSlide) {
            e.preventDefault();
            currentSlide++;
            updateCarousel();
        }
    });
    
    // Responsive handling - recalculate on resize
    window.addEventListener('resize', () => {
        setTimeout(() => {
            const maxSlide = getMaxSlide();
            currentSlide = Math.min(currentSlide, maxSlide);
            updateCarousel();
        }, 100);
    });
    
    // Initialize carousel
    updateCarousel();
} 