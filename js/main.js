document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScroll();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    updateNavForAuthState();
}

function updateNavForAuthState() {
    const isAuth = isAuthenticated();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const navItems = document.querySelector('.navbar-nav');
    if (!navItems) return;

    if (isAuth && !isAdmin) {
        const loginBtn = navItems.querySelector('a[href="customer-login.html"]');
        const registerBtn = navItems.querySelector('a[href="customer-register.html"]');

        if (loginBtn && registerBtn) {
            const parentLi1 = loginBtn.closest('li');
            const parentLi2 = registerBtn.closest('li');

            if (parentLi1 && parentLi2) {
                parentLi1.remove();
                parentLi2.remove();

                const logoutLi = document.createElement('li');
                logoutLi.className = 'nav-item ms-lg-2';
                logoutLi.innerHTML = `
                    <a class="btn btn-outline-light btn-sm" href="#" onclick="handleLogout(event)">
                        <i class="bi bi-box-arrow-right"></i> Logout
                    </a>
                `;
                navItems.appendChild(logoutLi);
            }
        }
    }
}

function handleLogout(e) {
    e.preventDefault();
    logout();
}

function logout() {
    removeAuthToken();
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}
