# DriveNow Vehicle Rental System - Complete Database & Backend Setup

## 📋 Project Overview

DriveNow is a vehicle rental management system with a frontend (HTML/CSS/JavaScript) and backend (Java Servlet + MySQL). This document provides complete instructions for setting up the MySQL database and Java backend.

## 🗂️ Directory Structure

```
Project/
├── database/
│   ├── drivenow_database.sql       # Database schema with all table definitions
│   ├── insert_vehicles.sql         # Insert 24 vehicles into the database
│   └── useful_queries.sql          # Common SQL queries for operations
│
├── backend/
│   ├── src/com/drivenow/
│   │   ├── servlet/               # REST API endpoints
│   │   │   ├── VehicleServlet.java
│   │   │   ├── BookingServlet.java
│   │   │   ├── CustomerServlet.java
│   │   │   └── AuthServlet.java
│   │   │
│   │   ├── dao/                   # Data Access Objects
│   │   │   ├── VehicleDAO.java
│   │   │   ├── BookingDAO.java
│   │   │   ├── CustomerDAO.java
│   │   │   └── AdminDAO.java
│   │   │
│   │   ├── model/                 # Entity classes
│   │   │   ├── Vehicle.java
│   │   │   ├── Booking.java
│   │   │   ├── Customer.java
│   │   │   └── Admin.java
│   │   │
│   │   ├── util/                  # Utility classes
│   │   │   ├── DBUtil.java       # Database connection management
│   │   │   ├── PasswordUtil.java # Password hashing
│   │   │   └── JWTUtil.java      # JWT token generation
│   │   │
│   │   └── filter/
│   │       └── CORSFilter.java   # Cross-Origin Resource Sharing
│   │
│   ├── pom.xml                   # Maven dependencies
│   ├── SETUP_GUIDE.md            # Detailed setup instructions
│   └── WebContent/WEB-INF/web.xml # Servlet configuration
│
└── frontend/                      # Existing HTML/CSS/JS files
    ├── js/api.js               # Update: Change USE_MOCK_DATA = false
    └── ...
```

## 📊 Database Schema

### Tables Created:

1. **admin** - Administrator accounts
   - Stores admin credentials for system management

2. **customers** - Customer user accounts
   - Stores customer registration and profile information
   - 5 sample customers pre-inserted

3. **vehicles** - Vehicle inventory
   - **24 vehicles pre-populated** with all mock data including:
     - 7 Sedans (Honda City, Maruti Dzire, etc.)
     - 9 SUVs (Hyundai Creta, Tata Nexon, etc.)
     - 2 Electric vehicles (Tata Nexon EV, MG ZS EV)
     - 3 MPVs/MUVs (Toyota Innova, Maruti Ertiga, etc.)
     - 2 Two-wheelers (scooter, bike)

4. **bookings** - Customer vehicle bookings
   - Tracks all reservations with status (pending, confirmed, completed, cancelled)
   - Links customers to vehicles with dates and costs

5. **payments** - Payment transaction records
   - Stores payment information and transaction status

6. **reviews** - Customer reviews and ratings
   - Allows customers to rate and review vehicles

7. **maintenance_records** - Vehicle maintenance history
   - Tracks maintenance schedules and costs

## 🚀 Quick Start Guide

### Step 1: Create Database

```bash
# Option A: Using MySQL Command Line
mysql -u root -p < database/drivenow_database.sql
mysql -u root -p < database/insert_vehicles.sql

# Option B: Using MySQL Workbench
# Open both .sql files and execute them
```

### Step 2: Verify Database Setup

```sql
-- Check database created
SHOW DATABASES;

-- Check tables created
USE drivenow;
SHOW TABLES;

-- Check vehicles loaded (should show 24)
SELECT COUNT(*) FROM vehicles;
SELECT brand, model, type, price_per_day FROM vehicles LIMIT 5;
```

### Step 3: Setup Backend Project

1. **Download and Extract**

   ```bash
   cd backend
   ```

2. **Edit DBUtil.java**

   ```java
   private static final String DB_USER = "root";
   private static final String DB_PASSWORD = "your_password";
   ```

3. **Build with Maven**

   ```bash
   mvn clean package
   ```

4. **Deploy to Tomcat**
   - Copy `target/drivenow.war` to Tomcat `webapps/`
   - Restart Tomcat
   - Access at: `http://localhost:8080/drivenow`

### Step 4: Update Frontend

Edit `js/api.js`:

```javascript
const API_BASE_URL = "http://localhost:8080/drivenow/api";
const USE_MOCK_DATA = false; // Change from true to false
```

## 📡 API Endpoints

### Vehicle Endpoints

```
GET    /api/vehicles              - Get all vehicles
GET    /api/vehicles/{id}         - Get vehicle by ID
GET    /api/vehicles/type/{type}  - Get vehicles by type
GET    /api/vehicles/brand/{brand}- Get vehicles by brand
POST   /api/vehicles              - Create vehicle (admin)
PUT    /api/vehicles/{id}         - Update vehicle (admin)
DELETE /api/vehicles/{id}         - Delete vehicle (admin)
```

### Booking Endpoints

```
GET    /api/bookings/user/{userId} - Get user's bookings
POST   /api/bookings               - Create booking
PUT    /api/bookings/{id}          - Update booking
DELETE /api/bookings/{id}          - Cancel booking
```

