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
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}); 