package com.campusmarketplace.request.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campusmarketplace.request.entity.ProductRequest;

public interface ProductRequestRepository extends JpaRepository<ProductRequest, Long> {

    List<ProductRequest> findByBuyerEmail(String buyerEmail);

    List<ProductRequest> findByProductId(Long productId);

    List<ProductRequest> findByProductIdIn(List<Long> productIds);
}