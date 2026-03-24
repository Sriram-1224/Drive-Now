package com.drivenow.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

/**
 * CORS (Cross-Origin Resource Sharing) Filter
 * Enables communication between frontend and backend on different domains
 */
public class CORSFilter implements Filter {

    private static final Logger LOGGER = Logger.getLogger(CORSFilter.class.getName());

    @Override
    public void init(FilterConfig config) throws ServletException {
        LOGGER.info("CORSFilter initialized");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String origin = httpRequest.getHeader("Origin");

        if (origin != null) {
            // Allow requests from any origin (be more restrictive in production)
            httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        }

        // Allow standard HTTP methods
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");

        // Allow specific headers
        httpResponse.setHeader("Access-Control-Allow-Headers",
                "Content-Type, Authorization, X-Requested-With, Accept, Origin");

        // Allow credentials
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");

        // Set max age for preflight cache (24 hours)
        httpResponse.setHeader("Access-Control-Max-Age", "86400");

        // Handle preflight requests
        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
            httpResponse.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // Continue the chain
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        LOGGER.info("CORSFilter destroyed");
    }
}
