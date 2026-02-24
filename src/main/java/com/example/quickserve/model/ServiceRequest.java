package com.example.quickserve.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "service_requests")
public class ServiceRequest {
    @Id
    private String id;
    private String clientId;
    private String providerId;
    private String serviceType;
    private String description;
    private String status; // PENDING, ACCEPTED, COMPLETED
    private LocalDateTime createdAt = LocalDateTime.now();
}