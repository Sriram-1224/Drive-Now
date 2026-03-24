# DriveNow Backend Setup Guide

## Prerequisites

- Java Development Kit (JDK) 8 or higher
- Apache Tomcat 9.0 or higher
- MySQL 5.7 or higher
- Maven (for dependency management)

## Project Structure

```
backend/
├── src/
│   └── com/drivenow/
│       ├── servlet/
│       │   ├── VehicleServlet.java
│       │   ├── BookingServlet.java
│       │   ├── CustomerServlet.java
│       │   └── AuthServlet.java
│       ├── dao/
│       │   ├── VehicleDAO.java
│       │   ├── BookingDAO.java
│       │   ├── CustomerDAO.java
│       │   └── AdminDAO.java
│       ├── model/
│       │   ├── Vehicle.java
│       │   ├── Booking.java
│       │   ├── Customer.java
│       │   └── Admin.java
│       ├── util/
│       │   ├── DBUtil.java
│       │   ├── PasswordUtil.java (for hashing passwords)
│       │   └── JWTUtil.java (for token generation)
│       └── filter/
│           └── CORSFilter.java
├── pom.xml
└── WebContent/
    └── WEB-INF/
        └── web.xml
```

## Step 1: Create Database

1. Open MySQL Command Line or MySQL Workbench
2. Run the following commands:

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS drivenow;
USE drivenow;

-- Run the schema script
SOURCE /path/to/drivenow_database.sql;
SOURCE /path/to/insert_vehicles.sql;
```

3. Verify the tables were created:

```sql
SHOW TABLES;
SELECT COUNT(*) as total_vehicles FROM vehicles;
```

## Step 2: Configure DBUtil.java

Edit `DBUtil.java` and update the database credentials:

```java
private static final String DB_URL = "jdbc:mysql://localhost:3306/drivenow";
private static final String DB_USER = "root";
private static final String DB_PASSWORD = "your_mysql_password";
```

## Step 3: Maven Dependencies (pom.xml)

Add these dependencies to your `pom.xml`:

```xml
<dependencies>
    <!-- MySQL JDBC Driver -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>

    <!-- Gson for JSON processing -->
    <dependency>
        <groupId>com.google.code.gson</groupId>
        <artifactId>gson</artifactId>
        <version>2.10.1</version>
    </dependency>

    <!-- Servlet API -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
        <scope>provided</scope>
    </dependency>

    <!-- JWT Token Library (optional for authentication) -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
        <version>0.11.5</version>
    </dependency>

    <!-- BCrypt for Password Hashing -->
    <dependency>
        <groupId>org.mindrot</groupId>
        <artifactId>jbcrypt</artifactId>
        <version>0.4</version>
    </dependency>
</dependencies>
```

## Step 4: Configure web.xml

Create or update `WebContent/WEB-INF/web.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
   http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
   version="4.0">

    <display-name>DriveNow Rental System</display-name>

    <!-- CORS Filter Configuration -->
    <filter>
        <filter-name>CORSFilter</filter-name>
        <filter-class>com.drivenow.filter.CORSFilter</filter-class>
    </filter>

    <filter-mapping>
        <filter-name>CORSFilter</filter-name>
        <url-pattern>/api/*</url-pattern>
    </filter-mapping>

    <!-- Welcome Files -->
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>

    <!-- Session Configuration -->
    <session-config>
        <tracking-mode>COOKIE</tracking-mode>
        <cookie-config>
            <secure>false</secure>
            <http-only>true</http-only>
        </cookie-config>
        <timeout-minutes>30</timeout-minutes>
    </session-config>
</web-app>
```

## Step 5: Update API Configuration

Update the frontend `api.js` to use real backend:

```javascript
const API_BASE_URL = "http://localhost:8080/drivenow/api";
const USE_MOCK_DATA = false; // Changed from true to false
```

## Step 6: Build and Deploy

1. **Using Maven:**

   ```bash
   cd backend
   mvn clean package
   ```

2. **Deploy to Tomcat:**
   - Copy the generated `.war` file to Tomcat's `webapps/` folder
   - Restart Tomcat

3. **Using IDE (Eclipse/IntelliJ):**
   - Right-click project → Run on Server
   - Select Tomcat

## Available API Endpoints

### Vehicles

- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/{id}` - Get vehicle by ID
- `GET /api/vehicles/type/{type}` - Get vehicles by type
- `GET /api/vehicles/brand/{brand}` - Get vehicles by brand
- `POST /api/vehicles` - Create vehicle (admin)
- `PUT /api/vehicles/{id}` - Update vehicle (admin)
- `DELETE /api/vehicles/{id}` - Delete vehicle (admin)

### Bookings

- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/user/{userId}` - Get user's bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Cancel booking

### Customers

- `POST /api/auth/register` - Register new customer
- `POST /api/auth/login` - Customer login
- `GET /api/customers/{id}` - Get customer profile
- `PUT /api/customers/{id}` - Update customer profile

### Admin

- `POST /api/auth/admin/login` - Admin login
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/customers` - Get all customers
- `GET /api/admin/reports` - Generate reports

## Database Schema Summary

### Tables Created:

1. **admin** - Admin user accounts
2. **customers** - Customer user accounts
3. **vehicles** - Vehicle inventory (24 vehicles pre-populated)
4. **bookings** - Customer bookings
5. **payments** - Payment records
6. **reviews** - Customer reviews
7. **maintenance_records** - Vehicle maintenance history

## Testing the Backend

1. **Test Database Connection:**

   ```java
   // In a test servlet or main method
   if (DBUtil.testConnection()) {
       System.out.println("Database connection successful!");
   }
   ```

2. **Test API Endpoints:**

   ```bash
   # Get all vehicles
   curl http://localhost:8080/drivenow/api/vehicles

   # Get specific vehicle
   curl http://localhost:8080/drivenow/api/vehicles/1
   ```

## Security Considerations

1. **Password Hashing:**
   - Use BCrypt for password hashing (never store plain text)
   - Implement in CustomerDAO and AdminDAO

2. **JWT Authentication:**
   - Implement JWT tokens for API authentication
   - Validate tokens in requests

3. **Input Validation:**
   - Validate all user inputs on server-side
   - Use prepared statements to prevent SQL injection

4. **CORS:**
   - Configure CORS filter to allow requests from frontend
   - Restrict to your domain in production

## Troubleshooting

### Database Connection Issues

- Check MySQL is running: `sudo service mysql status`
- Verify credentials in DBUtil.java
- Check MySQL driver is in classpath

### Servlet Not Found (404)

- Verify servlet mapping in web.xml
- Check servlet URL pattern matches request URL
- Restart Tomcat

### CORS Errors

- Ensure CORSFilter is configured in web.xml
- Check API_BASE_URL in frontend matches backend address

### JSON Parsing Errors

- Verify Gson dependency is included
- Check request body is valid JSON format

## Next Steps

1. Implement remaining DAOs (BookingDAO, CustomerDAO, AdminDAO)
2. Create authentication servlets with JWT
3. Add password hashing with BCrypt
4. Implement business logic and validation
5. Add logging and error handling
6. Create unit tests with JUnit
7. Deploy to production server
