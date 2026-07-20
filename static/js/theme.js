(function() {
    'use strict';

    // 主题列表（新主题在此添加，格式：{ id: 'name', name: '显示名', icon: 'fa-xxx' }）
    var THEMES = [
        { id: 'default-dark', name: '经典深色', icon: 'fa-cube' },
        { id: 'designcode', name: '玻璃态', icon: 'fa-gem' }
    ];

    var DEFAULT_THEME = 'default-dark';

    function getStoredTheme() {
        return localStorage.getItem('theme') || DEFAULT_THEME;
    }

    function getThemeInfo(themeId) {
        for (var i = 0; i < THEMES.length; i++) {
            if (THEMES[i].id === themeId) return THEMES[i];
        }
        return THEMES[0];
    }

    function applyTheme(themeId) {
        document.documentElement.setAttribute('data-theme', themeId);
        var isLight = (themeId.indexOf('light') !== -1);
        document.documentElement.style.colorScheme = isLight ? 'light' : 'dark';
        updateIcon(themeId);
        updateThemeColor(themeId);
    }

    function updateIcon(themeId) {
        var toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        var icon = toggleBtn.querySelector('i');
        var info = getThemeInfo(themeId);
        if (icon && info) {
            icon.className = 'fa ' + info.icon;
        }
    }

    function updateThemeColor(themeId) {
        var meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) return;

        var styles = getComputedStyle(document.documentElement);
        var themeColor = styles.getPropertyValue('--theme-color').trim();
        if (themeColor) {
            meta.setAttribute('content', themeColor);
        }
    }

    function buildThemeMenu() {
        var menu = document.getElementById('theme-menu');
        if (!menu) return;

        menu.innerHTML = '';
        for (var i = 0; i < THEMES.length; i++) {
            var theme = THEMES[i];
            var item = document.createElement('button');
            item.className = 'theme-menu-item';
            item.setAttribute('data-theme', theme.id);
            item.setAttribute('role', 'menuitem');
            item.setAttribute('aria-label', '切换到' + theme.name + '主题');
            item.innerHTML = '<i class="fa ' + theme.icon + '" aria-hidden="true"></i><span>' + theme.name + '</span>';
            menu.appendChild(item);
        }
    }

    function toggleMenu(show) {
        var menu = document.getElementById('theme-menu');
        var toggleBtn = document.getElementById('theme-toggle');
        if (!menu || !toggleBtn) return;

        if (show === undefined) {
            show = !menu.classList.contains('show');
        }

        if (show) {
            menu.classList.add('show');
            menu.classList.remove('hidden');
            toggleBtn.setAttribute('aria-expanded', 'true');
        } else {
            menu.classList.remove('show');
            menu.classList.add('hidden');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    }

    function setTheme(themeId) {
        localStorage.setItem('theme', themeId);
        applyTheme(themeId);
        updateActiveTheme(themeId);
        toggleMenu(false);
    }

    function updateActiveTheme(themeId) {
        var items = document.querySelectorAll('.theme-menu-item');
        for (var i = 0; i < items.length; i++) {
            var itemTheme = items[i].getAttribute('data-theme');
            if (itemTheme === themeId) {
                items[i].classList.add('active');
                items[i].setAttribute('aria-checked', 'true');
            } else {
                items[i].classList.remove('active');
                items[i].setAttribute('aria-checked', 'false');
            }
        }
    }

    // 尽早应用主题，避免闪烁
    applyTheme(getStoredTheme());

    document.addEventListener('DOMContentLoaded', function() {
        var toggleBtn = document.getElementById('theme-toggle');
        var menu = document.getElementById('theme-menu');

        buildThemeMenu();
        updateActiveTheme(getStoredTheme());

        if (toggleBtn && menu) {
            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMenu();
            });

            menu.addEventListener('click', function(e) {
                var item = e.target.closest('.theme-menu-item');
                if (item) {
                    var themeId = item.getAttribute('data-theme');
                    if (themeId) {
                        setTheme(themeId);
                    }
                }
            });

            document.addEventListener('click', function(e) {
                if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
                    toggleMenu(false);
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    toggleMenu(false);
                    toggleBtn.focus();
                }
            });
        }
    });
})();
