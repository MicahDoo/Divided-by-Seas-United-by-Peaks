// docs/js/menu.js

/**
 * A private function within this module to handle the menu's state.
 */
function setMenuState(shouldBeOpen) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return; // Failsafe if the menu element isn't on the page

    if (shouldBeOpen) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobileMenu.classList.remove('opacity-0', 'pointer-events-none'), 10);
    } else {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    }
}

/**
 * A private function to set up the button click listener.
 */
function initializeMenuButton() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // On click, simply check if the menu is currently hidden and do the opposite.
            const isHidden = mobileMenu.classList.contains('hidden');
            setMenuState(isHidden);
        });
    }
}

/**
 * The only function that needs to be exported.
 * Other modules will call this to automatically open the menu.
 */
export function openMenuForActions() {
    setMenuState(true);
}

// This line ensures that the hamburger button click listener is
// set up as soon as the page structure is loaded.
initializeMenuButton();
