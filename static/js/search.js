(function() {
    'use strict';

    let sitesData = [];
    let catalogEl = null;
    let resultsEl = null;

    function initData() {
        catalogEl = document.getElementById('catalog');
        resultsEl = document.getElementById('search-results');

        document.querySelectorAll('.site-card').forEach(function(card) {
            const title = card.querySelector('.card-title')?.textContent || '';
            const desc = card.querySelector('.card-desc')?.textContent || '';
            sitesData.push({
                title: title.toLowerCase(),
                desc: desc.toLowerCase(),
                titleRaw: title,
                descRaw: desc,
                url: card.getAttribute('href') || '',
                element: card
            });
        });
    }

    function renderResults(matches) {
        if (!resultsEl) return;
        resultsEl.innerHTML = '';

        if (matches.length === 0) {
            resultsEl.innerHTML = '<p class="search-results-empty">未找到相关网站</p>';
            resultsEl.style.display = 'block';
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        matches.forEach(function(site) {
            const clone = site.element.cloneNode(true);
            grid.appendChild(clone);
        });
        resultsEl.appendChild(grid);
        resultsEl.style.display = 'block';

        // 重新触发懒加载
        if (window.lozad) {
            lozad(resultsEl.querySelectorAll('.lozad')).observe();
        }
    }

    function search(query) {
        const q = query.toLowerCase().trim();

        if (!q) {
            resultsEl.style.display = 'none';
            resultsEl.innerHTML = '';
            if (catalogEl) catalogEl.style.display = '';
            return;
        }

        if (catalogEl) catalogEl.style.display = 'none';

        const matches = sitesData.filter(function(s) {
            return s.title.includes(q) || s.desc.includes(q) || s.url.toLowerCase().includes(q);
        });

        renderResults(matches);
    }

    let debounceTimer = null;
    function debouncedSearch(q) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() { search(q); }, 200);
    }

    document.addEventListener('DOMContentLoaded', function() {
        initData();
        const input = document.getElementById('site-search');
        if (input) {
            input.addEventListener('input', function(e) {
                debouncedSearch(e.target.value);
            });
            // ESC 清空
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    input.value = '';
                    search('');
                    input.blur();
                }
            });
        }
    });
})();
