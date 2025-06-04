// js/feedback.js - Specific JavaScript for the Feedback & Complaints page

document.addEventListener('DOMContentLoaded', () => {
    console.log('Feedback & Complaints page scripts loaded.');

    // --- On-Scroll Animations with Intersection Observer (re-used from other pages) ---
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

    // --- Feedback Form Handling ---
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const feedbackTypeRadios = document.querySelectorAll('input[name="feedbackType"]');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            const agreeToPrivacyCheckbox = document.getElementById('agreeToPrivacy');
            const submissionStatusDiv = document.getElementById('submissionStatus');
            const submitBtn = feedbackForm.querySelector('.submit-feedback-btn');

            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            submissionStatusDiv.style.display = 'none';
            submissionStatusDiv.className = 'submission-status'; // Reset classes

            // Validate Feedback Type (at least one must be checked)
            const selectedFeedbackType = Array.from(feedbackTypeRadios).find(radio => radio.checked);
            if (!selectedFeedbackType) {
                displayError('feedbackTypeError', 'Please select a type of feedback.');
                isValid = false;
            }

            // Validate Subject
            if (subjectInput.value.trim() === '') {
                displayError('subjectError', 'Subject is required.');
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                displayError('messageError', 'Your message is required.');
                isValid = false;
            } else if (messageInput.value.trim().length < 20) {
                displayError('messageError', 'Please provide a more detailed message (min 20 characters).');
                isValid = false;
            }

            // Validate Privacy Policy Agreement
            if (!agreeToPrivacyCheckbox.checked) {
                displayError('privacyError', 'You must agree to the privacy policy.');
                isValid = false;
            }

            if (isValid) {
                // Simulate Submission Processing
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';

                const formData = {
                    feedbackType: selectedFeedbackType ? selectedFeedbackType.value : '',
                    subject: subjectInput.value.trim(),
                    message: messageInput.value.trim(),
                    fullName: document.getElementById('fullName').value.trim(), // Optional
                    emailOrPhone: document.getElementById('emailOrPhone').value.trim() // Optional
                };
                console.log('Feedback data:', formData);

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Simulate success or failure
                const isSubmissionSuccessful = Math.random() > 0.1; // 90% chance of success

                if (isSubmissionSuccessful) {
                    submissionStatusDiv.classList.add('success');
                    submissionStatusDiv.textContent = 'Thank you! Your feedback has been submitted successfully.';
                    feedbackForm.reset(); // Clear form on success
                    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none'); // Clear errors
                } else {
                    submissionStatusDiv.classList.add('error');
                    submissionStatusDiv.textContent = 'Submission failed. Please try again later or contact support directly.';
                }
                submissionStatusDiv.style.display = 'block';

                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit Feedback <i class="fas fa-paper-plane"></i>';
            }
        });
    }

    function displayError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
});