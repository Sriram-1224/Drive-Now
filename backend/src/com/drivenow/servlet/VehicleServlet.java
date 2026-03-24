package com.drivenow.servlet;

import com.drivenow.dao.VehicleDAO;
import com.drivenow.model.Vehicle;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

/**
 * REST API Servlet for Vehicle Endpoints
 * Handles GET, POST, PUT, DELETE operations for vehicles
 * 
 * Available endpoints:
 * GET /api/vehicles - Get all vehicles
 * GET /api/vehicles/{id} - Get vehicle by ID
 * GET /api/vehicles/type/{type} - Get vehicles by type
 * GET /api/vehicles/brand/{brand} - Get vehicles by brand
 * POST /api/vehicles - Create new vehicle (admin only)
 * PUT /api/vehicles/{id} - Update vehicle (admin only)
 * DELETE /api/vehicles/{id} - Delete vehicle (admin only)
 */
@WebServlet("/api/vehicles/*")
public class VehicleServlet extends HttpServlet {

    private static final Logger LOGGER = Logger.getLogger(VehicleServlet.class.getName());
    private VehicleDAO vehicleDAO;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        super.init();
        this.vehicleDAO = new VehicleDAO();
        this.gson = new Gson();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        String pathInfo = request.getPathInfo();

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                // GET /api/vehicles - Get all vehicles
                List<Vehicle> vehicles = vehicleDAO.getAllVehicles();
                response.getWriter().write(gson.toJson(vehicles));
                response.setStatus(HttpServletResponse.SC_OK);

            } else if (pathInfo.contains("/type/")) {
                // GET /api/vehicles/type/{type} - Get by type
                String type = pathInfo.substring(pathInfo.lastIndexOf("/") + 1);
                List<Vehicle> vehicles = vehicleDAO.getVehiclesByType(type);
                response.getWriter().write(gson.toJson(vehicles));
                response.setStatus(HttpServletResponse.SC_OK);

            } else if (pathInfo.contains("/brand/")) {
                // GET /api/vehicles/brand/{brand} - Get by brand
                String brand = pathInfo.substring(pathInfo.lastIndexOf("/") + 1);
                List<Vehicle> vehicles = vehicleDAO.getVehiclesByBrand(brand);
                response.getWriter().write(gson.toJson(vehicles));
                response.setStatus(HttpServletResponse.SC_OK);

            } else {
                // GET /api/vehicles/{id} - Get by ID
                String[] pathParts = pathInfo.split("/");
                int vehicleId = Integer.parseInt(pathParts[1]);

                Vehicle vehicle = vehicleDAO.getVehicleById(vehicleId);
                if (vehicle != null) {
                    response.getWriter().write(gson.toJson(vehicle));
                    response.setStatus(HttpServletResponse.SC_OK);
                } else {
                    sendError(response, "Vehicle not found", HttpServletResponse.SC_NOT_FOUND);
                }
            }
        } catch (NumberFormatException e) {
            sendError(response, "Invalid vehicle ID", HttpServletResponse.SC_BAD_REQUEST);
        } catch (Exception e) {
            LOGGER.severe("Error in doGet: " + e.getMessage());
            sendError(response, "Internal server error", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        try {
            // Check admin authorization (implement based on your auth system)
            if (!isAdmin(request)) {
                sendError(response, "Unauthorized - Admin access required", HttpServletResponse.SC_FORBIDDEN);
                return;
            }

            String requestBody = getRequestBody(request);
            Vehicle vehicle = gson.fromJson(requestBody, Vehicle.class);

            int vehicleId = vehicleDAO.addVehicle(vehicle);
            if (vehicleId > 0) {
                vehicle.setVehicleId(vehicleId);
                response.setStatus(HttpServletResponse.SC_CREATED);
                response.getWriter().write(gson.toJson(vehicle));
            } else {
                sendError(response, "Failed to create vehicle", HttpServletResponse.SC_BAD_REQUEST);
            }
        } catch (Exception e) {
            LOGGER.severe("Error in doPost: " + e.getMessage());
            sendError(response, "Error creating vehicle", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        try {
            if (!isAdmin(request)) {
                sendError(response, "Unauthorized - Admin access required", HttpServletResponse.SC_FORBIDDEN);
                return;
            }

            String pathInfo = request.getPathInfo();
            String[] pathParts = pathInfo.split("/");
            int vehicleId = Integer.parseInt(pathParts[1]);

            String requestBody = getRequestBody(request);
            Vehicle vehicle = gson.fromJson(requestBody, Vehicle.class);
            vehicle.setVehicleId(vehicleId);

            if (vehicleDAO.updateVehicle(vehicle)) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write(gson.toJson(vehicle));
            } else {
                sendError(response, "Vehicle not found", HttpServletResponse.SC_NOT_FOUND);
            }
        } catch (Exception e) {
            LOGGER.severe("Error in doPut: " + e.getMessage());
            sendError(response, "Error updating vehicle", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        try {
            if (!isAdmin(request)) {
                sendError(response, "Unauthorized - Admin access required", HttpServletResponse.SC_FORBIDDEN);
                return;
            }

            String pathInfo = request.getPathInfo();
            String[] pathParts = pathInfo.split("/");
            int vehicleId = Integer.parseInt(pathParts[1]);

            if (vehicleDAO.deleteVehicle(vehicleId)) {
                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            } else {
                sendError(response, "Vehicle not found", HttpServletResponse.SC_NOT_FOUND);
            }
        } catch (Exception e) {
            LOGGER.severe("Error in doDelete: " + e.getMessage());
            sendError(response, "Error deleting vehicle", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    /**
     * Helper method to send error response
     */
    private void sendError(HttpServletResponse response, String message, int statusCode) throws IOException {
        response.setStatus(statusCode);
        String jsonError = "{\"error\": \"" + message + "\"}";
        response.getWriter().write(jsonError);
    }

    /**
     * Helper method to get request body
     */
    private String getRequestBody(HttpServletRequest request) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        try (java.io.BufferedReader bufferedReader = request.getReader()) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        return stringBuilder.toString();
    }

    /**
     * Check if user is admin (implement based on your auth system)
     */
    private boolean isAdmin(HttpServletRequest request) {
        // Check authorization header or session for admin token
        String authHeader = request.getHeader("Authorization");
        return authHeader != null && authHeader.contains("admin"); // Simplified check
    }
}
