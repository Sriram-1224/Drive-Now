-- Useful SQL Queries for DriveNow Database

USE drivenow;

-- ============ VEHICLE QUERIES ============

-- Get all vehicles with their availability status
SELECT vehicle_id, brand, model, type, year, seats, price_per_day, 
       is_available, maintenance_status
FROM vehicles
ORDER BY brand, model;

-- Get available vehicles only
SELECT * FROM vehicles 
WHERE is_available = TRUE 
ORDER BY price_per_day ASC;

-- Get vehicles by type
SELECT * FROM vehicles 
WHERE type = 'suv' 
ORDER BY price_per_day;

-- Get vehicles by price range
SELECT * FROM vehicles 
WHERE price_per_day BETWEEN 1500 AND 3000 
AND is_available = TRUE
ORDER BY price_per_day;

-- Get vehicles with low maintenance rating
SELECT * FROM vehicles 
WHERE maintenance_status != 'good' 
AND maintenance_status != 'excellent';

-- Count vehicles by type
SELECT type, COUNT(*) as count 
FROM vehicles 
GROUP BY type 
ORDER BY count DESC;

-- Count vehicles by brand
SELECT brand, COUNT(*) as count 
FROM vehicles 
GROUP BY brand 
ORDER BY count DESC;

-- ============ CUSTOMER QUERIES ============

-- Get all active customers
SELECT customer_id, CONCAT(first_name, ' ', last_name) as name, 
       email, phone, created_at
FROM customers 
WHERE is_active = TRUE 
ORDER BY created_at DESC;

-- Get customer profile with booking stats
SELECT c.customer_id, c.first_name, c.last_name, c.email, c.phone,
       COUNT(b.booking_id) as total_bookings,
       SUM(CASE WHEN b.status = 'completed' THEN 1 ELSE 0 END) as completed_bookings,
       SUM(b.total_cost) as total_spent
FROM customers c
LEFT JOIN bookings b ON c.customer_id = b.customer_id
WHERE c.is_active = TRUE
GROUP BY c.customer_id
ORDER BY total_spent DESC;

-- Get customers registered in last 30 days
SELECT * FROM customers 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY created_at DESC;

-- ============ BOOKING QUERIES ============

-- Get all active bookings (pending and confirmed)
SELECT b.booking_id, c.first_name, c.last_name, 
       CONCAT(v.brand, ' ', v.model) as vehicle,
       b.start_date, b.end_date, b.total_cost, b.status
FROM bookings b
JOIN customers c ON b.customer_id = c.customer_id
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
WHERE b.status IN ('pending', 'confirmed')
ORDER BY b.start_date;

-- Get completed bookings
SELECT b.booking_id, c.first_name, c.last_name,
       CONCAT(v.brand, ' ', v.model) as vehicle,
       b.start_date, b.end_date, 
       DATEDIFF(b.end_date, b.start_date) as days_booked,
       b.total_cost
FROM bookings b
JOIN customers c ON b.customer_id = c.customer_id
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
WHERE b.status = 'completed'
ORDER BY b.end_date DESC;

-- Get customer's bookings
SELECT b.booking_id, CONCAT(v.brand, ' ', v.model) as vehicle,
       b.start_date, b.end_date, b.pickup_location, 
       b.total_cost, b.status
FROM bookings b
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
WHERE b.customer_id = 1  -- Replace 1 with actual customer ID
ORDER BY b.created_at DESC;

-- Bookings for a specific vehicle
SELECT b.booking_id, c.first_name, c.last_name, 
       b.start_date, b.end_date, b.status
FROM bookings b
JOIN customers c ON b.customer_id = c.customer_id
WHERE b.vehicle_id = 1  -- Replace 1 with vehicle ID
ORDER BY b.start_date;

-- Revenue report by month
SELECT 
    DATE_FORMAT(b.created_at, '%Y-%m') as month,
    COUNT(b.booking_id) as total_bookings,
    SUM(b.total_cost) as total_revenue,
    AVG(b.total_cost) as avg_booking_value
FROM bookings b
WHERE b.status = 'completed'
GROUP BY DATE_FORMAT(b.created_at, '%Y-%m')
ORDER BY month DESC;

-- Revenue report by vehicle
SELECT 
    CONCAT(v.brand, ' ', v.model) as vehicle,
    COUNT(b.booking_id) as total_bookings,
    SUM(b.total_cost) as total_revenue,
    AVG(b.total_cost) as avg_booking_value
FROM bookings b
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
WHERE b.status = 'completed'
GROUP BY b.vehicle_id, v.brand, v.model
ORDER BY total_revenue DESC;

-- ============ ANALYTICS QUERIES ============

