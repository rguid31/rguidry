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
