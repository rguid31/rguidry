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
    const container = document.getElementById('portfolio-container');
    const prevBtn = document.getElementById('portfolio-prev');
    const nextBtn = document.getElementById('portfolio-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!container || !prevBtn || !nextBtn || portfolioItems.length === 0) {
        console.log('Portfolio carousel elements not found, skipping initialization');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = portfolioItems.length; // 6 items total
    
    function getItemsPerView() {
        return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    }
    
    function getMaxSlide() {
        const itemsPerView = getItemsPerView();
        // For 6 items showing 3 at a time: max slide = 6 - 3 = 3 (slides 0,1,2,3)
        // For 6 items showing 2 at a time: max slide = 6 - 2 = 4 (slides 0,1,2,3,4)  
        // For 6 items showing 1 at a time: max slide = 6 - 1 = 5 (slides 0,1,2,3,4,5)
        return Math.max(0, totalSlides - itemsPerView);
    }
    
    function updateCarousel() {
        // Wait for DOM to be ready and get actual computed width
        setTimeout(() => {
            const containerRect = container.parentElement.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const itemsPerView = getItemsPerView();
            
            // Calculate gap based on CSS variables
            const style = getComputedStyle(container);
            const gap = parseFloat(style.gap) || (window.innerWidth >= 768 ? 32 : 16);
            
            // Calculate item width based on visible container width
            let itemWidth;
            if (itemsPerView === 3) {
                itemWidth = (containerWidth - (gap * 2)) / 3;
            } else if (itemsPerView === 2) {
                itemWidth = (containerWidth - gap) / 2;
            } else {
                itemWidth = containerWidth;
            }
            
            const translateX = -(currentSlide * (itemWidth + gap));
            
            console.log(`Debug: currentSlide=${currentSlide}, itemsPerView=${itemsPerView}, maxSlide=${getMaxSlide()}, translateX=${translateX}`);
            
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
            
            // Update button states
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide >= maxSlide;
            
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
            const maxSlide = getMaxSlide();
            console.log(`Indicator ${index} clicked, max slide:`, maxSlide);
            currentSlide = Math.min(index, maxSlide);
            updateCarousel();
        });
        
        // Add keyboard navigation for accessibility
        indicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const maxSlide = getMaxSlide();
                currentSlide = Math.min(index, maxSlide);
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