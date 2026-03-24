document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);

        const customerRole = document.getElementById('customerRole');
        const adminRole = document.getElementById('adminRole');

        if (customerRole && adminRole) {
            customerRole.addEventListener('change', updateLoginUI);
            adminRole.addEventListener('change', updateLoginUI);
        }
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

function updateLoginUI() {
    const selectedRole = document.querySelector('input[name="userRole"]:checked').value;
    const loginIcon = document.getElementById('loginIcon');
    const loginTitle = document.getElementById('loginTitle');

    if (selectedRole === 'admin') {
        loginIcon.className = 'bi bi-shield-lock-fill display-4 text-danger';
        loginTitle.textContent = 'Admin Login';
    } else {
        loginIcon.className = 'bi bi-person-circle display-4 text-primary';
        loginTitle.textContent = 'Customer Login';
    }
}

async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const selectedRole = document.querySelector('input[name="userRole"]:checked')?.value || 'customer';

    if (!email || !password) {
        showLoginError('Please enter both email and password!');
        return;
    }

    try {
        let response;

        if (selectedRole === 'admin') {
            response = await adminLogin(email, password);
        } else {
            response = await customerLogin(email, password);
        }

        if (response.token) {
            saveAuthToken(response.token);

            // Check if there's a return URL
            const urlParams = new URLSearchParams(window.location.search);
            const returnUrl = urlParams.get('return');

            if (selectedRole === 'admin') {
                localStorage.setItem('isAdmin', 'true');
                window.location.href = '/admin/dashboard.html';
            } else {
                if (returnUrl) {
                    window.location.href = decodeURIComponent(returnUrl);
                } else {
                    window.location.href = '/vehicles.html';
                }
            }
        } else {
            showLoginError('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login error:', error);
        showLoginError('Login failed. Please check your credentials and try again.');
    }
}

async function handleRegister(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if (!firstName || !lastName) {
        showRegisterError('First name and last name are required!');
        return;
    }

    if (!email || !email.includes('@')) {
        showRegisterError('Please enter a valid email address!');
        return;
    }

    if (!phone || phone.length < 10) {
        showRegisterError('Please enter a valid phone number!');
        return;
    }

    if (password.length < 6) {
        showRegisterError('Password must be at least 6 characters long!');
        return;
    }

    if (password !== confirmPassword) {
        showRegisterError('Passwords do not match!');
        return;
    }

    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
    };

    try {
        const response = await customerRegister(userData);

        if (response.success || response.token) {
            if (response.token) {
                saveAuthToken(response.token);
            }
            showRegisterSuccess('Registration successful! Redirecting...');
            
            // Check if there's a return URL
            const urlParams = new URLSearchParams(window.location.search);
            const returnUrl = urlParams.get('return');
            
            setTimeout(() => {
                if (returnUrl) {
                    window.location.href = decodeURIComponent(returnUrl);
                } else {
                    window.location.href = '/vehicles.html';
                }
            }, 1500);
        } else {
            showRegisterError('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showRegisterError('Registration failed. Email may already be in use.');
    }
}

function showLoginError(message) {
    const alert = document.getElementById('loginAlert');
    alert.textContent = message;
    alert.classList.remove('d-none');
}

function showRegisterError(message) {
    const alert = document.getElementById('registerAlert');
    alert.className = 'alert alert-danger';
    alert.textContent = message;
    alert.classList.remove('d-none');
}

function showRegisterSuccess(message) {
    const alert = document.getElementById('registerAlert');
    alert.className = 'alert alert-success';
    alert.textContent = message;
    alert.classList.remove('d-none');
}
