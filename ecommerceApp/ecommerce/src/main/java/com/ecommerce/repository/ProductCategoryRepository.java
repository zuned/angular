package com.ecommerce.repository;

import com.ecommerce.domain.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface ProductCategoryRepository extends JpaRepository<ProductCategory , Long> {
}
