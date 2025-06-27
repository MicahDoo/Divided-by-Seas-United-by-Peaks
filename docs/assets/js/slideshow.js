// This is the slideshow logic

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

        updateUI();
    }

    function updateUI() {
        const slideElements = slideshowContainer.querySelectorAll('.slide');
        slideElements.forEach((slideEl, index) => {
            slideEl.style.opacity = index === currentSlide ? '1' : '0';
        });

        document.querySelectorAll('.action-button').forEach(btn => btn.classList.add('hidden'));

        const currentSlideData = slides[currentSlide];
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const isWebMode = window.getComputedStyle(mobileMenuButton).display === 'none';

        if (currentSlideData.actions && isWebMode) {
            currentSlideData.actions.forEach(action => {
                const actionBtn = document.getElementById(action.id);
                if (actionBtn) {
                    actionBtn.classList.remove('hidden');
                }
            });
        }
        
        updateArrowButtons();
    }

    // This function contains the definitive logic for button visibility
    function updateArrowButtons() {
        // Use classList.toggle to add/remove 'hidden' based on the condition.
        // Hide the 'prev' button if the current slide is the first one (index 0).
        prevButton.classList.toggle('hidden', currentSlide === 0);

        // Hide the 'next' button if the current slide is the last one.
        nextButton.classList.toggle('hidden', currentSlide === slides.length - 1);
    }

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

    renderSlides(); 
}
