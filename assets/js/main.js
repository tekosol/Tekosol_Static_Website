/**
 * Tekosol Static Website - main.js
 * Pure Vanilla JavaScript & Bootstrap 5 Enhancements
 * Handles: sticky navbar, scroll animations, social link normalization, contact form.
 */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     1. Sticky Navbar on Scroll
  --------------------------------------------------------------- */
  function initStickyNavbar() {
    var navbar = document.querySelector('.site-navbar') || document.querySelector('.main-nav');
    if (!navbar) return;

    var handleScroll = function () {
      if (window.scrollY > 50) {
        if (!navbar.classList.contains('scrolled')) {
          navbar.classList.add('scrolled');
        }
      } else {
        if (navbar.classList.contains('scrolled')) {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ---------------------------------------------------------------
     2. Auto-close mobile navbar on link click
  --------------------------------------------------------------- */
  function initMobileNavAutoClose() {
    var navbarCollapse = document.getElementById('primaryNavbar');
    if (!navbarCollapse) return;

    var navLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item, .btn-reach-us, .btn-careers');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
          var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  /* ---------------------------------------------------------------
     3. Scroll-triggered Content Section Animations (Site-Wide)
     Each content section smoothly slides up from the bottom and fades
     into view as the user scrolls down, starting when it reaches
     approximately 30% of the viewport height (~70% from top).
     Uses a slower animation duration (~1.8s) for a subtle, elegant transition.
  --------------------------------------------------------------- */
  function initScrollAnimations() {
    // Collect all top-level content sections across any page of the website
    var sectionNodeList = document.querySelectorAll(
      '.content-section, .scroll-section, ' +
      'body > div.section-wrapper, body > .section-wrapper, body > section, ' +
      'main > section, main > div.section-wrapper, ' +
      '.wp-site-blocks > .section-wrapper, .wp-site-blocks > section, ' +
      '.section-wrapper[data-id="fDElP4"], [data-id="fDElP4"], .guten-fDElP4, ' +
      'section.hero-section, section.about-block-section, section.clients-section, ' +
      'section.services-section, section.insights-section, section.cta-section, ' +
      'section.about-hero-section, section.about-cover-banner, section.about-mission-section, ' +
      'section.about-values-section, section.about-process-section, section.contact-info, ' +
      '.site-footer-group, footer.site-footer'
    );
    if (!sectionNodeList.length) {
      sectionNodeList = document.querySelectorAll('section, footer');
    }
    if (!sectionNodeList.length) return;

    // Filter to unique elements and ensure no nested sections are duplicated
    var rawSections = [];
    sectionNodeList.forEach(function (sec) {
      if (rawSections.indexOf(sec) === -1) {
        rawSections.push(sec);
      }
    });

    var sections = rawSections.filter(function (sec) {
      // Retain fDElP4 CTA banner as an independent target for observation
      if (sec.getAttribute('data-id') === 'fDElP4' || sec.classList.contains('guten-fDElP4')) {
        return true;
      }
      for (var i = 0; i < rawSections.length; i++) {
        if (rawSections[i] !== sec && rawSections[i].contains(sec)) {
          return false;
        }
      }
      return true;
    });

    // Ensure all target sections carry the base animation class
    sections.forEach(function (sec) {
      if (!sec.classList.contains('content-section')) {
        sec.classList.add('content-section');
      }
    });

    var unrevealedCount = sections.length;

    // Helper to reveal a section with GPU acceleration and resource cleanup
    function revealSection(sec, immediate) {
      if (sec.classList.contains('is-revealed')) return;

      var btns = sec.querySelectorAll('.primary-btn-box, .primary-btn, .guten-button-wrapper');
      var headers = sec.querySelectorAll('.header');
      var cards = sec.querySelectorAll('.service-box, .insight-card-item, .about-mission-card, .about-values-card');
      var headings = sec.querySelectorAll('h1, h2, h3, h4, .wp-block-heading, .wp-block-gutenverse-heading');
      var animDivs = sec.querySelectorAll('.hero-visual-wrapper, .wp-block-gutenverse-image, .about-desc, .services-intro, .cta-desc, .cta-subtitle, .about-hero-text, .about-cover-desc, .about-cover-quote, .text-content-inner, .client-logos-wrapper, .pro-points-box, .tekosol-footer-col');
      var nestedSections = sec.querySelectorAll('.content-section, [data-id="fDElP4"], .guten-fDElP4');
      var dividerLines = sec.querySelectorAll('.wp-block-gutenverse-divider .guten-divider-line, .guten-divider .guten-divider-line');

      if (immediate) {
        sec.style.transition = 'none';
        btns.forEach(function (b) { b.style.transition = 'none'; });
        headers.forEach(function (h) { h.style.transition = 'none'; });
        cards.forEach(function (c) { c.style.transition = 'none'; });
        headings.forEach(function (hd) { hd.style.transition = 'none'; });
        animDivs.forEach(function (ad) { ad.style.transition = 'none'; });
        dividerLines.forEach(function (dl) { dl.classList.add('is-revealed'); });
        nestedSections.forEach(function (ns) {
          ns.style.transition = 'none';
          ns.classList.add('is-revealed');
        });
        sec.classList.add('is-revealed');
        void sec.offsetHeight; // force reflow
        sec.style.transition = '';
        sec.style.willChange = 'auto';
        btns.forEach(function (b) {
          b.style.transition = '';
          b.style.willChange = 'auto';
        });
        headers.forEach(function (h) {
          h.style.transition = '';
          h.style.willChange = 'auto';
        });
        cards.forEach(function (c) {
          c.style.transition = '';
          c.style.willChange = 'auto';
        });
        headings.forEach(function (hd) {
          hd.style.transition = '';
          hd.style.willChange = 'auto';
        });
        animDivs.forEach(function (ad) {
          ad.style.transition = '';
          ad.style.willChange = 'auto';
        });
        nestedSections.forEach(function (ns) {
          ns.style.transition = '';
          ns.style.willChange = 'auto';
        });
      } else {
        nestedSections.forEach(function (ns) {
          ns.classList.add('is-revealed');
        });
        dividerLines.forEach(function (dl) {
          dl.classList.add('is-revealed');
        });
        sec.classList.add('is-revealed');
        setTimeout(function () {
          sec.style.willChange = 'auto';
          btns.forEach(function (b) { b.style.willChange = 'auto'; });
          headers.forEach(function (h) { h.style.willChange = 'auto'; });
          cards.forEach(function (c) { c.style.willChange = 'auto'; });
          headings.forEach(function (hd) { hd.style.willChange = 'auto'; });
          animDivs.forEach(function (ad) { ad.style.willChange = 'auto'; });
          nestedSections.forEach(function (ns) { ns.style.willChange = 'auto'; });
        }, 2400);
      }

      unrevealedCount--;
      if (unrevealedCount <= 0 && onScrollOrResize) {
        window.removeEventListener('scroll', onScrollOrResize);
        window.removeEventListener('resize', onScrollOrResize);
      }
    }

    // IntersectionObserver configured for ~30% of viewport height:
    // rootMargin: '0px 0px -30% 0px' sets the detection line at 30% above the bottom edge (70% from top).
    // As the user scrolls down, when a section's top edge crosses this 30% viewport height mark,
    // the observer triggers and the section smoothly slides up from the bottom and fades in over 1.8s.
    var hasIO = ('IntersectionObserver' in window);
    var sectionObserver = null;

    if (hasIO) {
      sectionObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealSection(entry.target, false);
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0,
        rootMargin: '0px 0px -30% 0px'
      });
    }

    // Check initial visibility on page load (e.g., hero section) and observe remaining sections
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var triggerPoint = vh * 0.70; // 30% of viewport height from bottom

    sections.forEach(function (sec) {
      var rect = sec.getBoundingClientRect();

      if (rect.top <= triggerPoint) {
        if (rect.bottom <= 0) {
          // Already scrolled past on page reload - reveal immediately without transition delay
          revealSection(sec, true);
        } else {
          // In initial viewport (e.g. hero section) - smooth, elegant entrance on page load
          setTimeout(function () {
            revealSection(sec, false);
          }, 150);
        }
      } else if (sectionObserver) {
        sectionObserver.observe(sec);
      } else {
        // Fallback if no IntersectionObserver
        revealSection(sec, false);
      }
    });

    // Complementary scroll & resize handler:
    // 1) Handles bottom-of-page triggers so footer/last section reveals even on large screens
    // 2) Acts as a reliable fallback for rapid scrolling or non-IO environments
    var onScrollOrResize = function () {
      if (unrevealedCount <= 0) return;
      var currentVh = window.innerHeight || document.documentElement.clientHeight;
      var currentTrigger = currentVh * 0.70;
      var scrollBottom = currentVh + (window.pageYOffset || document.documentElement.scrollTop || 0);
      var docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      var nearBottom = scrollBottom >= docHeight - 150;

      sections.forEach(function (sec) {
        if (!sec.classList.contains('is-revealed')) {
          var rect = sec.getBoundingClientRect();
          if (nearBottom || rect.top <= currentTrigger) {
            revealSection(sec, false);
            if (sectionObserver) {
              sectionObserver.unobserve(sec);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Also support any manual .reveal-on-scroll elements if present on subpages
    var subpageItems = document.querySelectorAll('.reveal-on-scroll');
    if (subpageItems.length) {
      if ('IntersectionObserver' in window) {
        var subObserver = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        subpageItems.forEach(function (item) {
          subObserver.observe(item);
        });
      } else {
        subpageItems.forEach(function (item) {
          item.classList.add('is-revealed');
        });
      }
    }
  }

  /* ---------------------------------------------------------------
     4. External Social Links Normalization
  --------------------------------------------------------------- */
  function fixSocialLinks() {
    var socialMap = {
      'twitter.com/tekosolg':         'https://twitter.com/tekosolg',
      'facebook.com/tekosolglobal':   'https://www.facebook.com/tekosolglobal',
      'linkedin.com/company/tekosol': 'https://www.linkedin.com/company/tekosol'
    };

    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      Object.keys(socialMap).forEach(function (key) {
        if (href.indexOf(key) !== -1 && href.indexOf('http') === -1) {
          a.href = socialMap[key];
          a.target = '_blank';
          a.rel = 'noreferrer noopener';
        }
      });
    });
  }

  /* ---------------------------------------------------------------
     5. Static Contact Form Submission Handler
  --------------------------------------------------------------- */
  function initContactForm() {
    var form = document.querySelector('.guten-form-builder form') || 
               document.querySelector('form.guten-form-builder') || 
               document.querySelector('.contact-form');
    if (!form) return;

    if (form.style.display === 'none') {
      form.style.display = 'block';
    }

    // Clear validation error on input
    form.querySelectorAll('input, textarea').forEach(function (inp) {
      inp.addEventListener('input', function () {
        var wrapper = inp.closest('.guten-form-input');
        if (wrapper) {
          wrapper.classList.remove('has-error');
          var err = wrapper.querySelector('.validation-error');
          if (err) err.style.display = 'none';
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      var firstInvalidInput = null;

      // Validate required inputs
      var inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(function (inp) {
        var isRequired = inp.hasAttribute('required') || 
                         inp.getAttribute('aria-required') === 'true' ||
                         (inp.dataset && inp.dataset.validation && inp.dataset.validation.indexOf('"required":true') !== -1);
        var val = (inp.value || '').trim();
        var fieldError = false;
        var wrapper = inp.closest('.guten-form-input');
        var errEl = wrapper ? wrapper.querySelector('.validation-error') : null;

        if (isRequired && !val) {
          fieldError = true;
          if (errEl) {
            errEl.textContent = 'This field is required.';
          }
        } else if (val && inp.type === 'email') {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            fieldError = true;
            if (errEl) {
              errEl.textContent = 'Please enter a valid email address.';
            }
          }
        } else if (val && (inp.type === 'tel' || inp.name === 'Phone')) {
          var cleanPhone = val.replace(/[\s\-\(\)\+]/g, '');
          if (cleanPhone.length < 6 || !/^\d+$/.test(cleanPhone)) {
            fieldError = true;
            if (errEl) {
              errEl.textContent = 'Please enter a valid phone number.';
            }
          }
        }

        if (fieldError) {
          isValid = false;
          if (wrapper) wrapper.classList.add('has-error');
          if (errEl) errEl.style.display = 'block';
          if (!firstInvalidInput) firstInvalidInput = inp;
        } else {
          if (wrapper) wrapper.classList.remove('has-error');
          if (errEl) errEl.style.display = 'none';
        }
      });

      var noticeDiv = form.querySelector('.form-notification') || form.querySelector('.guten-form-notice');

      if (!isValid) {
        if (firstInvalidInput) firstInvalidInput.focus();
        if (noticeDiv) {
          noticeDiv.className = 'form-notification alert alert-danger mt-3';
          noticeDiv.innerHTML = '<i class="fas fa-exclamation-circle me-2" style="margin-right: 8px;"></i> Please fill in all required fields correctly.';
          noticeDiv.style.display = 'block';
        }
        return;
      }

      // Valid: Show submission progress and success
      var submitBtn = form.querySelector('button[type="submit"], input[type="submit"], .guten-form-input-submit button, .gutenverse-btn');
      var originalBtnText = submitBtn ? submitBtn.innerText : '';
      var loader = form.querySelector('.gutenverse-input-submit-loader');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
      }
      if (loader) {
        loader.style.display = 'inline-block';
      }
      if (noticeDiv) {
        noticeDiv.style.display = 'none';
      }

      setTimeout(function () {
        var alertDiv = form.querySelector('.guten-form-notice');
        if (!alertDiv) {
          alertDiv = document.createElement('div');
          alertDiv.className = 'guten-form-notice alert alert-success mt-3';
          alertDiv.style.cssText = 'padding: 15px; margin-top: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 6px; font-weight: 500; text-align: center;';
          form.appendChild(alertDiv);
        }
        alertDiv.innerHTML = '<i class="fas fa-check-circle me-2" style="margin-right: 8px;"></i> Thank you! Your message has been sent successfully. We will get back to you soon.';
        alertDiv.style.display = 'block';

        form.reset();
        if (loader) {
          loader.style.display = 'none';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText || 'SUBMIT YOUR ENQUIRY';
        }
      }, 700);
    });
  }


  /* ---------------------------------------------------------------
     Smooth Scrolling for In-Page Anchor Links (Lenis Integrated)
  --------------------------------------------------------------- */
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href="#!"])').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var navbar = document.querySelector('.site-navbar');
          var navHeight = navbar ? navbar.offsetHeight : 0;
          if (window.lenis) {
            window.lenis.scrollTo(target, { offset: -(navHeight + 15) });
          } else {
            var targetPos = target.getBoundingClientRect().top + window.scrollY - (navHeight + 15);
            window.scrollTo({
              top: targetPos,
              behavior: 'smooth'
            });
          }
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      });
    });
  }

  /* ---------------------------------------------------------------
     Lenis Smooth Scrolling Engine (Desktop Physics-based Inertia)
  --------------------------------------------------------------- */
  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    // Respect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    try {
      var lenis = new Lenis({
        duration: 1.2,
        easing: function (t) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        },
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
        syncTouch: false, // Preserves 100% natural touch responsiveness on mobile
        infinite: false
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      window.lenis = lenis;
    } catch (e) {
      console.warn('[Lenis]: Smooth scroll initialization skipped:', e);
    }
  }

  /* ---------------------------------------------------------------
     6. Configurable Header Opacity Controller (.header)
     Controls the opacity of the element with the class .header.
     Supports:
     - Configurable opacity range (0 to 1)
     - Configurable timer duration in milliseconds (default 5000ms = 5s)
     - Smooth increase or decrease transition
     - Starts automatically on page load
     - Fully responsive across desktop and mobile browsers
     - Error handling if .header does not exist
     - Reusable function to easily change initial/target opacity and duration
  --------------------------------------------------------------- */
  function fadeHeader(options) {
    var opts = options || {};

    var selector = (opts.selector !== undefined) ? opts.selector : '.header';
    var headerElements = [];

    if (typeof selector === 'string') {
      try {
        headerElements = Array.prototype.slice.call(document.querySelectorAll(selector));
      } catch (err) {
        console.error('[Header Fade Error]: Invalid CSS selector "' + selector + '":', err);
        return null;
      }
    } else if (selector && selector.nodeType === 1) {
      headerElements = [selector];
    } else if (selector && selector.length) {
      headerElements = Array.prototype.slice.call(selector);
    }

    // Requirement 10: Error handling if the .header element does not exist
    if (!headerElements.length) {
      console.warn('[Header Fade Error]: Target element matching "' + selector + '" was not found in the DOM.');
      return null;
    }

    // Requirement 1: Range from 0 to 1 (clamped)
    var from = (typeof opts.from === 'number' && !isNaN(opts.from)) ? opts.from : 0;
    from = Math.max(0, Math.min(1, from));

    var to = (typeof opts.to === 'number' && !isNaN(opts.to)) ? opts.to : 1;
    to = Math.max(0, Math.min(1, to));

    // Requirement 2 & 4: Configurable timer duration in milliseconds (default 5000ms = 5s)
    var duration = (typeof opts.duration === 'number' && !isNaN(opts.duration) && opts.duration >= 0)
      ? opts.duration
      : 5000;

    // Requirement 3: Smooth transition
    var easing = opts.easing || 'cubic-bezier(0.25, 1, 0.5, 1)';
    var delay = (typeof opts.delay === 'number' && opts.delay >= 0) ? opts.delay : 0;

    // Top-to-bottom motion configuration (default: translateY(-40px) down to translateY(0))
    var motion = (opts.motion !== false);
    var startTransform = opts.startTransform || 'translateY(-40px)';
    var targetTransform = opts.targetTransform || 'translateY(0)';

    // Responsive / Accessibility check: reduced motion preference
    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      headerElements.forEach(function (el) {
        el.style.transition = 'none';
        el.style.opacity = to.toString();
        el.style.transform = 'none';
        el.style.willChange = 'auto';
        el.classList.add('is-revealed');
      });
      if (typeof opts.onComplete === 'function') {
        opts.onComplete(headerElements[0]);
      }
      return {
        element: headerElements[0],
        elements: headerElements,
        from: from,
        to: to,
        duration: duration,
        cancel: function () {},
        reverse: function () {}
      };
    }

    // Set initial state: Top-to-bottom motion starting above (-40px) and fading in
    headerElements.forEach(function (el) {
      el.style.transform = motion ? startTransform : 'none';
      el.style.transition = 'none';
      el.style.opacity = from.toString();
      el.style.willChange = motion ? 'opacity, transform' : 'opacity';
      void el.offsetHeight; // force reflow
    });

    var timerId = null;
    var completeTimerId = null;

    var startTransition = function () {
      headerElements.forEach(function (el) {
        el.style.transition = motion
          ? ('opacity ' + duration + 'ms ' + easing + ', transform ' + duration + 'ms ' + easing)
          : ('opacity ' + duration + 'ms ' + easing);
        el.style.opacity = to.toString();
        if (motion) {
          el.style.transform = targetTransform;
        }
        el.classList.add('is-revealed');
      });

      completeTimerId = setTimeout(function () {
        headerElements.forEach(function (el) {
          el.style.willChange = 'auto';
        });
        if (typeof opts.onComplete === 'function') {
          opts.onComplete(headerElements[0]);
        }
      }, duration + 50);
    };

    if (delay > 0) {
      timerId = setTimeout(startTransition, delay);
    } else {
      // Use double rAF to guarantee next paint cycle triggers transition
      requestAnimationFrame(function () {
        requestAnimationFrame(startTransition);
      });
    }

    // Return reusable controller object
    return {
      element: headerElements[0],
      elements: headerElements,
      from: from,
      to: to,
      duration: duration,
      cancel: function () {
        if (timerId) clearTimeout(timerId);
        if (completeTimerId) clearTimeout(completeTimerId);
        headerElements.forEach(function (el) {
          el.style.transition = 'none';
          el.style.willChange = 'auto';
        });
      },
      reverse: function (customDuration) {
        if (timerId) clearTimeout(timerId);
        if (completeTimerId) clearTimeout(completeTimerId);
        var revDuration = (typeof customDuration === 'number') ? customDuration : duration;
        headerElements.forEach(function (el) {
          el.style.transition = motion
            ? ('opacity ' + revDuration + 'ms ' + easing + ', transform ' + revDuration + 'ms ' + easing)
            : ('opacity ' + revDuration + 'ms ' + easing);
          el.style.opacity = from.toString();
          if (motion) {
            el.style.transform = startTransform;
          }
          el.classList.remove('is-revealed');
        });
      }
    };
  }

  // Expose globally on window for reusable consumption
  window.fadeHeader = fadeHeader;

  /* ---------------------------------------------------------------
     7. 3D Hover & Touch Flip for Service Boxes (.service-box)
  --------------------------------------------------------------- */
  function initServiceBoxFlip() {
    var serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(function (box) {
      // Toggle flip on touch / tap for mobile and tablet devices
      box.addEventListener('click', function (e) {
        // Allow clicks on links to navigate normally
        if (e.target.closest('a')) {
          return;
        }
        if (window.innerWidth < 992 || 'ontouchstart' in window) {
          box.classList.toggle('is-flipped');
        }
      });

      // Keyboard accessibility: press Enter or Space to flip
      box.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!e.target.closest('a')) {
            e.preventDefault();
            box.classList.toggle('is-flipped');
          }
        }
      });
    });
  }

  /* ---------------------------------------------------------------
     Configurable Icon Animation System (.gtn & <i>)
     Exposes global API to configure durations, easing, scales, and glows
  --------------------------------------------------------------- */
  window.iconAnimationConfig = {
    duration: '0.35s',
    durationFast: '0.2s',
    durationSlow: '0.6s',
    ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    easeSmooth: 'cubic-bezier(0.25, 1, 0.5, 1)',
    hoverScale: 1.15,
    activeScale: 0.92,
    configure: function (options) {
      if (!options || typeof options !== 'object') return;
      var root = document.documentElement;
      if (options.duration) root.style.setProperty('--icon-anim-duration', options.duration);
      if (options.durationFast) root.style.setProperty('--icon-anim-duration-fast', options.durationFast);
      if (options.durationSlow) root.style.setProperty('--icon-anim-duration-slow', options.durationSlow);
      if (options.delay) root.style.setProperty('--icon-anim-delay', options.delay);
      if (options.ease) root.style.setProperty('--icon-anim-ease', options.ease);
      if (options.easeSmooth) root.style.setProperty('--icon-anim-ease-smooth', options.easeSmooth);
      if (options.hoverScale) root.style.setProperty('--icon-hover-scale', String(options.hoverScale));
      if (options.activeScale) root.style.setProperty('--icon-active-scale', String(options.activeScale));
      if (options.glowShadow) root.style.setProperty('--icon-glow-shadow', options.glowShadow);
    }
  };

  /* ---------------------------------------------------------------
     Left-to-Right Animated Dividers (.wp-block-gutenverse-divider)
     Smoothly scales each divider line from 0% to 100% from left to right
     over 1.5s when entering viewport or automatically on page load.
  --------------------------------------------------------------- */
  function initDividerAnimations() {
    var dividerLines = document.querySelectorAll(
      '.wp-block-gutenverse-divider .guten-divider-line, .guten-divider .guten-divider-line'
    );
    if (!dividerLines.length) return;

    function animateDivider(el) {
      if (el.classList.contains('is-revealed')) {
        el.style.animation = 'none';
        void el.offsetHeight; // trigger reflow
      }
      el.classList.add('is-revealed');
      el.style.animation = 'gutenDividerExpand 1.5s ease-in-out forwards';
    }

    // Expose replay helper for testing/debugging
    window.replayAllDividers = function () {
      dividerLines.forEach(animateDivider);
    };

    var vh = window.innerHeight || document.documentElement.clientHeight;
    var triggerPoint = vh * 0.90; // Trigger when divider enters lower 90% of screen

    if ('IntersectionObserver' in window) {
      var animatedSet = new WeakSet();
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !animatedSet.has(entry.target)) {
            animatedSet.add(entry.target);
            animateDivider(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0,
        rootMargin: '0px 0px -10% 0px'
      });

      dividerLines.forEach(function (line) {
        var rect = line.getBoundingClientRect();
        // If already in visible viewport on initial page load (e.g. hero section)
        if (rect.top <= triggerPoint && rect.bottom >= 0) {
          animatedSet.add(line);
          setTimeout(function () {
            animateDivider(line);
          }, 150);
        } else if (rect.bottom < 0) {
          // Already scrolled past on page reload
          animatedSet.add(line);
          animateDivider(line);
        } else {
          observer.observe(line);
        }
      });
    } else {
      dividerLines.forEach(function (line) {
        animateDivider(line);
      });
    }
  }

      /* ---------------------------------------------------------------
     Tekosol Statistics Section
  --------------------------------------------------------------- */
  function initTekosolStats() {
      const section = document.querySelector('.tk-stats-section');
      if (!section || section.dataset.tkStatsInitialized) return;
      section.dataset.tkStatsInitialized = 'true';
  
      const counters = section.querySelectorAll('.tk-stat-counter');
      const desktopFlow = section.querySelector('.tk-flow-path');
      const desktopHighlight = section.querySelector('.tk-flow-highlight');
      const mobileFlow = section.querySelector('.tk-mobile-flow-path');
      const mobileHighlight = section.querySelector('.tk-mobile-highlight');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
      // Cubic ease-out calculation: 1 - Math.pow(1 - t, 3)
      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }
  
      function animateCounter(el, target, duration = 1400) {
        if (prefersReducedMotion) {
          el.textContent = target.toString();
          return;
        }
  
        let startTime = null;
  
        function step(currentTime) {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentVal = Math.floor(easeOutCubic(progress) * target);
  
          el.textContent = currentVal.toString();
  
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target.toString();
          }
        }
  
        requestAnimationFrame(step);
      }
  
      // Set precise SVG geometry based on measured path lengths
      function setupPathGeometry() {
        // Desktop Path
        if (desktopFlow) {
          try {
            const dLen = Math.ceil(desktopFlow.getTotalLength());
            desktopFlow.style.strokeDasharray = dLen + 'px';
            desktopFlow.style.strokeDashoffset = dLen + 'px';
  
            if (desktopHighlight) {
              desktopHighlight.style.strokeDasharray = '90px ' + (dLen + 200) + 'px';
              desktopHighlight.style.strokeDashoffset = (dLen + 90) + 'px';
            }
          } catch (e) {}
        }
  
        // Mobile Path
        if (mobileFlow) {
          try {
            const mLen = Math.ceil(mobileFlow.getTotalLength());
            mobileFlow.style.strokeDasharray = mLen + 'px';
            mobileFlow.style.strokeDashoffset = mLen + 'px';
  
            if (mobileHighlight) {
              mobileHighlight.style.strokeDasharray = '70px ' + (mLen + 150) + 'px';
              mobileHighlight.style.strokeDashoffset = (mLen + 70) + 'px';
            }
          } catch (e) {}
        }
      }
  
      let hasTriggered = false;
  
      function runAnimationTimeline() {
        if (hasTriggered) return;
        hasTriggered = true;
  
        // Reduced motion bypass
        if (prefersReducedMotion) {
          section.classList.add('tk-visible', 'tk-animating', 'tk-content-revealed', 'tk-highlight-active');
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
            counter.textContent = target.toString();
          });
          return;
        }
  
        // Step 1: Reveal section and start continuous border drawing
        section.classList.add('tk-visible');
  
        // Arm continuous border stroke transition
        setTimeout(function() {
          section.classList.add('tk-animating');
  
          if (desktopFlow) {
            desktopFlow.style.strokeDashoffset = '0px';
          }
          if (mobileFlow) {
            mobileFlow.style.strokeDashoffset = '0px';
          }
        }, 80);
  
        // Step 6: As the border draws into Circle 2 (at ~1900ms), reveal numbers and icons!
        setTimeout(function() {
          section.classList.add('tk-content-revealed');
  
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
            animateCounter(counter, target, 1400);
          });
        }, 1900);
  
        // Activate ambient moving highlight after continuous border completion
        setTimeout(function() {
          section.classList.add('tk-highlight-active');
        }, 2500);
      }
  
      // Public method to replay animation on demand
      window.replayTekosolStats = function() {
        section.classList.remove('tk-visible', 'tk-animating', 'tk-content-revealed', 'tk-highlight-active');
  
        counters.forEach(counter => {
          counter.textContent = '0';
        });
  
        setupPathGeometry();
  
        setTimeout(function() {
          hasTriggered = false;
          runAnimationTimeline();
        }, 120);
      };
  
      setupPathGeometry();
  
      // Trigger on viewport entrance via IntersectionObserver
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              runAnimationTimeline();
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px'
        });
  
        observer.observe(section);
      } else {
        runAnimationTimeline();
      }
    }

  /* ---------------------------------------------------------------
     Initialize
  --------------------------------------------------------------- */
  function init() {
    initLenis();
    initStickyNavbar();
    initMobileNavAutoClose();
    initScrollAnimations();
    initServiceBoxFlip();
    initSmoothScrolling();
    fixSocialLinks();
    initContactForm();
    initDividerAnimations();
    initTekosolStats();

    // Automatically start header opacity animation on page load (5000ms default)
    var headerConfig = window.headerFadeConfig || {
      selector: '.header',
      from: 0,
      to: 1,
      duration: 5000
    };
    window.headerFadeController = fadeHeader(headerConfig);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
