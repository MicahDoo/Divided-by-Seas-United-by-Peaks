import { Navigation } from './modules/navigation.js';
import { CourseManager } from './modules/courses.js';
import { UIEffects } from './modules/ui-effects.js';
import { ChartManager } from './modules/charts.js';
import { BudgetCalculator } from './modules/budget.js';
import { ModalManager } from './modules/modals.js';
import { TabManager } from './modules/tabs.js';
import { LanguageManager } from './modules/language.js';
import { initSlideshow } from './slideshow.js';
import slidesData from './slideshow-data.js';
import { coursesData } from './data/courses.js';
import { langData } from './data/language.js';

export class App {
    constructor() {
        this.modules = {};
        this.init();
    }
    
    async init() {
        try {
            // Initialize core modules
            this.modules.navigation = new Navigation();
            this.modules.modalManager = new ModalManager();
            this.modules.tabManager = new TabManager();
            this.modules.uiEffects = new UIEffects();
            
            // Initialize page-specific modules
            await this.initPageModules();
            
            // Initialize slideshow
            initSlideshow(slidesData, (page) => this.modules.navigation.switchPage(page));
            
            // Set initial page
            this.modules.navigation.switchPage('journey');
            
            console.log('Application initialized successfully');
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showErrorMessage('Failed to load the application. Please refresh the page.');
        }
    }
    
    async initPageModules() {
        // Plan page modules
        if (DOM.findById('plan-page')) {
            this.modules.courseManager = new CourseManager(coursesData);
            this.modules.budgetCalculator = new BudgetCalculator();
        }
        
        // Dossier page modules
        if (DOM.findById('dossier-page')) {
            this.modules.chartManager = new ChartManager();
            this.modules.languageManager = new LanguageManager(langData, this.modules.chartManager);
        }
        
        // List page modules (if on list page)
        if (DOM.findById('comparison-chart')) {
            this.modules.chartManager = new ChartManager();
        }
    }
    
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    destroy() {
        // Clean up all modules
        Object.values(this.modules).forEach(module => {
            if (module.destroy) {
                module.destroy();
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
