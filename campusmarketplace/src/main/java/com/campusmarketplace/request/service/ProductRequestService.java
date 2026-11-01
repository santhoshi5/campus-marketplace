package com.campusmarketplace.request.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.campusmarketplace.request.entity.ProductRequest;
import com.campusmarketplace.request.repository.ProductRequestRepository;
import com.campusmarketplace.listing.entity.Product;
import com.campusmarketplace.listing.repository.ProductRepository;

@Service
public class ProductRequestService {

	private final ProductRequestRepository requestRepository;
	private final ProductRepository productRepository;

	public ProductRequestService(ProductRequestRepository requestRepository, ProductRepository productRepository) {
		this.requestRepository = requestRepository;
		this.productRepository = productRepository;
	}

	public ProductRequest createRequest(ProductRequest request) {
		request.setStatus("PENDING");
		return requestRepository.save(request);
	}

	public List<ProductRequest> getAllRequests() {
		return requestRepository.findAll();
	}

	public List<ProductRequest> getRequestsByBuyer(String email) {
		return requestRepository.findByBuyerEmail(email);
	}

	// Get requests received by a seller
	public List<ProductRequest> getRequestsBySeller(String sellerEmail) {

		List<Product> products = productRepository.findBySellerEmail(sellerEmail);

		List<Long> productIds = products.stream().map(Product::getId).collect(Collectors.toList());

		if (productIds.isEmpty()) {
			return List.of();
		}

		return requestRepository.findByProductIdIn(productIds);
	}

	public ProductRequest updateRequestStatus(Long id, String status) {

		ProductRequest request = requestRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Request not found"));

		if (!status.equals("ACCEPTED") && !status.equals("REJECTED")) {
			throw new RuntimeException("Invalid status");
		}

		request.setStatus(status);

		return requestRepository.save(request);
	}

}