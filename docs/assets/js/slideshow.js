import slides from './slideshow-data.js';

// The 'switchPage' function is needed by the slideshow actions, so we pass it in.
export function initSlideshow(switchPage) {
    let currentSlide = 0;
    const slideshowContainer = document.getElementById('slideshow');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');

    function renderSlide() {
        // ... (The entire renderSlide function from your original code)
        slideshowContainer.innerHTML = '';
        slides.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = 'slide';
            slideEl.style.backgroundImage = `url(${slide.image})`;
            slideEl.style.opacity = index === currentSlide ? '1' : '0';
            
            let actionsHTML = '';
            if (slide.actions) {
                // This complex HTML can stay here as it's part of the slide's "view"
                actionsHTML = `<div class="absolute top-0 left-0 right-0 h-full pointer-events-none">
                    <div class="container mx-auto px-4">
                        <nav class="flex justify-between items-center py-4">
                            <div class="text-xl md:text-2xl font-bold opacity-0">🏔️ Micah's Mountain Quest</div>
                            <div class="hidden md:flex items-center space-x-8">
                                <div class="relative"><div class="opacity-0 font-medium border-b-2 border-transparent">Journey</div></div>
                                <div class="relative">
                                    <div class="opacity-0 font-medium border-b-2 border-transparent">Taiwan's Issues</div>
                                    <button data-page="taiwan" class="action-link absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold hover:text-glow transition flex flex-col items-center gap-1 pointer-events-auto">
                                        <span class="text-2xl">☝️</span>
                                        <span class="max-w-[150px] leading-tight text-center">Read about<br>hiking issues<br>in Taiwan</span>
                                    </button>
                                </div>
                                <div class="relative">
                                    <div class="opacity-0 font-medium border-b-2 border-transparent">Plan</div>
                                    <button data-page="plan" class="action-link absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold hover:text-glow transition flex flex-col items-center gap-1 pointer-events-auto">
                                        <span class="text-2xl">☝️</span>
                                        <span class="max-w-[150px] leading-tight text-center">See my<br>action plan</span>
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>`;
            }

            slideEl.innerHTML = `<div class="slide-text"><p class="text-xl md:text-3xl font-semibold">${slide.text}</p></div> ${actionsHTML}`;
            slideshowContainer.appendChild(slideEl);
        });
        updateSlideButtons();
    }
    
    slideshowContainer.addEventListener('click', (e) => {
        const actionButton = e.target.closest('.action-link');
        if(actionButton && actionButton.dataset.page) {
            switchPage(actionButton.dataset.page);
        }
    });

    function updateSlideButtons(){
        prevButton.classList.toggle('hidden', currentSlide === 0);
        nextButton.classList.toggle('hidden', currentSlide === slides.length - 1);
    }

    nextButton.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            renderSlide();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            renderSlide();
        }
    });

    // Initial render
    renderSlide();
}
