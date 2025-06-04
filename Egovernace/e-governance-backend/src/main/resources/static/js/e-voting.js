// js/e-voting.js - Specific JavaScript for the E-Voting page

document.addEventListener('DOMContentLoaded', () => {
    console.log('E-Voting page scripts loaded.');

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
                // Only unobserve if you want the animation to run once
                // If you want it to re-run on scroll-up/down, remove this line:
                observer.unobserve(entry.target);
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

    // --- FAQ Accordion Functionality ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentContent = header.nextElementSibling;
            const currentItem = header.closest('.accordion-item');

            // Toggle active class on the header
            header.classList.toggle('active');

            // Toggle show class on the content
            if (currentContent.classList.contains('show')) {
                currentContent.classList.remove('show');
                currentContent.style.maxHeight = '0'; // Collapse
                currentContent.style.padding = '0 25px'; // Reset padding
            } else {
                // Close other open accordions (optional, but good UX)
                document.querySelectorAll('.accordion-content.show').forEach(openContent => {
                    openContent.classList.remove('show');
                    openContent.style.maxHeight = '0';
                    openContent.style.padding = '0 25px';
                    openContent.previousElementSibling.classList.remove('active'); // Deactivate header
                });

                currentContent.classList.add('show');
                // Set max-height to scrollHeight for smooth auto-height transition
                currentContent.style.maxHeight = currentContent.scrollHeight + 30 + 'px'; // +30 for the desired padding
                currentContent.style.padding = '20px 25px 25px 25px'; // Apply padding when open
            }
        });
    });
});