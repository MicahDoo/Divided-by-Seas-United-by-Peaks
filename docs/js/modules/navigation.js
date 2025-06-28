import { DOM } from '../utils/dom-helpers.js';

export class Navigation {
    constructor() {
        this.currentPage = 'journey';
        this.pages = [
            DOM.findById('journey-page'),
            DOM.findById('dossier-page'),
            DOM.findById('plan-page')
        ];
        this.mobileMenu = DOM.findById('mobile-menu');
        this.mobileMenuButton = DOM.findById('mobile-menu-button');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Mobile menu toggle
        this.mobileMenuButton?.addEventListener('click', () => {
            DOM.toggle(this.mobileMenu, 'hidden');
        });
        
        // Navigation tabs
        const navTabs = DOM.findAll('.nav-tab, #mobile-menu button, #main-logo');
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchPage(tab.dataset.page || 'journey');
                DOM.hide(this.mobileMenu);
            });
        });
        
        // Action buttons
        const header = document.querySelector('header');
        header?.addEventListener('click', (e) => {
            const actionButton = e.target.closest('.action-button');
            if (!actionButton) return;
            
            this.handleActionClick(actionButton.id);
        });
    }
    
    switchPage(requestedPage) {
        this.currentPage = requestedPage;
        
        // Toggle page visibility
        this.pages.forEach(page => {
            const shouldShow = page.id === `${requestedPage}-page`;
            DOM.toggle(page, 'hidden', !shouldShow);
        });
        
        // Update body class
        document.body.className = document.body.className
            .split(' ')
            .filter(c => !c.endsWith('-active'))
            .join(' ');
        document.body.classList.add(`${requestedPage}-active`);
        
        // Show/hide action buttons
        const isJourneyPage = requestedPage === 'journey';
        DOM.findAll('.action-button').forEach(btn => {
            DOM.toggle(btn, 'hidden', !isJourneyPage);
        });
        
        // Update active tabs
        this.updateActiveTabs(requestedPage);
        
        window.scrollTo(0, 0);
    }
    
    updateActiveTabs(requestedPage) {
        DOM.findAll('.nav-tab').forEach(tab => {
            DOM.toggle(tab, 'active', tab.dataset.page === requestedPage);
        });
        
        DOM.findAll('#mobile-menu button').forEach(button => {
            DOM.toggle(button, 'mobile-tab-active', button.dataset.page === requestedPage);
        });
    }
    
    handleActionClick(actionId) {
        const actions = {
            'list': () => this.navigateToList(),
            'dossier': () => this.switchPage('dossier'),
            'plan': () => this.switchPage('plan')
        };
        
        const action = actions[actionId];
        if (action) {
            action();
        } else {
            console.warn(`Unknown action: ${actionId}`);
        }
    }
    
    navigateToList() {
        try {
            window.location.href = './list/';
        } catch (error) {
            console.error('Failed to navigate to list:', error);
            // Fallback: could show a modal or different behavior
            alert('List page is not available yet.');
        }
    }
}
