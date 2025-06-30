// docs/js/menu.js

/**
 * The function that other modules can import to control the menu.
 * @param {boolean} shouldBeOpen - True to open the menu, false to close it.
 */
export function setMenuState(shouldBeOpen) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return; // Failsafe

    if (shouldBeOpen) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobileMenu.classList.remove('opacity-0', 'pointer-events-none'), 10);
    } else {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    }
}

/**
 * A private function within this module to set up the button click.
 */
function initializeMenuButtonListener() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            setMenuState(isHidden); // Toggles the menu state on click
        });
    }
}

// This line makes the module self-initializing.
// It waits for the page to be fully loaded, then runs the setup function.
document.addEventListener('DOMContentLoaded', initializeMenuButtonListener);
