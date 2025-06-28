// Import all modules
import { Navigation } from './modules/navigation.js';
import { CourseManager } from './modules/courses.js';
import { UIEffects } from './modules/ui-effects.js';
import { ChartManager } from './modules/charts.js';
import { initSlideshow } from './slideshow.js';
import slidesData from './slideshow-data.js';
import { coursesData } from './data/courses-data.js';

// Application initialization
class App {
    constructor() {
        this.modules = {};
        this.init();
    }
    
    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeModules());
            } else {
                this.initializeModules();
            }
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showErrorMessage();
        }
    }
    
    initializeModules() {
        try {
            // Initialize modules in dependency order
            this.modules.navigation = new Navigation();
            this.modules.courseManager = new CourseManager(coursesData);
            this.modules.uiEffects = new UIEffects();
            this.modules.chartManager = new ChartManager();
            
            // Initialize slideshow with navigation callback
            initSlideshow(slidesData, (page) => this.modules.navigation.switchPage(page));
            
            // Set initial state
            this.modules.navigation.switchPage('journey');
            
            console.log('✅ All modules initialized successfully');
        } catch (error) {
            console.error('❌ Module initialization failed:', error);
            this.showErrorMessage();
        }
    }
    
    showErrorMessage() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50';
        errorDiv.innerHTML = `
            <strong>Something went wrong!</strong>
            <span class="block sm:inline"> Please refresh the page. If the problem persists, try clearing your browser cache.</span>
        `;
        document.body.appendChild(errorDiv);
    }
}

// Start the application
new App();
