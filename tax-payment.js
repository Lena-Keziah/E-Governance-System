// js/tax-payment.js - Specific JavaScript for the Tax Payment page

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tax Payment page scripts loaded.');

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

    // --- Tax Payment Form Handling ---
    const taxPaymentForm = document.getElementById('taxPaymentForm');
    if (taxPaymentForm) {
        taxPaymentForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const taxIdInput = document.getElementById('taxId');
            const taxPeriodInput = document.getElementById('taxPeriod');
            const taxAmountInput = document.getElementById('taxAmount');
            const taxTypeSelect = document.getElementById('taxType');
            const agreeToTermsCheckbox = document.getElementById('agreeToTerms');
            const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
            const paymentStatusDiv = document.getElementById('paymentStatus');
            const submitBtn = taxPaymentForm.querySelector('.submit-payment-btn');

            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            paymentStatusDiv.style.display = 'none';
            paymentStatusDiv.className = 'payment-status'; // Reset classes

            // Validate Tax ID
            if (taxIdInput.value.trim() === '') {
                displayError('taxIdError', 'Taxpayer Identification Number is required.');
                isValid = false;
            } else if (!/^[0-9A-Za-z]+$/.test(taxIdInput.value.trim())) {
                displayError('taxIdError', 'TIN can only contain alphanumeric characters.');
                isValid = false;
            }

            // Validate Tax Period
            if (taxPeriodInput.value.trim() === '') {
                displayError('taxPeriodError', 'Tax Period is required.');
                isValid = false;
            }

            // Validate Tax Amount
            if (taxAmountInput.value.trim() === '' || parseFloat(taxAmountInput.value) <= 0) {
                displayError('taxAmountError', 'Amount Due must be a positive number.');
                isValid = false;
            }

            // Validate Tax Type
            if (taxTypeSelect.value === '') {
                displayError('taxTypeError', 'Please select a tax type.');
                isValid = false;
            }

            // Validate Payment Method (at least one must be checked)
            const selectedPaymentMethod = Array.from(paymentMethodRadios).find(radio => radio.checked);
            if (!selectedPaymentMethod) {
                displayError('paymentMethodError', 'Please select a payment method.');
                isValid = false;
            }

            // Validate Terms and Conditions
            if (!agreeToTermsCheckbox.checked) {
                displayError('termsError', 'You must agree to the payment terms and conditions.');
                isValid = false;
            }

            if (isValid) {
                // Payment Processing - Modified to send data to Java backend
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing Payment...';

                const formData = {
                    taxId: taxIdInput.value.trim(),
                    taxPeriod: taxPeriodInput.value.trim(),
                    taxAmount: parseFloat(taxAmountInput.value),
                    taxType: taxTypeSelect.value,
                    paymentMethod: selectedPaymentMethod.value
                };
                console.log('Payment data being sent:', formData); // Log data being sent

                try {
                    // Send data to your Spring Boot backend
                    const response = await fetch('http://localhost:8080/api/tax/pay', { // Adjust URL if your backend runs on a different port/path
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        const result = await response.json(); // Assuming the backend sends a JSON response
                        paymentStatusDiv.classList.add('success');
                        paymentStatusDiv.textContent = `Payment successful! Server response: ${result.message}`;
                        taxPaymentForm.reset(); // Clear form on success
                        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none'); // Clear errors
                    } else {
                        // Handle server-side errors or non-2xx responses
                        const errorData = await response.json(); // Attempt to parse error message from backend
                        paymentStatusDiv.classList.add('error');
                        paymentStatusDiv.textContent = `Payment failed. ${errorData.message || 'Please try again or contact support.'}`;
                    }
                } catch (error) {
                    // Handle network errors or other issues
                    console.error('Error during payment submission:', error);
                    paymentStatusDiv.classList.add('error');
                    paymentStatusDiv.textContent = 'An error occurred during payment. Please check your network connection and try again.';
                } finally {
                    paymentStatusDiv.style.display = 'block'; // Show status message
                    submitBtn.disabled = false; // Re-enable button
                    submitBtn.innerHTML = 'Proceed to Payment <i class="fas fa-check-circle"></i>'; // Reset button text
                }
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