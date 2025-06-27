// This function receives the slides and the switchPage function as arguments
// It does NOT import the slide data itself.

export function initSlideshow(slides, switchPage) {
    let currentSlide = 0;
    const slideshowContainer = document.getElementById('slideshow');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');

    function renderSlide() {
        // --- 1. Render the visual part of the slide ---
        slideshowContainer.innerHTML = ''; // Clear previous slides
        const slideData = slides[currentSlide];

        const slideEl = document.createElement('div');
        // We set a background image and transition properties for a fade effect
        slideEl.className = 'slide absolute inset-0 transition-opacity duration-1000 ease-in-out';
        slideEl.style.backgroundImage = `url(${slideData.image})`;
        // Set opacity to 1 to make it visible
        slideEl.style.opacity = '1'; 
        
        slideEl.innerHTML = `<div class="slide-text"><p class="text-xl md:text-3xl font-semibold">${slideData.text}</p></div>`;
        slideshowContainer.appendChild(slideEl);

        // --- 2. Handle the action button logic ---
        // First, hide all main action buttons to reset the state
        document.querySelectorAll('.action-button').forEach(btn => btn.classList.add('hidden'));

        // Check if we are in "web mode" (i.e., not mobile)
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const isWebMode = window.getComputedStyle(mobileMenuButton).display === 'none';

        // If the current slide has an 'actions' array and we're in web mode...
        // if (slideData.actions && isWebMode) {
        //     // ...loop through the actions and show the corresponding buttons.
        //     slideData.actions.forEach(action => {
        //         const actionBtn = document.getElementById(action.id);
        //         if (actionBtn) {
        //             actionBtn.classList.remove('hidden');
        //         }
        //     });
        // }
        
        // Update the visibility of the prev/next slideshow buttons
        updateSlideButtons();
    }

    // --- Event Handlers for Slideshow Navigation ---
    function updateSlideButtons(){
        prevButton.classList.toggle('hidden', currentSlide === 0);
        nextButton.classList.toggle('hidden', currentSlide === slides.length - 1);
    }

    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            renderSlide();
        }
    });

    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentSlide > 0) {
            currentSlide--;
            renderSlide();
        }
    });

    // --- Initial setup ---
    renderSlide();
}
