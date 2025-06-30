import { DOM } from '../utils/dom-helpers.js';

export class ModalManager {
    constructor() {
        this.activeModal = null;
        this.initKeyboardHandlers();
    }
    
    initKeyboardHandlers() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal(this.activeModal);
            }
        });
    }
    
    openModal(modalElement, options = {}) {
        if (!modalElement) return;
        
        this.activeModal = modalElement;
        
        // Accessibility
        modalElement.setAttribute('aria-hidden', 'false');
        modalElement.setAttribute('role', 'dialog');
        
        // Focus management
        const focusableElements = modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
        
        // Show modal
        DOM.show(modalElement);
        document.body.style.overflow = 'hidden';
        
        // Animation
        setTimeout(() => {
            modalElement.classList.add('opacity-100');
            const content = modalElement.querySelector('.modal-content');
            if (content) {
                content.classList.add('scale-100');
                content.classList.remove('scale-95');
            }
        }, 10);
    }
    
    closeModal(modalElement) {
        if (!modalElement) return;
        
        // Animation out
        modalElement.classList.remove('opacity-100');
        modalElement.classList.add('opacity-0');
        
        const content = modalElement.querySelector('.modal-content');
        if (content) {
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
        }
        
        // Hide after animation
        setTimeout(() => {
            DOM.hide(modalElement);
            modalElement.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
            
            // Clean up classes
            modalElement.classList.remove('opacity-0');
            if (content) {
                content.classList.remove('scale-95');
            }
            
            this.activeModal = null;
        }, 300);
    }
    
    setupModalTriggers() {
        // Generic modal trigger setup
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-modal-target]');
            if (trigger) {
                const targetId = trigger.dataset.modalTarget;
                const modal = DOM.findById(targetId);
                this.openModal(modal);
            }
            
            const closeBtn = e.target.closest('[data-modal-close]');
            if (closeBtn) {
                const modal = closeBtn.closest('.modal');
                this.closeModal(modal);
            }
        });
    }
}
