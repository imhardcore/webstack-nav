(function() {
    'use strict';

    let sitesData = [];
    let allSections = [];

    // 从页面提取所有网址数据
    function initSearchData() {
        const cards = document.querySelectorAll('.xe-widget.xe-conversations');
        cards.forEach(function(card) {
            sitesData.push({
                title: (card.dataset.siteName || '').toLowerCase(),
                description: (card.dataset.siteDesc || '').toLowerCase(),
                url: (card.getAttribute('data-original-title') || '').toLowerCase(),
                element: card.closest('.col-sm-3')
            });
        });

        // 保存所有内容区域引用
        document.querySelectorAll('.text-gray, .row, br').forEach(function(el) {
            allSections.push(el);
        });
    }

    // 搜索函数
    function search(query) {
        const results = document.getElementById('search-results');
        const queryLower = query.toLowerCase().trim();

        if (!queryLower) {
            // 清空搜索，恢复显示
            results.style.display = 'none';
            results.innerHTML = '';
            allSections.forEach(function(el) {
                el.style.display = '';
            });
            return;
        }

        // 隐藏所有内容区域
        allSections.forEach(function(el) {
            el.style.display = 'none';
        });

        // 过滤匹配的卡片
        const matches = sitesData.filter(function(site) {
            return site.title.includes(queryLower) ||
                   site.description.includes(queryLower) ||
                   site.url.includes(queryLower);
        });

        // 显示搜索结果
        results.innerHTML = '';
        results.style.display = 'block';

        if (matches.length === 0) {
            const noResults = document.createElement('p');
            noResults.style.cssText = 'text-align:center;padding:40px;color:#999;';
            noResults.textContent = '未找到相关网站';
            results.appendChild(noResults);
            return;
        }

        // 按每行4个创建行
        let currentRow = null;
        matches.forEach(function(site, index) {
            if (index % 4 === 0) {
                currentRow = document.createElement('div');
                currentRow.className = 'row';
                results.appendChild(currentRow);
            }
            const clone = site.element.cloneNode(true);
            currentRow.appendChild(clone);
        });
    }

    // 防抖
    let debounceTimer = null;
    function debouncedSearch(query) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
            search(query);
        }, 200);
    }

    document.addEventListener('DOMContentLoaded', function() {
        initSearchData();
        const searchInput = document.getElementById('site-search');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                debouncedSearch(e.target.value);
            });
        }
    });
})();
