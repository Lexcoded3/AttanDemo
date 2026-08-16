/* ==========================================================================
   AT T A N  -  W O W   U P G R A D E  (vanilla JS, no dependencies)
   Count-up stats when scrolled into view + staggered hero entrances
   ========================================================================== */
(function () {
    'use strict';

    /* ---------- 1. Count-up animated stats ---------- */
    function animateCount(el) {
        var target = parseFloat(el.getAttribute('data-target')) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1800;
        var start = null;

        function frame(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            // easeOutCubic for a satisfying decelerating count
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = Math.round(target * eased);
            el.textContent = value.toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                el.textContent = target.toLocaleString() + suffix;
            }
        }
        requestAnimationFrame(frame);
    }

    function initCounters() {
        var stats = document.querySelectorAll('.attan-stat-num');
        if (!stats.length) return;

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            stats.forEach(function (el) { observer.observe(el); });
        } else {
            // Fallback: just animate immediately
            stats.forEach(animateCount);
        }
    }

    /* ---------- 2. Owl carousel: re-trigger per-slide entrance ---------- */
    // When a hero slide becomes active, restart its staggered entrance so each
    // slide feels fresh. Owl fires namespaced jQuery events.
    function hookHeroSlider() {
        var carousel = document.getElementById('customers-hero');
        if (!carousel || typeof $ === 'undefined') return;
        if (!$.fn.owlCarousel) return;

        var $carousel = $(carousel);
        $carousel.on('changed.owl.carousel', function () {
            var active = carousel.querySelector('.owl-item.active');
            if (!active) return;
            var staggerables = active.querySelectorAll('.attan-anim');
            staggerables.forEach(function (el) {
                el.style.animation = 'none';
                void el.offsetWidth; /* reflow to restart animation */
                el.style.animation = '';
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initCounters();
        hookHeroSlider();
    });
})();
