/**
* Template Name: Sailor
* Template URL: https://bootstrapmade.com/sailor-free-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Section 2
   */
  function matchHeight() {
    const leftCol = document.getElementById("leftColWrapper");
    const rightCol = document.getElementById("rightColWrapper");
    
    // Reset to auto first for accurate measurement
    leftCol.style.height = "auto";
    rightCol.style.height = "auto";
  
    const leftHeight = leftCol.getBoundingClientRect().height;
    const rightHeight = rightCol.getBoundingClientRect().height;
  
    if (leftHeight > rightHeight) {
      leftCol.style.height = rightHeight + "px";
    }
  }
  
  window.addEventListener("load", matchHeight);
  window.addEventListener("resize", matchHeight);

  /**
   * Author Scroll
   */
  document.addEventListener("DOMContentLoaded", function () {
    const scrollArea = document.querySelector(".scroll-area");
    const scrollInner = document.querySelector(".scroll-inner");
    const contentArea = document.querySelector(".content-area");

    // Clone the scroll-inner content
    const clone = scrollInner.cloneNode(true);
    clone.classList.add("scroll-clone");
    scrollArea.appendChild(clone);

    // Set height of scroll area to match .content-area
    const contentHeight = contentArea.offsetHeight;
    scrollArea.style.height = contentHeight + "px";
  });
    
  /**
   * Odometer
   */
  document.addEventListener("DOMContentLoaded", function () {
    const odometerEl = document.querySelector(".odometer");
    const target = parseInt(odometerEl.getAttribute("data-count"), 10);
    const duration = 4000; // in milliseconds
    const totalSteps = target + 1; // Includes 0
    const stepTime = duration / totalSteps;
    let interval;
  
    function startCounter() {
      clearInterval(interval); // Clear any running counter
      let current = 0;
  
      interval = setInterval(() => {
        odometerEl.textContent = current;
        current++;
        if (current > target) {
          clearInterval(interval);
        }
      }, stepTime);
    }
  
    // Intersection Observer to trigger counter on visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCounter(); // Restart counter every time it comes into view
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% visible
      }
    );
  
    if (odometerEl) {
      observer.observe(odometerEl);
    }
  });
   
  
  /**
   * Stats
   */
  document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter-value");
  
    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
    }
  
    function animateDigit(element, targetDigit, frames, onComplete) {
      let current = 0;
      let frameCount = 0;
      const step = 1;
  
      function stepFn() {
        if (frameCount < frames) {
          element.innerText = current;
          current = (current + step) % 10;
          frameCount++;
          requestAnimationFrame(stepFn);
        } else {
          element.innerText = targetDigit;
          if (onComplete) onComplete();
        }
      }
      stepFn();
    }
  
    function animateNumber(element, targetNumber, duration = 2000, fps = 30) {
      const totalFrames = Math.round((duration / 1000) * fps);
      const digits = targetNumber.toString().split("");
      const digitCount = digits.length;
  
      element.innerHTML = "";
      digits.forEach(() => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.style.width = "1ch";
        element.appendChild(span);
      });
  
      let currentDigitIndex = digitCount - 1;
  
      function animateNextDigit() {
        if (currentDigitIndex >= 0) {
          const digitSpan = element.children[currentDigitIndex];
          const targetDigit = parseInt(digits[currentDigitIndex]);
  
          animateDigit(digitSpan, targetDigit, totalFrames, () => {
            currentDigitIndex--;
            animateNextDigit();
          });
        }
      }
  
      animateNextDigit();
    }
  
    counters.forEach(counter => {
      counter.setAttribute("data-target", counter.innerText.trim());
      counter.innerText = "0";
    });
  
    function checkAndAnimateCounters() {
      counters.forEach(counter => {
        if (isInViewport(counter)) {
          const target = parseInt(counter.getAttribute("data-target"));
          if (!target || isNaN(target)) return;
          animateNumber(counter, target, 3000, 60);
        }
      });
    }
  
    window.addEventListener("scroll", checkAndAnimateCounters);
    window.addEventListener("resize", checkAndAnimateCounters);
    checkAndAnimateCounters();
  });
  


  /**
   * Preloader
   */
  let percent = 0;
  const preloaderPercentage = document.getElementById('preloader-percentage');
  const logo = document.getElementById('logo');

  const interval = setInterval(() => {
    percent++;
    preloaderPercentage.innerText = percent + '%';

    // Set logo opacity from 0 (0%) to 1 (100%)
    logo.style.opacity = percent / 100;

    if (percent >= 100) {
      clearInterval(interval);
      document.getElementById('preloader').style.display = 'none';
    }
  }, 30); // Adjust speed as needed


  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  
  /**
   * Hero Strip sliders
   */
  document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
  
    slides.forEach((slide, index) => {
      const img = slide.querySelector("img");
      const stripContainer = document.createElement("div");
      stripContainer.className = "strip-container";
      slide.appendChild(stripContainer);
  
      const stripCount = 33;
      for (let i = 0; i < stripCount; i++) {
        const strip = document.createElement("div");
        strip.className = "strip";
        strip.style.animationDelay = `${Math.random() * 2 + 3}s`;
        stripContainer.appendChild(strip);
      }
  
      setTimeout(() => {
        img.style.opacity = 1;
      }, 4000);
    });
  });

  /**
   * Hero Services Section
   */
  document.querySelectorAll('.glow-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      wrap.classList.toggle('show-label');
    });
  });

  window.addEventListener("load", initSwiper);

})();

