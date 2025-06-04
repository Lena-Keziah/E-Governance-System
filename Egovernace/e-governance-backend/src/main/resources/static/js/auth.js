// js/auth.js - JavaScript specific to Login and Signup pages

document.addEventListener('DOMContentLoaded', () => {
    console.log('e-GovCameroon auth scripts loaded.');

    // --- Authentication Form Handling ---

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => { // Added async for potential future async calls
            event.preventDefault(); // Prevent default form submission

            const emailInput = document.getElementById('loginEmail');
            const passwordInput = document.getElementById('loginPassword');
            const emailError = document.getElementById('loginEmailError');
            const passwordError = document.getElementById('loginPasswordError');

            let isValid = true;

            // Basic Client-side Validation
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required.';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.textContent = '';
                emailError.style.display = 'none';
            }

            if (passwordInput.value.trim() === '') {
                passwordError.textContent = 'Password is required.';
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                passwordError.textContent = '';
                passwordError.style.display = 'none';
            }

            if (isValid) {
                // --- Frontend Login Simulation ---
                // In a real application, you would send these credentials to your Spring Boot backend
                // via an AJAX (fetch/axios) request. The backend would validate them against a database.

                console.log('Simulating Login...');
                console.log('Email:', emailInput.value);
                console.log('Password:', passwordInput.value);

                // Simulate a successful login after a short delay
                const authButton = loginForm.querySelector('.auth-btn');
                authButton.disabled = true; // Disable button to prevent double submission
                authButton.textContent = 'Logging In...'; // Provide feedback

                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

                alert('Login successful! Redirecting to services...');
                localStorage.setItem('userLoggedIn', 'true'); // Set flag for access control
                window.location.href = 'services.html'; // Redirect to services page

                // In a real scenario, you'd handle success/failure from backend response
                // if (response.ok) { ... redirect ... } else { ... show error from backend ... }
            }
        });
    }

    // Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => { // Added async for potential future async calls
            event.preventDefault(); // Prevent default form submission

            const usernameInput = document.getElementById('signupUsername');
            const emailInput = document.getElementById('signupEmail');
            const passwordInput = document.getElementById('signupPassword');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const agreeTermsCheckbox = document.getElementById('agreeTerms');

            const usernameError = document.getElementById('signupUsernameError');
            const emailError = document.getElementById('signupEmailError');
            const passwordError = document.getElementById('signupPasswordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');

            let isValid = true;

            // Basic Client-side Validation
            if (usernameInput.value.trim() === '') {
                usernameError.textContent = 'Full Name is required.';
                usernameError.style.display = 'block';
                isValid = false;
            } else {
                usernameError.textContent = '';
                usernameError.style.display = 'none';
            }

            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required.';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.textContent = '';
                emailError.style.display = 'none';
            }

            if (passwordInput.value.trim() === '') {
                passwordError.textContent = 'Password is required.';
                passwordError.style.display = 'block';
                isValid = false;
            } else if (passwordInput.value.trim().length < 8) { // Increased minimum password length for professionalism
                passwordError.textContent = 'Password must be at least 8 characters long.';
                passwordError.style.display = 'block';
                isValid = false;
            } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(passwordInput.value.trim())) { // Stronger password requirements
                passwordError.textContent = 'Password must include uppercase, lowercase, number, and special character.';
                passwordError.style.display = 'block';
                isValid = false;
            }
            else {
                passwordError.textContent = '';
                passwordError.style.display = 'none';
            }

            if (confirmPasswordInput.value.trim() === '') {
                confirmPasswordError.textContent = 'Please confirm your password.';
                confirmPasswordError.style.display = 'block';
                isValid = false;
            } else if (confirmPasswordInput.value !== passwordInput.value) {
                confirmPasswordError.textContent = 'Passwords do not match.';
                confirmPasswordError.style.display = 'block';
                isValid = false;
            } else {
                confirmPasswordError.textContent = '';
                confirmPasswordError.style.display = 'none';
            }

            if (!agreeTermsCheckbox.checked) {
                alert('You must agree to the Terms of Service and Privacy Policy.');
                isValid = false;
            }

            if (isValid) {
                // --- Frontend Signup Simulation ---
                // In a real application, you would send this user data to your Spring Boot backend
                // to create a new user account and store it in a database.

                console.log('Simulating Signup...');
                console.log('Full Name:', usernameInput.value);
                console.log('Email:', emailInput.value);
                console.log('Password:', passwordInput.value);

                const authButton = signupForm.querySelector('.auth-btn');
                authButton.disabled = true; // Disable button to prevent double submission
                authButton.textContent = 'Registering...'; // Provide feedback

                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

                alert('Account created successfully! Redirecting to services...');
                localStorage.setItem('userLoggedIn', 'true'); // Set flag for access control
                window.location.href = 'services.html'; // Redirect to services page
            }
        });
    }

    // --- Utility Function: Email Validation ---
    function isValidEmail(email) {
        // More robust regex for email validation
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});


// --- Global Function (made accessible globally) : Toggle Password Visibility ---
// This function can be called from HTML onclick attributes
window.togglePasswordVisibility = function(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const toggleIcon = passwordField.nextElementSibling.querySelector('i'); // Assumes icon is sibling of input

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    }
};