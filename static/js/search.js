(function() {
    'use strict';

    let sitesData = [];
    let allSections = [];

    function initSearchData() {
        const cards = document.querySelectorAll('.site-card .card-inner');
        cards.forEach(function(card) {
            sitesData.push({
                title: (card.dataset.title || '').toLowerCase(),
                description: (card.querySelector('.card-desc')?.textContent || '').toLowerCase(),
                url: (card.dataset.url || '').toLowerCase(),
                element: card.closest('.site-card')
            });
        });

        document.querySelectorAll('.text-gray, .cards-grid, br').forEach(function(el) {
            allSections.push(el);
        });
    }

    function search(query) {
        const results = document.getElementById('search-results');
        const queryLower = query.toLowerCase().trim();

        if (!queryLower) {
            results.style.display = 'none';
            results.innerHTML = '';
            allSections.forEach(function(el) {
                el.style.display = '';
            });
            return;
        }

        allSections.forEach(function(el) {
            el.style.display = 'none';
        });

        const matches = sitesData.filter(function(site) {
            return site.title.includes(queryLower) ||
                   site.description.includes(queryLower) ||
                   site.url.includes(queryLower);
        });

        results.innerHTML = '';
        results.style.display = 'block';

        if (matches.length === 0) {
            const noResults = document.createElement('p');
            noResults.style.cssText = 'text-align:center;padding:40px;color:#999;';
            noResults.textContent = '未找到相关网站';
            results.appendChild(noResults);
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        results.appendChild(grid);

        matches.forEach(function(site) {
            const clone = site.element.cloneNode(true);
            grid.appendChild(clone);
        });
    }

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