### Authentication Endpoints

```
POST   /api/auth/register          - Customer registration
POST   /api/auth/login             - Customer login
POST   /api/auth/admin/login       - Admin login
POST   /api/auth/logout            - Logout
```

## 📝 Vehicles in Database (24 Total)

### Sedans (₹1,400 - ₹1,800/day)

- Maruti Dzire (manual)
- Hyundai Verna (automatic)
- Honda City (automatic)
- Honda Amaze (automatic)
- Volkswagen Virtus (automatic)

### SUVs (₹2,000 - ₹4,500/day)

- Hyundai Creta ₹2,500
- Tata Nexon ₹2,000 (unavailable)
- Kia Seltos ₹2,400
- Toyota Fortuner ₹4,500
- Mahindra Thar ₹3,500 (unavailable)
- Mahindra XUV700 ₹3,200
- MG Hector ₹2,800
- Tata Harrier ₹2,900
- Maruti Brezza ₹2,100
- Mahindra Scorpio N ₹3,000

### Hatchbacks (₹1,300 - ₹1,500/day)

- Maruti Swift ₹1,500
- Hyundai i20 ₹1,300

### Electric Vehicles (₹2,800 - ₹3,500/day)

- Tata Nexon EV ₹2,800
- MG ZS EV ₹3,500

### MPVs/MUVs (₹1,900 - ₹3,000/day)

- Toyota Innova Crysta ₹3,000
- Maruti Ertiga ₹1,900
- Kia Carens ₹2,200

### Two-Wheelers (₹400 - ₹800/day)

- Honda Activa 125 Scooter ₹400
- Royal Enfield Classic 350 Bike ₹800

## 🔐 Sample Login Credentials

### Admin

- **Email:** admin@drivenow.com
- **Password:** admin123 (hashed in database)

### Sample Customers

- **Email:** rahul.sharma@email.com
- **Email:** priya.patel@email.com
- **Email:** arjun.reddy@email.com
- **Password:** (stored hashed in database)

## 🛠️ Technologies Used

| Component            | Technology                           |
| -------------------- | ------------------------------------ |
| **Database**         | MySQL 5.7+                           |
| **Backend**          | Java Servlet + JSP                   |
| **Build Tool**       | Maven                                |
| **JSON Processing**  | Gson                                 |
| **Authentication**   | JWT Tokens                           |
| **Password Hashing** | BCrypt                               |
| **Server**           | Apache Tomcat 9.0+                   |
| **Frontend**         | HTML5, CSS3, JavaScript, Bootstrap 5 |

## 📚 Important Files

- `drivenow_database.sql` - Create all tables with schema
- `insert_vehicles.sql` - Populate 24 vehicles
- `useful_queries.sql` - SQL scripts for common operations
- `DBUtil.java` - Database connection management
- `VehicleDAO.java` - Vehicle data access patterns
- `VehicleServlet.java` - REST API implementation
- `pom.xml` - Maven dependencies
- `SETUP_GUIDE.md` - Detailed setup instructions

## ⚙️ Configuration

### Database Configuration (DBUtil.java)

```java
private static final String DB_DRIVER = "com.mysql.cj.jdbc.Driver";
private static final String DB_URL = "jdbc:mysql://localhost:3306/drivenow";
private static final String DB_USER = "root";
private static final String DB_PASSWORD = "your_password";
```

### API Configuration (api.js)

```javascript
const API_BASE_URL = "http://localhost:8080/drivenow/api";
const USE_MOCK_DATA = false;
```

## ✅ Verification Checklist

- [ ] MySQL database created
- [ ] All tables created (7 tables)
- [ ] 24 vehicles inserted
- [ ] Sample customers created
- [ ] Java project configured
- [ ] DBUtil credentials updated
- [ ] Maven dependencies installed
- [ ] War file deployed to Tomcat
- [ ] Tomcat server started
- [ ] API endpoints accessible
- [ ] Frontend updated to use real API
- [ ] Bookings synced with database

## 🐛 Troubleshooting

### Database Connection Failed

```
Problem: JDBC connection error
Solution: Check MySQL is running, verify credentials in DBUtil.java
```

### 404 Not Found Errors

```
Problem: API endpoints return 404
Solution: Verify servlet mappings in web.xml, check Tomcat logs
```

### CORS Errors

```
Problem: JavaScript cannot access API
Solution: Verify CORSFilter is configured in web.xml
```

### Vehicles Not Loading

```
Problem: Frontend shows no vehicles
Solution: Verify database has vehicles, check API endpoint works with curl
```

## 📞 Support

For issues with:

- **Database:** Check MySQL installation and credentials
- **Backend:** Review Tomcat logs in `catalina.out`
- **Frontend:** Check browser console for JavaScript errors
- **API:** Test endpoints using curl or Postman

## 🎯 Next Steps

1. ✅ Create MySQL database
2. ✅ Setup Java backend
3. ✅ Deploy to Tomcat
4. ⬜ Implement remaining DAOs (BookingDAO, CustomerDAO, AdminDAO)
5. ⬜ Add JWT authentication
6. ⬜ Implement payment gateway
7. ⬜ Add email notifications
8. ⬜ Setup admin panel
9. ⬜ Deploy to production

## 📄 License

This project is provided as-is for educational purposes.

---

**Last Updated:** March 2026
**Version:** 1.0.0
