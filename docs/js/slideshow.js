import { openMenuForActions } from './menu.js';

export function initSlideshow(slides, switchPage) {
    let currentSlide = 0;
    const slideshowContainer = document.getElementById('slideshow');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const mobileMenu = document.getElementById('mobile-menu');

    // Store timeouts to clear them
    const hideTimeouts = new Map(); // Maps element -> timeoutId

    function renderSlides() {
        slideshowContainer.innerHTML = '';
        
        slides.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = 'slide';
            slideEl.style.backgroundImage = `url(${slide.image})`;
            slideEl.style.opacity = index === currentSlide ? '1' : '0';
            slideEl.innerHTML = `<div class="slide-text"><p class="text-xl md:text-3xl font-semibold">${slide.text}</p></div>`;
            slideshowContainer.appendChild(slideEl);
        });

        // Initial UI setup
        updateUI();
    }

    function updateUI() {
        // Update slide opacity
        const slideElements = slideshowContainer.querySelectorAll('.slide');
        slideElements.forEach((slideEl, index) => {
            slideEl.style.opacity = index === currentSlide ? '1' : '0';
        });

        const currentSlideData = slides[currentSlide];

        // Handle action buttons
        document.querySelectorAll('.action-button').forEach(btn => {
            const actionId = btn.id.replace('-mobile', ''); // Normalize ID
            const shouldShow = currentSlideData.actions && currentSlideData.actions.some(action => action.id === actionId);

            // Clear any pending hide timeout for this button
            if (hideTimeouts.has(btn)) {
                clearTimeout(hideTimeouts.get(btn));
                hideTimeouts.delete(btn);
            }

            if (shouldShow) {
                btn.classList.remove('hidden'); // Ensure it's displayed for transition
                setTimeout(() => { // Allow display change to register before opacity transition starts
                    btn.classList.remove('opacity-0', 'pointer-events-none');
                }, 10);
            } else {
                btn.classList.add('opacity-0', 'pointer-events-none');
                // Schedule 'hidden' to be added AFTER the fade-out transition completes
                const timeoutId = setTimeout(() => {
                    btn.classList.add('hidden');
                }, 300); // Match CSS transition duration
                hideTimeouts.set(btn, timeoutId);
            }
        });

        // Handle mobile menu visibility
            // Check if we are on the last slide and if it has actions defined.
        const isLastSlideWithActions = currentSlide === slides.length - 1 && slides[currentSlide].actions;
    
        // If it's the last slide, request the menu to be opened.
        // This no longer uses the global 'window' object.
        const isLastSlideWithActions = currentSlide === slides.length - 1 && slides[currentSlide].actions;
        if (isLastSlideWithActions) {
            openMenuForActions(); // Use the new, more specific function
        }
        
        updateArrowButtons();
    }

    function updateArrowButtons() {
        prevButton.classList.toggle('hidden', currentSlide === 0);
        nextButton.classList.toggle('hidden', currentSlide === slides.length - 1);
    }

    nextButton.addEventListener('click', (e) => {
        // e.preventDefault();
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateUI();
            
        }
    });

    prevButton.addEventListener('click', (e) => {
        // e.preventDefault();
        if (currentSlide > 0) {
            currentSlide--;
            updateUI();
        }
    });

    // This makes the updateUI function available globally
    window.slideshow = {
        updateUI: updateUI
    };

    renderSlides(); 
}
