package com.example.quickserve.controller;

import com.example.quickserve.model.User;
import com.example.quickserve.repository.UserRepository;
import com.example.quickserve.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        // පද්ධතියේ ඉන්න User ව හොයාගන්නවා Role එක දැනගන්න
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();

        String token = jwtUtil.generateToken(loginRequest.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole()); // Role එකත් එවමු

        return ResponseEntity.ok(response);
    }
    @GetMapping("/me")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = ((UserDetails) principal).getUsername();
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) return ResponseEntity.notFound().build();

        // ආරක්ෂාව සඳහා Password එක ඉවත් කර එවමු
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}