-- Dashboard statistics
SELECT 
    (SELECT COUNT(*) FROM vehicles) as total_vehicles,
    (SELECT COUNT(*) FROM vehicles WHERE is_available = TRUE) as available_vehicles,
    (SELECT COUNT(*) FROM customers WHERE is_active = TRUE) as total_customers,
    (SELECT COUNT(*) FROM bookings WHERE status IN ('pending', 'confirmed')) as active_bookings,
    (SELECT SUM(total_cost) FROM bookings WHERE status = 'completed') as total_revenue;

-- Most popular vehicles
SELECT 
    CONCAT(v.brand, ' ', v.model) as vehicle,
    COUNT(b.booking_id) as booking_count,
    SUM(b.total_cost) as revenue
FROM bookings b
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
GROUP BY v.vehicle_id, v.brand, v.model
ORDER BY booking_count DESC
LIMIT 10;

-- Vehicle utilization rate
SELECT 
    CONCAT(v.brand, ' ', v.model) as vehicle,
    COUNT(b.booking_id) as times_booked,
    ROUND(COUNT(b.booking_id) * 100.0 / (SELECT COUNT(*) FROM bookings), 2) as utilization_percent
FROM vehicles v
LEFT JOIN bookings b ON v.vehicle_id = b.vehicle_id
GROUP BY v.vehicle_id, v.brand, v.model
ORDER BY times_booked DESC;

-- Average booking duration
SELECT 
    CONCAT(v.brand, ' ', v.model) as vehicle,
    ROUND(AVG(DATEDIFF(b.end_date, b.start_date)), 2) as avg_days,
    COUNT(b.booking_id) as bookings
FROM bookings b
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
GROUP BY v.vehicle_id, v.brand, v.model
HAVING bookings > 0
ORDER BY avg_days DESC;

-- ============ MAINTENANCE QUERIES ============

-- Pending maintenance tasks
SELECT 
    CONCAT(v.brand, ' ', v.model) as vehicle,
    m.maintenance_type,
    m.description,
    m.maintenance_date,
    m.status
FROM maintenance_records m
JOIN vehicles v ON m.vehicle_id = v.vehicle_id
WHERE m.status = 'pending'
ORDER BY m.maintenance_date;

-- Maintenance cost by vehicle
SELECT 
    CONCAT(v.brand, ' ', v.model) as vehicle,
    SUM(m.cost) as total_maintenance_cost,
    COUNT(m.maintenance_id) as maintenance_count
FROM maintenance_records m
JOIN vehicles v ON m.vehicle_id = v.vehicle_id
GROUP BY v.vehicle_id, v.brand, v.model
ORDER BY total_maintenance_cost DESC;

-- ============ UPDATES AND MODIFICATIONS ============

-- Mark vehicle as unavailable (for maintenance)
UPDATE vehicles 
SET is_available = FALSE, maintenance_status = 'in_maintenance'
WHERE vehicle_id = 1;

-- Mark vehicle as available again
UPDATE vehicles 
SET is_available = TRUE, maintenance_status = 'good'
WHERE vehicle_id = 1;

-- Update booking status
UPDATE bookings 
SET status = 'completed'
WHERE booking_id = 1;

-- Cancel a booking
UPDATE bookings 
SET status = 'cancelled'
WHERE booking_id = 1;

-- Add maintenance record
INSERT INTO maintenance_records 
(vehicle_id, maintenance_type, description, cost, maintenance_date, status)
VALUES 
(1, 'Oil Change', 'Regular oil change', 500, NOW(), 'pending');

-- ============ USEFUL VIEWS (Optional) ============

-- Create a view for active bookings with details
CREATE VIEW active_bookings_view AS
SELECT 
    b.booking_id,
    CONCAT(c.first_name, ' ', c.last_name) as customer_name,
    c.phone as customer_phone,
    CONCAT(v.brand, ' ', v.model) as vehicle_name,
    v.registration_number,
    b.start_date,
    b.end_date,
    b.pickup_location,
    b.total_cost,
    b.status
FROM bookings b
JOIN customers c ON b.customer_id = c.customer_id
JOIN vehicles v ON b.vehicle_id = v.vehicle_id
WHERE b.status IN ('pending', 'confirmed');

-- Create a view for vehicle availability
CREATE VIEW vehicle_availability_view AS
SELECT 
    vehicle_id,
    CONCAT(brand, ' ', model) as vehicle_name,
    type,
    price_per_day,
    is_available,
    maintenance_status,
    (SELECT COUNT(*) FROM bookings 
     WHERE vehicle_id = vehicles.vehicle_id 
     AND status IN ('pending', 'confirmed')) as active_bookings
FROM vehicles;

-- Query the view
SELECT * FROM active_bookings_view;
SELECT * FROM vehicle_availability_view;
