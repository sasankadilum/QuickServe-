package com.example.quickserve.service;

import com.example.quickserve.model.ServiceRequest;
import com.example.quickserve.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private ServiceRequestRepository repository;

    public ServiceRequest createRequest(ServiceRequest request) {
        request.setStatus("PENDING");
        return repository.save(request);
    }

    public List<ServiceRequest> getAllRequests() {
        return repository.findAll();
    }


    public List<ServiceRequest> getMyRequests(String clientId) {
        return repository.findByClientId(clientId);
    }


    public ServiceRequest updateRequestStatus(String id, String status, String providerId) {
        ServiceRequest request = repository.findById(id).orElse(null);
        if (request != null) {
            request.setStatus(status); // PENDING -> ACCEPTED හෝ COMPLETED විදිහට මාරු වෙනවා
            if (providerId != null) {
                request.setProviderId(providerId); // වැඩේ බාරගත්ත කෙනාගේ ID එක සේව් වෙනවා
            }
            return repository.save(request);
        }
        return null;
    }
}