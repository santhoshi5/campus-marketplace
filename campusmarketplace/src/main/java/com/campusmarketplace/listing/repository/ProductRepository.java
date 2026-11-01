package com.campusmarketplace.listing.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.campusmarketplace.listing.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByStatus(String status);

    List<Product> findByCategory(String category);

    List<Product> findByTitleContainingIgnoreCase(String title);

    List<Product> findBySellerEmail(String sellerEmail);
}