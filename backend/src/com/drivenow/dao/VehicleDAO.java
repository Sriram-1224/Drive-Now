package com.drivenow.dao;

import com.drivenow.model.Vehicle;
import com.drivenow.util.DBUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Data Access Object for Vehicle Entity
 * Handles all database operations for vehicles
 */
public class VehicleDAO {

    private static final Logger LOGGER = Logger.getLogger(VehicleDAO.class.getName());

    /**
     * Get all vehicles
     */
    public List<Vehicle> getAllVehicles() {
        List<Vehicle> vehicles = new ArrayList<>();
        String sql = "SELECT * FROM vehicles ORDER BY brand, model";

        try (Connection conn = DBUtil.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                vehicles.add(mapRowToVehicle(rs));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error retrieving all vehicles", e);
        }

        return vehicles;
    }

    /**
     * Get vehicle by ID
     */
    public Vehicle getVehicleById(int vehicleId) {
        String sql = "SELECT * FROM vehicles WHERE vehicle_id = ?";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, vehicleId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapRowToVehicle(rs);
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error retrieving vehicle by ID: " + vehicleId, e);
        }

        return null;
    }

    /**
     * Get available vehicles
     */
    public List<Vehicle> getAvailableVehicles() {
        List<Vehicle> vehicles = new ArrayList<>();
        String sql = "SELECT * FROM vehicles WHERE is_available = TRUE ORDER BY brand, model";

        try (Connection conn = DBUtil.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                vehicles.add(mapRowToVehicle(rs));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error retrieving available vehicles", e);
        }

        return vehicles;
    }

    /**
     * Get vehicles by type
     */
    public List<Vehicle> getVehiclesByType(String type) {
        List<Vehicle> vehicles = new ArrayList<>();
        String sql = "SELECT * FROM vehicles WHERE type = ? ORDER BY brand, model";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, type);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    vehicles.add(mapRowToVehicle(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error retrieving vehicles by type: " + type, e);
        }

        return vehicles;
    }

    /**
     * Get vehicles by brand
     */
    public List<Vehicle> getVehiclesByBrand(String brand) {
        List<Vehicle> vehicles = new ArrayList<>();
        String sql = "SELECT * FROM vehicles WHERE brand = ? ORDER BY model";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, brand);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    vehicles.add(mapRowToVehicle(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error retrieving vehicles by brand: " + brand, e);
        }

        return vehicles;
    }

    /**
     * Add a new vehicle
     */
    public int addVehicle(Vehicle vehicle) {
        String sql = "INSERT INTO vehicles (brand, model, type, year, transmission, seats, price_per_day, description, image_url, fuel_type, is_available) "
                +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setString(1, vehicle.getBrand());
            pstmt.setString(2, vehicle.getModel());
            pstmt.setString(3, vehicle.getType());
            pstmt.setInt(4, vehicle.getYear());
            pstmt.setString(5, vehicle.getTransmission());
            pstmt.setInt(6, vehicle.getSeats());
            pstmt.setBigDecimal(7, vehicle.getPricePerDay());
            pstmt.setString(8, vehicle.getDescription());
            pstmt.setString(9, vehicle.getImageUrl());
            pstmt.setString(10, vehicle.getFuelType());
            pstmt.setBoolean(11, vehicle.isAvailable());

            int affectedRows = pstmt.executeUpdate();

            if (affectedRows > 0) {
                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        return generatedKeys.getInt(1);
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error adding vehicle", e);
        }

        return -1;
    }

    /**
     * Update vehicle
     */
    public boolean updateVehicle(Vehicle vehicle) {
        String sql = "UPDATE vehicles SET brand = ?, model = ?, type = ?, year = ?, transmission = ?, " +
                "seats = ?, price_per_day = ?, description = ?, image_url = ?, fuel_type = ?, " +
                "is_available = ?, maintenance_status = ? WHERE vehicle_id = ?";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, vehicle.getBrand());
            pstmt.setString(2, vehicle.getModel());
            pstmt.setString(3, vehicle.getType());
            pstmt.setInt(4, vehicle.getYear());
            pstmt.setString(5, vehicle.getTransmission());
            pstmt.setInt(6, vehicle.getSeats());
            pstmt.setBigDecimal(7, vehicle.getPricePerDay());
            pstmt.setString(8, vehicle.getDescription());
            pstmt.setString(9, vehicle.getImageUrl());
            pstmt.setString(10, vehicle.getFuelType());
            pstmt.setBoolean(11, vehicle.isAvailable());
            pstmt.setString(12, vehicle.getMaintenanceStatus());
            pstmt.setInt(13, vehicle.getVehicleId());

            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error updating vehicle", e);
        }

        return false;
    }

    /**
     * Delete vehicle
     */
    public boolean deleteVehicle(int vehicleId) {
        String sql = "DELETE FROM vehicles WHERE vehicle_id = ?";

        try (Connection conn = DBUtil.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, vehicleId);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error deleting vehicle", e);
        }

        return false;
    }

    /**
     * Map ResultSet row to Vehicle object
     */
    private Vehicle mapRowToVehicle(ResultSet rs) throws SQLException {
        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleId(rs.getInt("vehicle_id"));
        vehicle.setBrand(rs.getString("brand"));
        vehicle.setModel(rs.getString("model"));
        vehicle.setType(rs.getString("type"));
        vehicle.setYear(rs.getInt("year"));
        vehicle.setTransmission(rs.getString("transmission"));
        vehicle.setSeats(rs.getInt("seats"));
        vehicle.setPricePerDay(rs.getBigDecimal("price_per_day"));
        vehicle.setDescription(rs.getString("description"));
        vehicle.setImageUrl(rs.getString("image_url"));
        vehicle.setRegistrationNumber(rs.getString("registration_number"));
        vehicle.setChassisNumber(rs.getString("chassis_number"));
        vehicle.setEngineNumber(rs.getString("engine_number"));
        vehicle.setFuelType(rs.getString("fuel_type"));
        vehicle.setMileage(rs.getInt("mileage"));
        vehicle.setAvailable(rs.getBoolean("is_available"));
        vehicle.setMaintenanceStatus(rs.getString("maintenance_status"));
        vehicle.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        vehicle.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());

        return vehicle;
    }
}
