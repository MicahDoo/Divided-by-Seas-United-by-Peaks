// docs/js/menu.js

// This is the function that the slideshow will call. It's the module's "public API".
export function openMenuForActions() {
    setMenuState(true);
}

// A private function to handle the menu's state. It is not exported.
function setMenuState(shouldBeOpen) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;

    if (shouldBeOpen) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobileMenu.classList.remove('opacity-0', 'pointer-events-none'), 10);
    } else {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    }
}

// A private function that sets up the click handler for the hamburger icon.
function initializeMenuButtonListener() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            setMenuState(isHidden);
        });
    }
}

// THIS IS THE KEY: We wait for the entire HTML document to be loaded and parsed
// before we try to find the button and attach our click listener.
// This guarantees the button will exist when the code runs.
document.addEventListener('DOMContentLoaded', initializeMenuButtonListener);
