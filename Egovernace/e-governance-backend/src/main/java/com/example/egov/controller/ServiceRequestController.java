package com.example.egov.controller; // IMPORTANT: Ensure this package name matches YOUR project's base package + .controller

import org.springframework.http.HttpStatus; // Import your model class
import org.springframework.http.ResponseEntity; // Import your other model class
import org.springframework.web.bind.annotation.ModelAttribute;       // For HTTP status codes like OK (200)
import org.springframework.web.bind.annotation.PostMapping;   // To return custom HTTP responses
import org.springframework.web.bind.annotation.RestController; // To bind form data to Java objects

import com.example.egov.model.BusinessRegistrationData;    // To map POST requests
import com.example.egov.model.NationalIdApplicationData; // Combination of @Controller and @ResponseBody

/**
 * Controller to handle web requests related to service submissions.
 * This class is annotated with @RestController, meaning it handles RESTful requests
 * and methods return data directly (e.g., JSON or a String) rather than view names.
 */
@RestController
public class ServiceRequestController {

    // Handles POST requests coming from the Business Registration form
    // The form's action is "/submitBusinessRegistration" and method is "POST"
    @PostMapping("/submitBusinessRegistration")
public ResponseEntity<String> handleBusinessRegistration(
        @ModelAttribute BusinessRegistrationData data) {
    System.out.println("----------------------------------------------");
    System.out.println("Received Business Registration Request:");
    System.out.println("Business Name:    " + data.getBusinessName());
    System.out.println("Owner Name:       " + data.getOwnerName());
    System.out.println("Email:            " + data.getEmail());
    System.out.println("Phone Number:     " + data.getPhoneNumber());     // NEW LINE
    System.out.println("Business Type:    " + data.getBusinessType());    // NEW LINE
    System.out.println("Registration Date:" + data.getRegistrationDate()); // NEW LINE
    System.out.println("----------------------------------------------");

    // In a real-world application, you would perform these actions:
    // 1. Validate the 'data' object (e.g., check for empty fields, valid email format).
    // 2. Save this 'data' to a database (e.g., MySQL, PostgreSQL) using a service layer.
    // 3. Perform other business logic (e.g., send a confirmation email to the user).
    // 4. Handle potential errors during saving or processing.

    return new ResponseEntity<>("Business Registration submitted successfully! Your request is been processed, please be patient", HttpStatus.OK);
}

    // Handles POST requests coming from the National ID Application form
    // The form's action is "/submitNationalID" and method is "POST"
    @PostMapping("/submitNationalID")
public ResponseEntity<String> handleNationalIdApplication(
        @ModelAttribute NationalIdApplicationData data) {
    System.out.println("----------------------------------------------");
    System.out.println("Received National ID Application Request:");
    System.out.println("Full Name:    " + data.getFullName());
    System.out.println("Date of Birth: " + data.getDateOfBirth());
    System.out.println("Address:       " + data.getAddress());
    System.out.println("----------------------------------------------");
    return new ResponseEntity<>("National ID Application submitted successfully! Your request is being processed", HttpStatus.OK);
}

    // You do NOT need an explicit constructor like this unless you're adding
    // specific initialization logic or dependency injection here.
    // Spring handles default constructors automatically.
    // public ServiceRequestController() {
    // }
}