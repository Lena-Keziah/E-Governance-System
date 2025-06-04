/*
    File: PROJECT/js/passport.js
    Description: Page-specific JavaScript for Passport Application Form.
    Handles form validation and submission logic.
*/

document.addEventListener('DOMContentLoaded', () => {
    const passportForm = document.getElementById('passportApplicationForm');

    if (passportForm) { // Ensure the form exists on the page
        passportForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Client-side Validation
            let isValid = true;
            const requiredInputs = passportForm.querySelectorAll('[required]');

            requiredInputs.forEach(input => {
                // Reset border color
                input.style.borderColor = '';

                if (input.type === 'file') {
                    if (input.files.length === 0) {
                        isValid = false;
                        input.style.borderColor = 'red'; // Highlight empty required file fields
                    }
                } else if (input.type === 'checkbox') {
                    if (!input.checked) {
                        isValid = false;
                        // For checkboxes, you might highlight the label or the area around it
                        // For simplicity, we'll rely on the alert for now.
                    }
                } else {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'red'; // Highlight empty required text fields
                    }
                }
            });

            // Specific check for the declaration checkbox
            const declarationCheckbox = document.getElementById('declaration');
            if (declarationCheckbox && !declarationCheckbox.checked) {
                isValid = false;
            }

            if (!isValid) {
                alert('Please fill in all required fields and upload all necessary documents, and agree to the declaration.');
                return;
            }

            // If validation passes, simulate form submission
            alert('Passport application submitted successfully! Your application is being processed.');

            // In a real application, you would send this data to a server using Fetch API:
            /*
            const formData = new FormData(passportForm); // Collects all form data including files
            fetch('/api/submit-passport-application', { // Replace with your actual API endpoint
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Application submitted successfully! Your tracking ID is ' + data.trackingId);
                    window.location.href = 'confirmation.html?trackingId=' + data.trackingId; // Redirect to a confirmation page
                } else {
                    alert('Submission failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during submission. Please try again.');
            });
            */

            // For demo purposes, redirect to services page after successful "submission"
            window.location.href = 'services.html';
        });
    }
});