document.addEventListener('DOMContentLoaded', function() {
    const adminLoginForm = document.getElementById('adminLoginForm');

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }

    checkAdminAuth();
});

async function handleAdminLogin(e) {
    e.preventDefault();

    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    try {
        const response = await adminLogin(email, password);

        if (response.token) {
            saveAuthToken(response.token);
            localStorage.setItem('isAdmin', 'true');
            window.location.href = 'admin-dashboard.html';
        } else {
            showAdminLoginError('Invalid admin credentials.');
        }
    } catch (error) {
        console.error('Admin login error:', error);
        showAdminLoginError('Login failed. Please check your credentials.');
    }
}

function showAdminLoginError(message) {
    const alert = document.getElementById('loginAlert');
    alert.textContent = message;
    alert.classList.remove('d-none');
}

function checkAdminAuth() {
    const currentPage = window.location.pathname;
    const isAdminPage = currentPage.includes('/admin/') || currentPage.includes('admin-');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const isAuthenticated = !!getAuthToken();

    if (isAdminPage && (!isAuthenticated || !isAdmin)) {
        window.location.href = '/admin-login.html';
    }
}

function adminLogout() {
    removeAuthToken();
    localStorage.removeItem('isAdmin');
    window.location.href = 'admin-login.html';
}
