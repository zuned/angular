package com.ecommerce.repository;

import com.ecommerce.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query("select p from Product p where p.category.id = :id")
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);


    Page<Product> findByNameContaining(@Param("name")String name, Pageable pageable);

}
