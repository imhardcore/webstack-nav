(function() {
    'use strict';

    // 初始化主题
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    // 切换主题
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // 更新图标
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = isDark ? 'fa-sun-o' : 'fa-moon-o';
        }
    }

    // 尽早设置主题，避免闪烁
    initTheme();

    document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
            });
        }

        // 更新初始图标
        const isDark = document.body.classList.contains('dark-mode');
        const icon = document.querySelector('#theme-toggle i');
        if (icon && isDark) {
            icon.className = 'fa-sun-o';
        }
    });
})();
