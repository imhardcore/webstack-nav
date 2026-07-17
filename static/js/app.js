(function() {
    'use strict';

    // 侧边栏折叠
    function initSidebarToggle() {
        const sidebar = document.getElementById('sidebar');
        const toggle = sidebar?.querySelector('.sidebar-toggle');
        if (!toggle || !sidebar) return;

        toggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            // 移动端：展开/收起
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('expanded');
            }
            // 折叠态下收起所有已展开的子菜单，避免展开时残留
            if (sidebar.classList.contains('collapsed')) {
                sidebar.querySelectorAll('.nav-group.expanded').forEach(function(g) {
                    g.classList.remove('expanded');
                });
            }
        });

        // 点击外部关闭移动端菜单
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 &&
                !sidebar.contains(e.target) &&
                !e.target.closest('.sidebar-toggle')) {
                sidebar.classList.remove('expanded');
            }
        });
    }

    // 折叠组展开/收起
    function initNavGroups() {
        document.querySelectorAll('.nav-group > .has-sub').forEach(function(item) {
            item.addEventListener('click', function(e) {
                const sidebar = document.getElementById('sidebar');
                // 折叠态：点击直接展开 sidebar，不操作子菜单
                if (sidebar && sidebar.classList.contains('collapsed')) {
                    e.preventDefault();
                    sidebar.classList.remove('collapsed');
                    return;
                }
                e.preventDefault();
                const group = item.closest('.nav-group');
                if (group) group.classList.toggle('expanded');
            });
        });

        // 折叠态：为 nav-item 添加 title 属性实现原生 tooltip
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            const updateTitles = function() {
                sidebar.querySelectorAll('.nav-item').forEach(function(item) {
                    const text = item.querySelector('.nav-text')?.textContent || '';
                    if (sidebar.classList.contains('collapsed')) {
                        item.setAttribute('title', text);
                    } else {
                        item.removeAttribute('title');
                    }
                });
            };
            updateTitles();
            const toggle = sidebar.querySelector('.sidebar-toggle');
            toggle?.addEventListener('click', updateTitles);
        }
    }

    // 平滑滚动到锚点
    function initSmoothScroll() {
        document.querySelectorAll('a.smooth').forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (!href || !href.startsWith('#')) return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                const toolbarHeight = 60;
                const offset = target.getBoundingClientRect().top + window.pageYOffset - toolbarHeight - 16;
                window.scrollTo({
                    top: offset,
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                });

                // 高亮当前导航项
                document.querySelectorAll('.nav-item').forEach(function(n) {
                    n.classList.remove('active');
                });
                const navItem = this.closest('.nav-item');
                if (navItem) navItem.classList.add('active');
            });
        });
    }

    // 滚动监听：高亮当前分类对应的导航项
    function initScrollSpy() {
        const sections = document.querySelectorAll('.category-section');
        if (sections.length === 0) return;

        const navLinks = {};
        document.querySelectorAll('a.smooth').forEach(function(link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                navLinks[href.substring(1)] = link.closest('.nav-item') || link;
            }
        });

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function() {
                const scrollPos = window.scrollY + 100;
                let current = null;
                sections.forEach(function(section) {
                    if (section.offsetTop <= scrollPos) {
                        current = section.id;
                    }
                });
                if (current && navLinks[current]) {
                    document.querySelectorAll('.nav-item').forEach(function(n) {
                        n.classList.remove('active');
                    });
                    navLinks[current].classList.add('active');
                }
                ticking = false;
            });
        }, { passive: true });
    }

    // 回到顶部
    function initGoTop() {
        document.querySelectorAll('[rel="go-top"]').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                });
            });
        });
    }

    // 图片懒加载
    function initLazyLoad() {
        if (window.lozad) {
            const observer = lozad();
            observer.observe();
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        initSidebarToggle();
        initNavGroups();
        initSmoothScroll();
        initScrollSpy();
        initGoTop();
        initLazyLoad();
    });
})();
