import { debounce } from '../utils/debounce.js';
import { DOM } from '../utils/dom-helpers.js';

export class UIEffects {
    constructor() {
        this.heroTextPanel = DOM.findById('hero-text-panel');
        this.storyButtonContainer = DOM.findById('storyButtonContainer');
        this.storyButton = DOM.findById('story-button');
        
        this.initScrollEffects();
        this.initProgressBar();
    }
    
    initScrollEffects() {
        const debouncedOpacityUpdate = debounce(() => {
            this.updateStoryButtonOpacity();
        }, 16);
        
        const debouncedProgressUpdate = debounce(() => {
            this.updateProgressBar();
        }, 16);
        
        window.addEventListener('scroll', () => {
            debouncedOpacityUpdate();
            debouncedProgressUpdate();
        });
        
        // Initial calls
        this.updateStoryButtonOpacity();
    }
    
    updateStoryButtonOpacity() {
        // Only apply if on journey page
        if (!this.heroTextPanel || !this.storyButtonContainer || !this.storyButton ||
            DOM.findById('journey-page').classList.contains('hidden')) {
            if (this.storyButton) {
                this.storyButton.style.opacity = '';
            }
            return;
        }
        
        const heroRect = this.heroTextPanel.getBoundingClientRect();
        const buttonRect = this.storyButtonContainer.getBoundingClientRect();
        const overlap = heroRect.bottom - buttonRect.top;
        
        const opacity = this.calculateOpacity(overlap);
        this.storyButton.style.opacity = opacity.toFixed(2);
    }
    
    calculateOpacity(overlap) {
        const initialOpacity = 0.15;
        const finalOpacity = 1;
        const fadeZoneHeight = 200;
        const exponentialPower = 3;
        
        if (overlap <= 0) return finalOpacity;
        if (overlap >= fadeZoneHeight) return initialOpacity;
        
        const normalizedOverlap = overlap / fadeZoneHeight;
        return initialOpacity + (finalOpacity - initialOpacity) * 
               Math.pow(1 - normalizedOverlap, exponentialPower);
    }
    
    initProgressBar() {
        // Progress bar logic for plan page
        // ... your existing progress bar code
    }
    
    updateProgressBar() {
        if (DOM.findById('plan-page').classList.contains('hidden')) return;
        // ... your existing progress bar update logic
    }
}
