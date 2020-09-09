package com.ecommerce.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL , mappedBy = "category")
    private List<Product> products;

}
