// docs/js/menu.js

/**
 * Controls the visibility of the mobile menu.
 * @param {boolean} shouldBeOpen - True to open the menu, false to close it.
 */
export function setMenuState(shouldBeOpen) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;

    if (shouldBeOpen) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        }, 10);
    } else {
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
}

/**
 * Initializes the hamburger menu button listener.
 */
export function initMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            setMenuState(isHidden);
        });
    }
}
