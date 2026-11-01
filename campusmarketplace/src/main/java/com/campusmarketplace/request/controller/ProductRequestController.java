
package com.campusmarketplace.request.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.campusmarketplace.request.entity.ProductRequest;
import com.campusmarketplace.request.service.ProductRequestService;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductRequestController {

	private final ProductRequestService requestService;

	public ProductRequestController(ProductRequestService requestService) {
		this.requestService = requestService;
	}

	// Create a product request
	@PostMapping
	public ResponseEntity<ProductRequest> createRequest(@RequestBody ProductRequest request) {

		return ResponseEntity.status(HttpStatus.CREATED).body(requestService.createRequest(request));
	}

	// Get all requests
	@GetMapping
	public List<ProductRequest> getAllRequests() {
		return requestService.getAllRequests();
	}

	// Get requests by buyer email
	@GetMapping("/buyer/{email}")
	public List<ProductRequest> getRequestsByBuyer(@PathVariable String email) {

		return requestService.getRequestsByBuyer(email);
	}

	@GetMapping("/seller/{email}")
	public List<ProductRequest> getRequestsBySeller(@PathVariable String email) {

		return requestService.getRequestsBySeller(email);
	}
	@PutMapping("/{id}/status")
	public ProductRequest updateRequestStatus(
	        @PathVariable Long id,
	        @RequestParam String status) {

	    return requestService.updateRequestStatus(id, status.toUpperCase());
	}
}
