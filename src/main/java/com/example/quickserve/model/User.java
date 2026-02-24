package com.example.quickserve.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
public class User {
    @Id
    private String id;
    private String fullName;
    private String email;
    private String password;
    private String role; // ROLE_CLIENT, ROLE_PROVIDER, ROLE_ADMIN
    private String expertise; // Provider කෙනෙක් නම් පමණයි (e.g., Plumber, Electrician)
}