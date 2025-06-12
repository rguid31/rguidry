// Navigation scroll effect and progress bar
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing navigation effects');
    const nav = document.querySelector('.nav');
    console.log('Navigation element:', nav);
    let lastScroll = 0;

    // Function to update progress bar
    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = scrolled / documentHeight;
        
        console.log('Scroll progress:', progress);
        // Update the progress bar width
        nav.style.setProperty('--scroll-progress', progress);
        nav.style.setProperty('--scroll-transform', `scaleX(${progress})`);
    }

    // Add scroll event listener
    window.addEventListener('scroll', function() {
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
    });

    // Initial call to set progress bar on page load
    updateProgressBar();
    console.log('Navigation effects initialized');
}); 