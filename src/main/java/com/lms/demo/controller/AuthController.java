package com.lms.demo.controller;

import com.lms.demo.entity.User;
import com.lms.demo.security.JwtUtils;
import com.lms.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        UserDetails userDetails = authService.loadUserByUsername(email);
        
        if (authService.getPasswordEncoder().matches(password, userDetails.getPassword())) {
            String token = jwtUtils.generateToken(userDetails);
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", email);
            // In a real app, we'd fetch the full user object with role
            return response;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
