// src/main/java/com/example/egov/controller/TaxPaymentController.java
package com.example.egov.controller;

import com.example.egov.model.TaxPaymentRequest; // Import the model
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tax")
// IMPORTANT: Adjust the origin to match where your frontend is served from
@CrossOrigin(origins = "http://localhost:8080") // Example: If your HTML is opened via Live Server on port 8080
public class TaxPaymentController {

    @PostMapping("/pay")
    public ResponseEntity<String> processTaxPayment(@RequestBody TaxPaymentRequest taxPaymentRequest) {
        // Print the received tax payment information to the console
        System.out.println("Received Tax Payment Request:");
        System.out.println(taxPaymentRequest.toString());

        // In a real application, you would perform actual payment processing here,
        // interact with a payment gateway, save to a database, etc.

        // For this example, we simulate a successful payment response.
        return ResponseEntity.ok("{\"message\": \"Payment received successfully!\"}");
    }
}