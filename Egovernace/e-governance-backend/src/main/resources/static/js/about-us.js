// js/about-us.js - Specific JavaScript for the About Us page

document.addEventListener('DOMContentLoaded', () => {
    console.log('About Us page scripts loaded.');

    // --- On-Scroll Animations with Intersection Observer ---
    const animatedElements = document.querySelectorAll('[data-animation]');

    const observerOptions = {
        root: null, // viewport as the root
        rootMargin: '0px',
        threshold: 0.2 // Element is visible when 20% of it is in the viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Scroll to Top Button (re-use global function) ---
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            if (scrollToTopBtn) {
                scrollToTopBtn.style.display = "block";
                scrollToTopBtn.style.opacity = "1";
            }
        } else {
            if (scrollToTopBtn) {
                scrollToTopBtn.style.opacity = "0";
                setTimeout(() => {
                    if (document.body.scrollTop <= 200 && document.documentElement.scrollTop <= 200) {
                        scrollToTopBtn.style.display = "none";
                    }
                }, 300);
            }
        }
    };

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});