(function() {
    'use strict';

    // 默认深色模式
    function getStoredTheme() {
        return localStorage.getItem('theme') || 'dark';
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-mode');
            document.documentElement.style.colorScheme = 'light';
        } else {
            document.documentElement.classList.remove('light-mode');
            document.documentElement.style.colorScheme = 'dark';
        }
        updateIcon(theme);
    }

    function updateIcon(theme) {
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fa-moon-o' : 'fa-sun-o';
        }
    }

    // 尽早应用主题，避免闪烁
    applyTheme(getStoredTheme());

    document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', function() {
                const current = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
                const next = current === 'dark' ? 'light' : 'dark';
                localStorage.setItem('theme', next);
                applyTheme(next);
            });
        }
    });
})();
