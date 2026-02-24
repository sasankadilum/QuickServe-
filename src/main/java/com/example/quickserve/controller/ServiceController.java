package com.example.quickserve.controller;

import com.example.quickserve.model.ServiceRequest;
import com.example.quickserve.model.User;
import com.example.quickserve.repository.UserRepository;
import com.example.quickserve.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserRepository userRepository;


    private User getLoggedInUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = ((UserDetails) principal).getUsername();
        return userRepository.findByEmail(email).orElse(null);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ServiceRequest request) {
        User currentUser = getLoggedInUser();
        if (currentUser == null) {
            return ResponseEntity.badRequest().body("User not found!");
        }


        request.setClientId(currentUser.getId());
        return ResponseEntity.ok(taskService.createRequest(request));
    }

    @GetMapping("/all")
    public List<ServiceRequest> getAll() {
        return taskService.getAllRequests();
    }


    @GetMapping("/my-requests")
    public ResponseEntity<?> getMyRequests() {
        User currentUser = getLoggedInUser();
        if (currentUser == null) {
            return ResponseEntity.badRequest().body("User not found!");
        }
        return ResponseEntity.ok(taskService.getMyRequests(currentUser.getId()));
    }


    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestParam String status) {
        User currentUser = getLoggedInUser();


        if (currentUser == null || !currentUser.getRole().equals("ROLE_PROVIDER")) {
            return ResponseEntity.status(403).body("Only providers can update status!");
        }

        // Update
        ServiceRequest updatedRequest = taskService.updateRequestStatus(id, status, currentUser.getId());
        if (updatedRequest == null) {
            return ResponseEntity.badRequest().body("Request not found!");
        }
        return ResponseEntity.ok(updatedRequest);
    }
    // පද්ධතියේ ඇති සියලුම PENDING වැඩ බැලීම (Provider සඳහා)
    @GetMapping("/available")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<List<ServiceRequest>> getAvailableRequests() {
        List<ServiceRequest> pendingRequests = taskService.getAllRequests().stream()
                .filter(req -> "PENDING".equals(req.getStatus()))
                .toList();
        return ResponseEntity.ok(pendingRequests);
    }
}