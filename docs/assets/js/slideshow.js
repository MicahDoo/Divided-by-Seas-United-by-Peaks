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

        const currentSlideData = slides[currentSlide];

        document.querySelectorAll('.action-button').forEach(btn => btn.classList.add('hidden'));

        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const isWebMode = window.getComputedStyle(mobileMenuButton).display === 'none';

        if (currentSlideData.actions) {
            currentSlideData.actions.forEach(action => {
                const actionBtn = document.getElementById(action.id);
                if (actionBtn) {
                    actionBtn.classList.remove('hidden');
                }
                const actionBtnMobile = document.getElementById(action.id + "-mobile");
                if (actionBtnMobile) {
                    actionBtnMobile.classList.remove('hidden');
                }
            });
        }
        
        updateArrowButtons();
    }

    function updateArrowButtons() {
        prevButton.classList.toggle('hidden', currentSlide === 0);
        nextButton.classList.toggle('hidden', currentSlide === slides.length - 1);
    }

    nextButton.addEventListener('click', (e) => {
        //e.preventDefault();
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
