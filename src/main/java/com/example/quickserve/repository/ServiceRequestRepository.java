package com.example.quickserve.repository;



import com.example.quickserve.model.ServiceRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ServiceRequestRepository extends MongoRepository<ServiceRequest, String> {
    List<ServiceRequest> findByClientId(String clientId);
}