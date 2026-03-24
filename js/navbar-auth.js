document.addEventListener('DOMContentLoaded', function() {
    updateNavbarAuth();
});

function updateNavbarAuth() {
    if (!isAuthenticated()) return;

    const navbar = document.querySelector('.navbar-nav');
    if (!navbar) return;

    const loginBtn = navbar.querySelector('a[href="customer-login.html"]');
    const registerBtn = navbar.querySelector('a[href="customer-register.html"]');

    if (loginBtn && registerBtn) {
        const parentLi1 = loginBtn.closest('li');
        const parentLi2 = registerBtn.closest('li');

        if (parentLi1 && parentLi2) {
            parentLi1.remove();
            parentLi2.remove();

            const logoutLi = document.createElement('li');
            logoutLi.className = 'nav-item ms-lg-2';
            logoutLi.innerHTML = `
                <a class="btn btn-outline-light btn-sm" href="#" onclick="handleNavLogout(event)">
                    <i class="bi bi-box-arrow-right"></i> Logout
                </a>
            `;
            navbar.appendChild(logoutLi);
        }
    }
}

function handleNavLogout(e) {
    e.preventDefault();
    removeAuthToken();
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}
