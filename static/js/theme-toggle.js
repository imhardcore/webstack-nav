(function() {
    'use strict';

    // 初始化主题 — 默认深色模式
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
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

        // 默认图标为太阳（深色模式）
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = 'fa-sun-o';
        }
    });
})();
