/* ============================================
   WebStack - Animation & Interaction System
   动效与交互系统
   ============================================ */

(function() {
    'use strict';

    // === 配置 ===
    const CONFIG = {
        cardStaggerDelay: 45,
        cardAnimationDuration: 500,
        scrollRevealThreshold: 0.08,
        glowSmoothness: 0.04,
        sidebarHoverDelay: 80
    };

    // === 1. 卡片交错进入动画 ===
    function animateCards() {
        const cards = document.querySelectorAll('.site-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px) scale(0.96)';
            card.style.transition = `opacity ${CONFIG.cardAnimationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${CONFIG.cardAnimationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 120 + index * CONFIG.cardStaggerDelay);
        });
    }

    // === 2. 搜索框增强 ===
    function initSearchEnhancement() {
        const searchInput = document.getElementById('site-search');
        const inputGroup = document.querySelector('.search-container .input-group');
        if (!searchInput || !inputGroup) return;

        searchInput.addEventListener('focus', () => {
            inputGroup.classList.add('focused');
        });

        searchInput.addEventListener('blur', () => {
            inputGroup.classList.remove('focused');
        });

        searchInput.addEventListener('input', function() {
            const visibleCards = document.querySelectorAll('.site-card:not([style*="display: none"])');
            visibleCards.forEach((card, i) => {
                card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                card.style.opacity = '0.6';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 100 + i * 20);
            });
        });
    }

    // === 3. 侧边栏增强 ===
    function initSidebarEnhancement() {
        const menuItems = document.querySelectorAll('.sidebar-menu .main-menu > li > a');
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                if (!this.parentElement.classList.contains('active')) {
                    this.style.transition = 'all 0.2s ease';
                }
            });
        });

        const hasSubItems = document.querySelectorAll('.has-sub > a');
        hasSubItems.forEach(item => {
            item.addEventListener('click', function() {
                const sub = this.nextElementSibling;
                if (sub && sub.tagName === 'UL') {
                    const subItems = sub.querySelectorAll('li');
                    subItems.forEach((li, i) => {
                        li.style.opacity = '0';
                        li.style.transform = 'translateX(-8px)';
                        li.style.transition = `all 0.25s ease ${i * 30}ms`;
                        setTimeout(() => {
                            li.style.opacity = '1';
                            li.style.transform = 'translateX(0)';
                        }, 10);
                    });
                }
            });
        });
    }

    // === 4. 滚动触发显示 ===
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: CONFIG.scrollRevealThreshold,
            rootMargin: '0px 0px -30px 0px'
        });

        document.querySelectorAll('.text-gray').forEach(el => {
            el.classList.add('reveal-item');
            observer.observe(el);
        });
    }

    // === 5. 鼠标跟随环境光晕 ===
    function initAmbientGlow() {
        const glow = document.createElement('div');
        glow.className = 'ambient-glow';
        document.body.appendChild(glow);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX - 250;
            mouseY = e.clientY - 250;
        });

        function animate() {
            currentX += (mouseX - currentX) * CONFIG.glowSmoothness;
            currentY += (mouseY - currentY) * CONFIG.glowSmoothness;
            glow.style.transform = `translate(${currentX}px, ${currentY}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    // === 6. 跟随鼠标的 URL Tooltip ===
    function initMouseTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'mouse-tooltip';
        document.body.appendChild(tooltip);

        let tooltipX = 0;
        let tooltipY = 0;
        let targetUrl = '';
        let isVisible = false;

        document.addEventListener('mousemove', (e) => {
            tooltipX = e.clientX + 16;
            tooltipY = e.clientY + 16;

            if (isVisible) {
                tooltip.style.left = tooltipX + 'px';
                tooltip.style.top = tooltipY + 'px';
            }
        });

        const cards = document.querySelectorAll('.site-card .card-inner');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                targetUrl = this.getAttribute('data-url') || '';
                if (targetUrl) {
                    tooltip.textContent = targetUrl;
                    tooltip.classList.add('visible');
                    tooltip.style.left = tooltipX + 'px';
                    tooltip.style.top = tooltipY + 'px';
                    isVisible = true;
                }
            });

            card.addEventListener('mouseleave', function() {
                tooltip.classList.remove('visible');
                isVisible = false;
            });
        });

        tooltip.addEventListener('mouseenter', () => {
            tooltip.classList.remove('visible');
            isVisible = false;
        });
    }

    // === 7. 页面加载完成动画 ===
    function initPageLoadAnimation() {
        const sidebar = document.querySelector('.sidebar-menu');
        const navbar = document.querySelector('.navbar');

        if (sidebar) {
            sidebar.style.opacity = '0';
            sidebar.style.transform = 'translateX(-20px)';
            sidebar.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            setTimeout(() => {
                sidebar.style.opacity = '1';
                sidebar.style.transform = 'translateX(0)';
            }, 50);
        }

        if (navbar) {
            navbar.style.opacity = '0';
            navbar.style.transform = 'translateY(-10px)';
            navbar.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            setTimeout(() => {
                navbar.style.opacity = '1';
                navbar.style.transform = 'translateY(0)';
            }, 150);
        }
    }

    // === 8. 平滑滚动增强 ===
    function initSmoothScroll() {
        document.querySelectorAll('a.smooth').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // === 初始化 ===
    document.addEventListener('DOMContentLoaded', function() {
        initPageLoadAnimation();

        setTimeout(() => {
            animateCards();
            initSearchEnhancement();
            initSidebarEnhancement();
            initScrollReveal();
            initAmbientGlow();
            initMouseTooltip();
            initSmoothScroll();
        }, 200);
    });
})();
