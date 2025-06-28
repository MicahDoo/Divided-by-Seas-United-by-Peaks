export const DOM = {
    show(element) {
        element.classList.remove('hidden');
    },
    
    hide(element) {
        element.classList.add('hidden');
    },
    
    toggle(element, className) {
        element.classList.toggle(className);
    },
    
    findById(id) {
        return document.getElementById(id);
    },
    
    findAll(selector) {
        return document.querySelectorAll(selector);
    }
};
