(function() {
    'use strict';

    let sitesData = [];
    let catalogEl = null;

    function initData() {
        catalogEl = document.getElementById('catalog');

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

    function clearHighlights() {
        document.querySelectorAll('.site-card.search-match').forEach(function(card) {
            card.classList.remove('search-match');
        });
        if (catalogEl) catalogEl.style.display = '';
    }

    function highlightMatches(matches) {
        clearHighlights();

        if (matches.length === 0) {
            return;
        }

        matches.forEach(function(site) {
            site.element.classList.add('search-match');
        });

        const firstMatch = matches[0].element;
        if (firstMatch) {
            firstMatch.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'center'
            });
        }
    }

    function search(query) {
        const q = query.toLowerCase().trim();

        if (!q) {
            clearHighlights();
            return;
        }

        const matches = sitesData.filter(function(s) {
            return s.title.includes(q) || s.desc.includes(q) || s.url.toLowerCase().includes(q);
        });

        highlightMatches(matches);
    }

    let debounceTimer = null;
    function debouncedSearch(q) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() { search(q); }, 200);
    }

    function initSearchToggle() {
        const toggle = document.getElementById('search-toggle');
        const searchBox = document.getElementById('toolbar-search-box');
        const searchClose = document.getElementById('search-close');
        const input = document.getElementById('site-search');

        if (!toggle || !searchBox) return;

        function openSearch() {
            searchBox.classList.add('active');
            toggle.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            if (input) input.focus();
        }

        function closeSearch() {
            searchBox.classList.remove('active');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            if (input) {
                input.value = '';
                search('');
            }
        }

        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (searchBox.classList.contains('active')) {
                closeSearch();
            } else {
                openSearch();
            }
        });

        if (searchClose) {
            searchClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeSearch();
            });
        }

        if (input) {
            input.addEventListener('input', function(e) {
                debouncedSearch(e.target.value);
            });

            input.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeSearch();
                }
            });
        }

        document.addEventListener('click', function(e) {
            if (searchBox.classList.contains('active') &&
                !searchBox.contains(e.target) &&
                !toggle.contains(e.target)) {
                closeSearch();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        initData();
        initSearchToggle();
    });
})();
