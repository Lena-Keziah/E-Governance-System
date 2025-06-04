// js/home.js - Specific JavaScript for the Home page

document.addEventListener('DOMContentLoaded', () => {
    console.log('Home page scripts loaded.');

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


    // --- Typing Effect for Hero Tagline ---
    const heroTaglineElement = document.getElementById('hero-tagline');
    if (heroTaglineElement) {
        const originalText = "Connecting citizens to essential government services with efficiency, transparency, and ease. Experience digital governance at your fingertips.";
        heroTaglineElement.textContent = ''; // Clear text initially
        heroTaglineElement.setAttribute('data-original-text', originalText); // Store original text

        const typeSpeed = 30; // Milliseconds per character
        let i = 0;

        // Function to start typing effect
        function typeWriter() {
            if (i < originalText.length) {
                heroTaglineElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }

        // Delay typing effect until the hero section is visible
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    typeWriter();
                    heroObserver.disconnect(); // Stop observing once typing starts
                }
            }, { threshold: 0.5 }); // Start when hero section is 50% visible
            heroObserver.observe(heroSection);
        }
    }


    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // When the user scrolls down 200px from the top of the document, show the button
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
            scrollToTopBtn.style.opacity = "1";
        } else {
            scrollToTopBtn.style.opacity = "0";
            // Using a timeout to ensure transition finishes before display: none
            setTimeout(() => {
                if (document.body.scrollTop <= 200 && document.documentElement.scrollTop <= 200) {
                    scrollToTopBtn.style.display = "none";
                }
            }, 300); // Match CSS transition duration
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", topFunction);
    }

    function topFunction() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});