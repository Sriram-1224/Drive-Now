-- Insert All Vehicles into the vehicles table
-- Execute this after running drivenow_database.sql

USE drivenow;

INSERT INTO vehicles (brand, model, type, year, transmission, seats, price_per_day, description, image_url, fuel_type, is_available) VALUES

-- Hatchbacks
('Maruti Suzuki', 'Swift', 'hatchback', 2023, 'manual', 5, 1500, 'Popular and fuel-efficient hatchback perfect for city commutes.', 'https://images.unsplash.com/photo-1663852408695-f57f4d75a536?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3V6dWtpJTIwc3dpZnR8ZW58MHx8MHx8fDA%3D', 'Petrol', TRUE),
('Hyundai', 'i20', 'hatchback', 2023, 'automatic', 5, 1300, 'Premium hatchback with modern design and great features.', 'https://images.unsplash.com/photo-1646119253693-0b80f2906791?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHl1bmRhaSUyMGkyMHxlbnwwfHwwfHx8MA%3D%3D', 'Petrol', TRUE),

-- Sedans
('Honda', 'City', 'sedan', 2023, 'automatic', 5, 1800, 'Premium sedan with cutting-edge technology and comfort.', 'https://stimg.cardekho.com/images/car-images/930x620/Honda/City/9710/1677754515528/222_Platinum-White-Pearl_b8b8c0.jpg?tr=w-420', 'Petrol', TRUE),
('Maruti Suzuki', 'Dzire', 'sedan', 2023, 'manual', 5, 1400, 'Compact sedan with premium features and great mileage.', 'https://www.autovista.in/assets/img/new_cars_colour_variants/new-dzire-colour-pearl-arctic-white.jpg', 'Petrol', TRUE),
('Hyundai', 'Verna', 'sedan', 2023, 'automatic', 5, 1600, 'Stylish sedan with modern amenities and excellent reliability.', 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202302/image_1_-_the_all-new_hyundai_verna-sixteen_nine.jpg?VersionId=W6Qv6RpaowbD2X1GMGAV9Eq_fe.B4okw&size=690%3A388', 'Petrol', TRUE),
('Honda', 'Amaze', 'sedan', 2023, 'automatic', 5, 1500, 'Reliable compact sedan with spacious interior.', 'https://static-cdn.cars24.com/prod/new-car-cms/Honda/Amaze/2024/04/01/a3dd8fdb-dce5-4678-ae8c-a95d495b53e2-Honda_Amaze_Lunar-Silver-Metallic.png?dpr=3&format=auto&optimize=low&quality=50&w=688', 'Petrol', TRUE),
('Volkswagen', 'Virtus', 'sedan', 2023, 'automatic', 5, 1700, 'German-engineered sedan with premium feel.', 'https://images.unsplash.com/photo-1620616756605-a127b24892f8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'Petrol', TRUE),

-- SUVs
('Hyundai', 'Creta', 'suv', 2023, 'automatic', 5, 2500, 'Spacious SUV with excellent features and comfort.', 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600', 'Diesel', TRUE),
('Tata', 'Nexon', 'suv', 2023, 'automatic', 5, 2000, 'Compact SUV with 5-star safety rating and modern features.', 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=600', 'Diesel', FALSE),
('Kia', 'Seltos', 'suv', 2023, 'automatic', 5, 2400, 'Feature-packed SUV perfect for families and city driving.', 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=600', 'Petrol', TRUE),
('Toyota', 'Fortuner', 'suv', 2024, 'automatic', 7, 4500, 'Premium SUV with advanced safety and comfort features.', 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=600', 'Diesel', TRUE),
('Mahindra', 'Thar', 'suv', 2023, 'manual', 4, 3500, 'Iconic off-road SUV delivering adventure and style.', 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=600', 'Diesel', FALSE),
('Mahindra', 'XUV700', 'suv', 2023, 'automatic', 7, 3200, 'Tech-loaded SUV with powerful performance.', 'https://images.pexels.com/photos/1638455/pexels-photo-1638455.jpeg?auto=compress&cs=tinysrgb&w=600', 'Diesel', TRUE),
('MG', 'Hector', 'suv', 2024, 'automatic', 5, 2800, 'Sophisticated SUV with internet-connected features.', 'https://images.pexels.com/photos/261986/pexels-photo-261986.jpeg?auto=compress&cs=tinysrgb&w=600', 'Petrol', TRUE),
('Tata', 'Harrier', 'suv', 2024, 'automatic', 5, 2900, 'Premium SUV with commanding road presence.', 'https://images.pexels.com/photos/575386/pexels-photo-575386.jpeg?auto=compress&cs=tinysrgb&w=600', 'Diesel', TRUE),
('Maruti Suzuki', 'Brezza', 'suv', 2023, 'automatic', 5, 2100, 'Compact SUV with great value and features.', 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=600', 'Diesel', TRUE),
('Mahindra', 'Scorpio N', 'suv', 2023, 'manual', 7, 3000, 'Rugged SUV built for Indian roads.', 'https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=600', 'Diesel', TRUE),

-- Electric Vehicles
('Tata', 'Nexon EV', 'electric', 2023, 'automatic', 5, 2800, 'Electric SUV with zero emissions and incredible performance.', 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=600', 'Electric', TRUE),
('MG', 'ZS EV', 'electric', 2024, 'automatic', 5, 3500, 'Electric SUV with impressive range and features.', 'https://images.pexels.com/photos/258083/pexels-photo-258083.jpeg?auto=compress&cs=tinysrgb&w=600', 'Electric', TRUE),

-- MUVs (Multi-Utility Vehicles)
('Toyota', 'Innova Crysta', 'muv', 2023, 'automatic', 7, 3000, 'Versatile MPV great for families and long journeys.', 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=600', 'Diesel', TRUE),
('Maruti Suzuki', 'Ertiga', 'muv', 2023, 'manual', 7, 1900, 'Family-friendly MPV with comfortable seating.', 'https://images.pexels.com/photos/757186/pexels-photo-757186.jpeg?auto=compress&cs=tinysrgb&w=600', 'Petrol', TRUE),
('Kia', 'Carens', 'muv', 2023, 'automatic', 7, 2200, 'Versatile three-row MPV for families.', 'https://images.pexels.com/photos/1280560/pexels-photo-1280560.jpeg?auto=compress&cs=tinysrgb&w=600', 'Petrol', TRUE),

-- Bikes and Scooters
('Honda', 'Activa 125', 'scooter', 2024, 'automatic', 2, 400, 'Popular and reliable scooter for daily commute.', 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=600', 'Petrol', TRUE),
('Royal Enfield', 'Classic 350', 'bike', 2023, 'manual', 2, 800, 'Iconic cruiser motorcycle with timeless style.', 'https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&w=600', 'Petrol', TRUE);

-- Verify insertion
SELECT COUNT(*) AS total_vehicles FROM vehicles;
SELECT brand, model, type, price_per_day, is_available FROM vehicles ORDER BY brand, model;
