// ============================================================
// SKILLMATCH — DAY/NIGHT MODE TOGGLE
// Persists preference in localStorage. Default: light (day) mode.
// ============================================================

(function () {
    const STORAGE_KEY = 'skillmatch-theme';

    // Apply saved theme immediately to prevent flash
    function applySavedTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        updateToggleIcons();
    }

    // Update all toggle icons on the page
    function updateToggleIcons() {
        const isDark = document.body.classList.contains('dark-mode');
        document.querySelectorAll('.theme-toggle-sun').forEach(el => {
            el.style.display = isDark ? 'none' : 'block';
        });
        document.querySelectorAll('.theme-toggle-moon').forEach(el => {
            el.style.display = isDark ? 'block' : 'none';
        });
    }

    // Toggle theme
    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        updateToggleIcons();
    }

    // Expose globally
    window.toggleTheme = toggleTheme;

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applySavedTheme);
    } else {
        applySavedTheme();
    }
})();
