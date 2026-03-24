const API_BASE_URL = 'http://localhost:8080/api';
const USE_MOCK_DATA = true;

const mockVehicles = [
    { id: 1, brand: 'Maruti Suzuki', model: 'Swift', type: 'hatchback', pricePerDay: 1500, available: true, year: 2023, transmission: 'manual', seats: 5, description: 'Popular and fuel-efficient hatchback perfect for city commutes.', image: 'https://images.unsplash.com/photo-1663852408695-f57f4d75a536?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3V6dWtpJTIwc3dpZnR8ZW58MHx8MHx8fDA%3D' },
    { id: 2, brand: 'Hyundai', model: 'Creta', type: 'suv', pricePerDay: 2500, available: true, year: 2023, transmission: 'automatic', seats: 5, description: 'Spacious SUV with excellent features and comfort.', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, brand: 'Tata', model: 'Nexon', type: 'suv', pricePerDay: 2000, available: false, year: 2023, transmission: 'automatic', seats: 5, description: 'Compact SUV with 5-star safety rating and modern features.', image: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, brand: 'Honda', model: 'City', type: 'sedan', pricePerDay: 1800, available: true, year: 2023, transmission: 'automatic', seats: 5, description: 'Premium sedan with cutting-edge technology and comfort.', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 5, brand: 'Tata', model: 'Nexon EV', type: 'electric', pricePerDay: 2800, available: true, year: 2023, transmission: 'automatic', seats: 5, description: 'Electric SUV with zero emissions and incredible performance.', image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 6, brand: 'Toyota', model: 'Innova Crysta', type: 'muv', pricePerDay: 3000, available: true, year: 2023, transmission: 'automatic', seats: 7, description: 'Versatile MPV great for families and long journeys.', image: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 7, brand: 'Maruti Suzuki', model: 'Dzire', type: 'sedan', pricePerDay: 1400, available: true, year: 2023, transmission: 'manual', seats: 5, description: 'Compact sedan with premium features and great mileage.', image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 8, brand: 'Mahindra', model: 'Thar', type: 'suv', pricePerDay: 3500, available: false, year: 2023, transmission: 'manual', seats: 4, description: 'Iconic off-road SUV delivering adventure and style.', image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 9, brand: 'Kia', model: 'Seltos', type: 'suv', pricePerDay: 2400, available: true, year: 2023, transmission: 'automatic', seats: 5, description: 'Feature-packed SUV perfect for families and city driving.', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 10, brand: 'Toyota', model: 'Fortuner', type: 'suv', pricePerDay: 4500, available: true, year: 2024, transmission: 'automatic', seats: 7, description: 'Premium SUV with advanced safety and comfort features.', image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 11, brand: 'Hyundai', model: 'Verna', type: 'sedan', pricePerDay: 1600, available: true, year: 2023, transmission: 'automatic', seats: 5, description: 'Stylish sedan with modern amenities and excellent reliability.', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 12, brand: 'Mahindra', model: 'XUV700', type: 'suv', pricePerDay: 3200, available: true, year: 2023, transmission: 'automatic', seats: 7, description: 'Tech-loaded SUV with powerful performance.', image: 'https://images.pexels.com/photos/1638455/pexels-photo-1638455.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 13, brand: 'MG', model: 'Hector', type: 'suv', pricePerDay: 2800, available: true, year: 2024, transmission: 'automatic', seats: 5, description: 'Sophisticated SUV with internet-connected features.', image: 'https://images.pexels.com/photos/261986/pexels-photo-261986.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 14, brand: 'Tata', model: 'Harrier', type: 'suv', pricePerDay: 2900, available: true, year: 2024, transmission: 'automatic', seats: 5, description: 'Premium SUV with commanding road presence.', image: 'https://images.pexels.com/photos/575386/pexels-photo-575386.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 15, brand: 'Maruti Suzuki', model: 'Ertiga', type: 'muv', pricePerDay: 1900, available: true, year: 2023, transmission: 'manual', seats: 7, description: 'Family-friendly MPV with comfortable seating.', image: 'https://images.pexels.com/photos/757186/pexels-photo-757186.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 16, brand: 'Hyundai', model: 'i20', type: 'hatchback', pricePerDay: 1300, available: true, year: 2023, transmission: 'automatic', seats: 5, description: 'Premium hatchback with modern design and great features.', image: 'https://images.unsplash.com/photo-1646119253693-0b80f2906791?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHl1bmRhaSUyMGkyMHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 17, brand: 'Honda', model: 'Amaze', type: 'sedan', pricePerDay: 1500, available: true, year: 2023, transmission: 'automatic', seats: 5, description: 'Reliable compact sedan with spacious interior.', image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 18, brand: 'Kia', model: 'Carens', type: 'muv', pricePerDay: 2200, available: true, year: 2023, transmission: 'automatic', seats: 7, description: 'Versatile three-row MPV for families.', image: 'https://images.pexels.com/photos/1280560/pexels-photo-1280560.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 19, brand: 'Volkswagen', model: 'Virtus', type: 'sedan', pricePerDay: 1700, available: true, year: 2023, transmission: 'automatic', seats: 5, description: 'German-engineered sedan with premium feel.', image: 'https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 20, brand: 'Honda', model: 'Activa 125', type: 'scooter', pricePerDay: 400, available: true, year: 2024, transmission: 'automatic', seats: 2, description: 'Popular and reliable scooter for daily commute.', image: 'https://imgd.aeplcdn.com/1056x594/n/wm8dafb_1810031.jpg?q=80' },
    { id: 21, brand: 'Royal Enfield', model: 'Classic 350', type: 'bike', pricePerDay: 800, available: true, year: 2023, transmission: 'manual', seats: 2, description: 'Iconic cruiser motorcycle with timeless style.', image: 'https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/new-classic-350/studio-shots/new/gun-grey.png' },
    { id: 22, brand: 'Maruti Suzuki', model: 'Brezza', type: 'suv', pricePerDay: 2100, available: true, year: 2023, transmission: 'automatic', seats: 5, description: 'Compact SUV with great value and features.', image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 23, brand: 'Mahindra', model: 'Scorpio N', type: 'suv', pricePerDay: 3000, available: true, year: 2023, transmission: 'manual', seats: 7, description: 'Rugged SUV built for Indian roads.', image: 'https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 24, brand: 'MG', model: 'ZS EV', type: 'electric', pricePerDay: 3500, available: true, year: 2024, transmission: 'automatic', seats: 5, description: 'Electric SUV with impressive range and features.', image: 'https://images.pexels.com/photos/258083/pexels-photo-258083.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const mockBookings = [
    { id: 1, vehicleBrand: 'Maruti Suzuki', vehicleModel: 'Swift', vehicleType: 'hatchback', startDate: '2024-01-15', endDate: '2024-01-20', totalCost: 7500, status: 'confirmed' },
    { id: 2, vehicleBrand: 'Hyundai', vehicleModel: 'Creta', vehicleType: 'suv', startDate: '2024-02-01', endDate: '2024-02-05', totalCost: 10000, status: 'completed' },
    { id: 3, vehicleBrand: 'Tata', vehicleModel: 'Nexon EV', vehicleType: 'electric', startDate: '2024-03-10', endDate: '2024-03-15', totalCost: 14000, status: 'pending' },
];

async function fetchAPI(endpoint, options = {}) {
    if (USE_MOCK_DATA) {
        return mockFetchAPI(endpoint, options);
    }

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const token = localStorage.getItem('authToken');
    if (token) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

async function mockFetchAPI(endpoint, options = {}) {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (endpoint === '/vehicles' && options.method === 'GET') {
        return [...mockVehicles];
    }

    if (endpoint.startsWith('/vehicles/') && options.method === 'GET') {
        const id = parseInt(endpoint.split('/')[2]);
        const vehicle = mockVehicles.find(v => v.id === id);
        if (vehicle) return { ...vehicle };
        throw new Error('Vehicle not found');
    }

    if (endpoint === '/vehicles' && options.method === 'POST') {
        const newVehicle = { id: mockVehicles.length + 1, ...JSON.parse(options.body) };
        mockVehicles.push(newVehicle);
        return newVehicle;
    }

    if (endpoint.startsWith('/vehicles/') && options.method === 'PUT') {
        const id = parseInt(endpoint.split('/')[2]);
        const index = mockVehicles.findIndex(v => v.id === id);
        if (index !== -1) {
            mockVehicles[index] = { id, ...JSON.parse(options.body) };
            return mockVehicles[index];
        }
        throw new Error('Vehicle not found');
    }

    if (endpoint.startsWith('/vehicles/') && options.method === 'DELETE') {
        const id = parseInt(endpoint.split('/')[2]);
        const index = mockVehicles.findIndex(v => v.id === id);
        if (index !== -1) {
            mockVehicles.splice(index, 1);
            return { success: true };
        }
        throw new Error('Vehicle not found');
    }

    if (endpoint === '/users/login' && options.method === 'POST') {
        return { token: 'mock-customer-token-' + Date.now(), success: true };
    }

    if (endpoint === '/users/register' && options.method === 'POST') {
        return { token: 'mock-customer-token-' + Date.now(), success: true };
    }

    if (endpoint === '/admin/login' && options.method === 'POST') {
        return { token: 'mock-admin-token-' + Date.now(), success: true };
    }

    if (endpoint === '/admin/stats' && options.method === 'GET') {
        return {
            totalVehicles: mockVehicles.length,
            totalBookings: mockBookings.length,
            totalCustomers: 45,
            totalRevenue: 1254000,
            availableVehicles: mockVehicles.filter(v => v.available).length,
            bookedVehicles: mockVehicles.filter(v => !v.available).length,
            recentBookings: mockBookings.map(b => ({
                ...b,
                customerName: 'Rahul Sharma',
                vehicleName: `${b.vehicleBrand} ${b.vehicleModel}`
            }))
        };
    }

    if (endpoint === '/bookings' && options.method === 'POST') {
        const bookingData = JSON.parse(options.body);
        const vehicle = mockVehicles.find(v => v.id === parseInt(bookingData.vehicleId));

        const newBooking = {
            id: mockBookings.length + 1,
            vehicleBrand: vehicle ? vehicle.brand : 'Unknown',
            vehicleModel: vehicle ? vehicle.model : 'Unknown',
            vehicleType: vehicle ? vehicle.type : 'Unknown',
            startDate: bookingData.startDate,
            endDate: bookingData.endDate,
            pickupLocation: bookingData.pickupLocation,
            notes: bookingData.notes,
            totalCost: bookingData.totalCost,
            status: 'confirmed',
            customerName: 'Current User'
        };
        mockBookings.push(newBooking);
        return newBooking;
    }

    if (endpoint === '/bookings/user' && options.method === 'GET') {
        return [...mockBookings];
    }

    if (endpoint.includes('/cancel') && options.method === 'PUT') {
        const id = parseInt(endpoint.split('/')[2]);
        const booking = mockBookings.find(b => b.id === id);
        if (booking) {
            booking.status = 'cancelled';
            return booking;
        }
        throw new Error('Booking not found');
    }

    if (endpoint === '/admin/customers' && options.method === 'GET') {
        return [
            { id: '1a2b3c4d', first_name: 'Rahul', last_name: 'Sharma', email: 'rahul.sharma@email.com', phone: '+91-98765-43210', created_at: '2024-01-15', total_bookings: 5, total_spent: 45000 },
            { id: '2b3c4d5e', first_name: 'Priya', last_name: 'Patel', email: 'priya.patel@email.com', phone: '+91-98765-43211', created_at: '2024-02-20', total_bookings: 3, total_spent: 28000 },
            { id: '3c4d5e6f', first_name: 'Arjun', last_name: 'Reddy', email: 'arjun.reddy@email.com', phone: '+91-98765-43212', created_at: '2024-03-10', total_bookings: 7, total_spent: 68000 },
            { id: '4d5e6f7g', first_name: 'Sneha', last_name: 'Kumar', email: 'sneha.kumar@email.com', phone: '+91-98765-43213', created_at: '2024-01-05', total_bookings: 4, total_spent: 32000 },
            { id: '5e6f7g8h', first_name: 'Vikram', last_name: 'Singh', email: 'vikram.singh@email.com', phone: '+91-98765-43214', created_at: '2024-02-28', total_bookings: 6, total_spent: 52000 }
        ];
    }

    if (endpoint.startsWith('/admin/customers/') && endpoint.includes('/bookings')) {
        return [
            { id: 1, vehicle_name: 'Maruti Suzuki Swift', start_date: '2024-01-15', end_date: '2024-01-20', total_cost: 7500, status: 'confirmed' },
            { id: 2, vehicle_name: 'Hyundai Creta', start_date: '2024-02-01', end_date: '2024-02-05', total_cost: 10000, status: 'completed' }
        ];
    }

    if (endpoint === '/admin/reports/stats' && options.method === 'GET') {
        return {
            totalRevenue: 1254000,
            totalBookings: 124,
            activeRentals: 8,
            confirmedBookings: 45,
            pendingBookings: 12,
            completedBookings: 58,
            cancelledBookings: 9,
            revenueData: [85000, 92000, 105000, 98000, 112000, 118000, 125000, 132000, 128000, 135000, 142000, 150000],
            vehicleTypeData: [30, 25, 20, 15, 10]
        };
    }

    if (endpoint === '/admin/reports/generate' && options.method === 'POST') {
        const { reportType, dateRange } = JSON.parse(options.body);
        return [
            { date: '2024-01-01', revenue: 42000, bookings: 15, vehicles: 'Maruti Suzuki Swift' },
            { date: '2024-01-02', revenue: 38000, bookings: 12, vehicles: 'Hyundai Creta' },
            { date: '2024-01-03', revenue: 48000, bookings: 18, vehicles: 'Tata Nexon EV' }
        ];
    }

    throw new Error('API endpoint not implemented');
}

async function getVehicles() {
    return fetchAPI('/vehicles', {
        method: 'GET',
    });
}

async function getVehicleById(id) {
    return fetchAPI(`/vehicles/${id}`, {
        method: 'GET',
    });
}

async function addVehicle(vehicleData) {
    return fetchAPI('/vehicles', {
        method: 'POST',
        body: JSON.stringify(vehicleData),
    });
}

async function updateVehicle(id, vehicleData) {
    return fetchAPI(`/vehicles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(vehicleData),
    });
}

async function deleteVehicleById(id) {
    return fetchAPI(`/vehicles/${id}`, {
        method: 'DELETE',
    });
}

async function customerLogin(email, password) {
    return fetchAPI('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

async function customerRegister(userData) {
    return fetchAPI('/users/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
}

async function adminLogin(email, password) {
    return fetchAPI('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

async function getAdminStats() {
    return fetchAPI('/admin/stats', {
        method: 'GET',
    });
}

async function createBooking(bookingData) {
    return fetchAPI('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
    });
}

async function getUserBookings() {
    return fetchAPI('/bookings/user', {
        method: 'GET',
    });
}

async function cancelBooking(bookingId) {
    return fetchAPI(`/bookings/${bookingId}/cancel`, {
        method: 'PUT',
    });
}

function saveAuthToken(token) {
    localStorage.setItem('authToken', token);
}

function getAuthToken() {
    return localStorage.getItem('authToken');
}

function removeAuthToken() {
    localStorage.removeItem('authToken');
}

function isAuthenticated() {
    return !!getAuthToken();
}

async function getCustomers() {
    return fetchAPI('/admin/customers', {
        method: 'GET',
    });
}

async function getCustomerBookings(customerId) {
    return fetchAPI(`/admin/customers/${customerId}/bookings`, {
        method: 'GET',
    });
}

async function getReportStats() {
    return fetchAPI('/admin/reports/stats', {
        method: 'GET',
    });
}

async function generateReportData(reportType, dateRange, exportFormat) {
    return fetchAPI('/admin/reports/generate', {
        method: 'POST',
        body: JSON.stringify({ reportType, dateRange, exportFormat }),
    });
}
