(function($) {
    'use strict';

    //Header Search
    if ($('.search-box-outer').length) {
        $('.search-box-outer').on('click', function() {
            $('body').addClass('search-active');
        });
        $('.close-search').on('click', function() {
            $('body').removeClass('search-active');
        });
    }


    // Mobile Menu
    $('.mobile-menu nav').meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: ".mobile-menu",
        meanMenuOpen: "<span></span> <span></span> <span></span>",
        onePage: false,
    });



    // sticky
    var wind = $(window);
    var sticky = $('#sticky');
    wind.on('scroll', function() {
        var scroll = wind.scrollTop();
        if (scroll < 100) {
            sticky.removeClass('sticky');
        } else {
            sticky.addClass('sticky');
        }
    });



    // Loder  //
    $(function() {
        // Skip the loader entirely on repeat visits within this tab session.
        // The <head> script already hid it via CSS — this just avoids the
        // resource-counting work and keeps body.loaded consistent.
        if (document.documentElement.classList.contains('loader-skipped')) {
            $('body').addClass('loaded');
            return;
        }

        // REAL loader: progress tracks actual eager resource loading
        // (stylesheets + scripts + non-lazy images), not a fake counter.
        // The display eases toward the true % and is capped at 90% until
        // the window "load" event — so 100% genuinely means ready, and the
        // loader never adds artificial delay.
        var done = false;
        var ring = $('.attan-ring-fill');
        var bar = $('#attanLoaderBar');
        var pctEl = $('#attanLoaderPct');
        var circumference = 339.29;
        var CAP = 90; // never pass 90% until the page really finishes
        var loaded = 0, total = 0, shown = 0;

        function paint(n) {
            n = Math.max(0, Math.min(100, n));
            if (bar.length) bar.css('width', n + '%');
            if (ring.length) ring.css('stroke-dashoffset', circumference - (circumference * n / 100));
            if (pctEl.length) pctEl.text(Math.round(n) + '%');
        }

        function finish() {
            if (done) return;
            done = true;
            // Remember this session so repeat visits skip the loader.
            try { sessionStorage.setItem('attan_loader_seen', '1'); } catch (e) {}
            paint(100);
            setTimeout(function() {
                $('body').addClass('loaded');
            }, 150);
        }

        // Was a resource already fetched? (Resource Timing API)
        function alreadyFetched(url) {
            if (!url) return true;
            try { return performance.getEntriesByName(url).length > 0; }
            catch (e) { return false; }
        }

        // Count every eager resource; listen for the ones still loading.
        var pending = [];
        [].forEach.call(document.querySelectorAll('link[rel="stylesheet"]'), function(ln) {
            var isLoaded = false;
            try { isLoaded = !!ln.sheet; } catch (e) { isLoaded = true; } // cross-origin: assume loaded
            if (isLoaded || alreadyFetched(ln.href)) { loaded++; }
            else pending.push(ln);
        });
        [].forEach.call(document.querySelectorAll('script[src]'), function(s) {
            if (alreadyFetched(s.src)) { loaded++; }
            else pending.push(s);
        });
        [].forEach.call(document.querySelectorAll('img:not([loading="lazy"])'), function(img) {
            if (img.complete) { loaded++; } // loaded or already errored
            else pending.push(img);
        });

        pending.forEach(function(el) {
            el.addEventListener('load', function() { loaded++; });
            el.addEventListener('error', function() { loaded++; }); // failures still resolve
        });

        total = loaded + pending.length;
        if (!bar.length && !ring.length) return; // no loader markup on this page

        // Animate: ease the display toward the true % (never above the cap).
        function loop() {
            if (done) return;
            var target = total ? Math.min(CAP, CAP * loaded / total) : CAP;
            shown += Math.max(1.5, (target - shown) * 0.2);
            if (shown > target) shown = target;
            paint(shown);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);

        // Reveal the instant the page is actually ready.
        if (document.readyState === 'complete') {
            setTimeout(finish, 400); // already loaded — brief brand flash
        } else {
            window.addEventListener('load', finish);
        }

        // Safety net: never block the user longer than ~12s (stalled resource).
        setTimeout(function() { if (!done) finish(); }, 12000);
    });




    // data - background
    $("[data-background]").each(function() {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    })




    // owlCarousel address
    $('#customers-address').owlCarousel({
        loop: true,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        nav: true,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 1500,
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 1
            },
            992: {
                items: 1
            },
            1200: {
                items: 1
            }
        }

    })


    // owlCarousel banner 1 
    $('#customers-hero').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10500,
        smartSpeed: 1500,
        nav: false,
        dots: true,
        dotsEach: true,
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 1
            },
            992: {
                items: 1
            },
            1200: {
                items: 1
            },
            1400: {
                items: 1
            }

        }

    })


    // testimonial 
    $('#customers-testimonial').owlCarousel({
        loop: true,
        dots: true,
        nav: false,
        margin: 30,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            },
            1920: {
                items: 2
            }
        }
    })


    // Blog Active
    $('#customers-blog').owlCarousel({
        loop: true,
        dots: true,
        nav: true,
        center: true,
        margin: 30,
        navText: ["<i class='bi bi-arrow-left''></i>", "<i class='bi bi-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })



    // active class
    var selector = '.single_amount_wrapper .single_amount';
    $(selector).on('click', function() {
        $(selector).removeClass('active');
        $(this).addClass('active');
    });




    // Coumdown Timer
    const main = () => {
        const second = 1000
        const minute = second * 60
        const hour = minute * 60
        const day = hour * 24

        // Hon. Moses Attan Okia sworn in: 11th Parliament of Uganda — May 17, 2021
        const SWORNDATE = new Date('May 17, 2021, 10:00:00').getTime()

        // The countdown elements only exist on the homepage — bail elsewhere.
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const x = setInterval(() => {
            const now = new Date().getTime()
            const elapsed = now - SWORNDATE

            daysEl.innerText = Math.floor(elapsed / day)
            hoursEl.innerText = String(Math.floor((elapsed % day) / hour)).padStart(2, '0')
            minutesEl.innerText = String(Math.floor((elapsed % hour) / minute)).padStart(2, '0')
            secondsEl.innerText = String(Math.floor((elapsed % minute) / second)).padStart(2, '0')
        }, 1000)
    }

    main();




    // Donate 
    var donate_link = 'volunteer.html';
    setTimeout(function() {
        $('.donation_wrapper > .amount_wrapper > input').trigger('change');
    }, 20);
    //Update link on change or input
    $(document).on('change input', '.donation_wrapper > .amount_wrapper > input', function() {
        $(this).val(Math.round(parseFloat($(this).val())));
        $(this).parent().parent().find('> a').attr('href', donate_link.replace('{amount}', Math.round(parseFloat($(this).val()))));
    });
    //Change amount on button click
    $(document).on('click', '.donation_wrapper > .single_amount_wrapper > .single_amount', function() {
        $('.donation_wrapper > .amount_wrapper > input').val(Math.round(parseFloat($(this).attr('value')))).trigger('change');
    });




    /*  Cart Plus Minus Button
    /*----------------------------------------*/

    $('.ctnbutton').on('click', function() {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find('input').val(newVal);
    });


    /*---------------------
    WOW active js 
    --------------------- */
    new WOW().init();

    // counterUp
    $('.counter').counterUp({
        delay: 5,
        time: 1500
    });

    // Venubox

    $('.venobox').venobox({

        numeratio: true,

        infinigall: true

    });
    jQuery(document).ready(function($) {
        "use strict";

        // =======< accordion js >========
        $(".accordion > li:eq(0) a").addClass("active").next().slideDown();
        $('.accordion a').on('click', function(j) {
            var dropDown = $(this).closest("li").find("p");

            $(this).closest(".accordion").find("p").not(dropDown).slideUp();

            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(this).closest(".accordion").find("a.active").removeClass("active");
                $(this).addClass("active");
            }

            dropDown.stop(false, true).slideToggle();

            j.preventDefault();
        });


        //=====< barfiller script >====
        $('#bar1').barfiller({
            duration: 7000
        });
        $('#bar2').barfiller({
            duration: 7000
        });
        $('#bar3').barfiller({
            duration: 7000
        });


        //======< Custom Tab >======
        $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

        $(".tab ul.tabs li a").on("click", function(g) {
            var tab = $(this).closest('.tab'),
                index = $(this).closest('li').index();

            tab.find('ul.tabs > li').removeClass('current');
            $(this).closest('li').addClass('current');

            tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
            tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

            g.preventDefault();
        });

    });


    // scroll up

    if ($('.prgoress_indicator path').length) {
        var progressPath = document.querySelector('.prgoress_indicator path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function() {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).on('scroll', updateProgress);
        var offset = 250;
        var duration = 550;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.prgoress_indicator').addClass('active-progress');
            } else {
                jQuery('.prgoress_indicator').removeClass('active-progress');
            }
        });
        jQuery('.prgoress_indicator').on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        });
    }

    // Sidebar

    "use strict";
    jQuery(document).ready(function(o) {
        0 < o(".offset-side-bar").length &&
            o(".offset-side-bar").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), o(".cart-group").addClass("isActive");
            }),
            0 < o(".close-side-widget").length &&
            o(".close-side-widget").on("click", function(e) {
                e.preventDefault(), o(".cart-group").removeClass("isActive");
            }),
            0 < o(".navSidebar-button").length &&
            o(".navSidebar-button").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), o(".info-group").addClass("isActive");
            }),
            0 < o(".close-side-widget").length &&
            o(".close-side-widget").on("click", function(e) {
                e.preventDefault(), o(".info-group").removeClass("isActive");
            }),
            o("body").on("click", function(e) {
                o(".info-group").removeClass("isActive"), o(".cart-group").removeClass("isActive");
            }),
            o(".xs-sidebar-widget").on("click", function(e) {
                e.stopPropagation();
            }),
            0 < o(".xs-modal-popup").length &&
            o(".xs-modal-popup").magnificPopup({
                type: "inline",
                fixedContentPos: !2,
                fixedBgPos: !0,
                overflowY: "auto",
                closeBtnInside: !2,
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = "my-mfp-slide-bottom xs-promo-popup";
                    },
                },
            });
    });


})(jQuery);