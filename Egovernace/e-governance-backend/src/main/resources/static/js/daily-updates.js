// js/daily-updates.js - Specific JavaScript for the Daily Updates page

document.addEventListener('DOMContentLoaded', () => {
    console.log('Daily Updates page scripts loaded.');

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

    // --- Load More Updates Functionality ---
    const loadMoreBtn = document.getElementById('loadMoreUpdates');
    const updatesGrid = document.querySelector('.updates-grid');
    const allUpdatesLoadedMsg = document.querySelector('.all-updates-loaded');

    const allUpdates = [
        // These are just example new updates. You would fetch these from a server in a real app.
        {
            image: 'https://via.placeholder.com/400x250/F9FF4B/1a4d35?text=Rural+Development',
            date: 'October 20, 2024',
            title: 'Rural Development Initiative Expands',
            snippet: 'The Ministry of Rural Development has announced the expansion of its electrification and water access program to 30 more villages...'
        },
        {
            image: 'https://via.placeholder.com/400x250/1a4d35/F9FF4B?text=Digital+Inclusion',
            date: 'October 19, 2024',
            title: 'Digital Inclusion Program for Seniors Launched',
            snippet: 'A new program to provide digital literacy training and device subsidies for senior citizens across the nation has been initiated...'
        },
        {
            image: 'https://via.placeholder.com/400x250/2f6e48/F9FF4B?text=Food+Security',
            date: 'October 18, 2024',
            title: 'National Food Security Strategy Unveiled',
            snippet: 'The government has presented its comprehensive strategy to bolster national food security, focusing on sustainable agriculture and food reserves...'
        }
    ];

    let updatesLoadedCount = 6; // We already have 6 static updates in HTML
    const updatesPerLoad = 3;

    function createUpdateCard(updateData, delay) {
        const updateCard = document.createElement('div');
        updateCard.classList.add('update-card');
        updateCard.setAttribute('data-animation', 'fade-in-up');
        updateCard.setAttribute('data-delay', delay.toFixed(1)); // Ensures delay is like "0.1"

        updateCard.innerHTML = `
            <div class="update-image">
                <img src="${updateData.image}" alt="${updateData.title}">
            </div>
            <div class="update-content">
                <span class="update-date"><i class="far fa-calendar-alt"></i> ${updateData.date}</span>
                <h4>${updateData.title}</h4>
                <p>${updateData.snippet}</p>
                <a href="#" class="read-more-link">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        return updateCard;
    }

    if (loadMoreBtn && updatesGrid) {
        loadMoreBtn.addEventListener('click', () => {
            const nextUpdates = allUpdates.slice(updatesLoadedCount - 6, updatesLoadedCount - 6 + updatesPerLoad); // Adjust slice for new data
            if (nextUpdates.length > 0) {
                let delay = 0.1;
                nextUpdates.forEach(updateData => {
                    const newCard = createUpdateCard(updateData, delay);
                    updatesGrid.appendChild(newCard);
                    observer.observe(newCard); // Observe the newly added elements
                    delay += 0.1;
                });
                updatesLoadedCount += nextUpdates.length;

                // Disable button if all fake updates are loaded
                if (updatesLoadedCount >= (6 + allUpdates.length)) {
                    loadMoreBtn.style.display = 'none';
                    allUpdatesLoadedMsg.style.display = 'block';
                }
            } else {
                loadMoreBtn.style.display = 'none';
                allUpdatesLoadedMsg.style.display = 'block';
            }
        });
    }
});