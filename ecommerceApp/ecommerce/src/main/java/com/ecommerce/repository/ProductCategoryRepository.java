package com.ecommerce.repository;

import com.ecommerce.domain.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory , Long> {
}
