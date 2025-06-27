export function initSlideshow(slides, switchPage) {
    let currentSlide = 0;
    const slideshowContainer = document.getElementById('slideshow');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');

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

        // --- This is the key logic for your request ---
        // 1. Get the data for the currently visible slide.
        const currentSlideData = slides[currentSlide];

        // 2. Hide all the main action buttons by default.
        document.querySelectorAll('.action-button').forEach(btn => btn.classList.add('hidden'));

        // 3. Check if we are on a desktop-sized screen.
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const isWebMode = window.getComputedStyle(mobileMenuButton).display === 'none';

        // 4. If the current slide's data has an 'actions' property AND we are in web mode...
        if (currentSlideData.actions && isWebMode) {
            // ...then loop through those actions and remove the 'hidden' class from the matching buttons.
            currentSlideData.actions.forEach(action => {
                const actionBtn = document.getElementById(action.id);
                if (actionBtn) {
                    actionBtn.classList.remove('hidden');
                }
            });
        }
        
        // Update the visibility of the prev/next arrow buttons
        updateArrowButtons();
    }

    function updateArrowButtons() {
        prevButton.classList.toggle('hidden', currentSlide === 0);
        nextButton.classList.toggle('hidden', currentSlide === slides.length - 1);
    }

    // --- Event Handlers ---
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateUI();
        }
    });

    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentSlide > 0) {
            currentSlide--;
            updateUI();
        }
    });

    // Initial call to set up the slideshow
    renderSlides(); 
}
