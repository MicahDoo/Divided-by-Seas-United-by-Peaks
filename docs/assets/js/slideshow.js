import slides from './assets/js/slideshow-data.js';

// The 'switchPage' function is needed by the slideshow actions, so we pass it in.
export function initSlideshow(switchPage) {
    let currentSlide = 0;
    const slideshowContainer = document.getElementById('slideshow');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');

    function renderSlide() {
        // --- 1. Render the visual part of the slide ---
        slideshowContainer.innerHTML = ''; // Clear previous slides
        const slide = slides[currentSlide];

        const slideEl = document.createElement('div');
        slideEl.className = 'slide';
        slideEl.style.backgroundImage = `url(${slide.image})`;
        slideEl.style.opacity = '1'; // Always show the current slide
        slideEl.innerHTML = `<div class="slide-text"><p class="text-xl md:text-3xl font-semibold">${slide.text}</p></div>`;
        slideshowContainer.appendChild(slideEl);

        // --- 2. Handle the action button logic ---
        // First, hide all main action buttons to reset the state
        document.querySelectorAll('.action-button').forEach(btn => btn.classList.add('hidden'));

        // Check if the current slide has actions and if we are in web mode
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const isWebMode = window.getComputedStyle(mobileMenuButton).display === 'none';

        if (slide.actions) {
            if (isWebMode) {
                // If so, find and unhide the buttons specified in the slide data
                slide.actions.forEach(action => {
                    const actionBtn = document.getElementById(action.id);
                    if (actionBtn) {
                        actionBtn.classList.remove('hidden');
                    }
                });
            } else {
                //TODO
            }
        }
        
        updateSlideButtons();
    }

    // --- Original button logic remains the same ---
    slideshowContainer.addEventListener('click', (e) => {
        const actionButton = e.target.closest('.action-button');
        if (actionButton && actionButton.dataset.page) {
            switchPage(actionButton.dataset.page);
        }
    });

    function updateSlideButtons() {
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

    // Initial render
    renderSlide();
}
