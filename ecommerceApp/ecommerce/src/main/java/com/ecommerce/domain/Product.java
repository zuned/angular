package com.ecommerce.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.annotation.Generated;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="category_id" , nullable = false)
    private ProductCategory category;
    private String sku;
    private String name;
    private String description;
    private BigDecimal unitPrice;
    private String imageUrl;
    private boolean active;
    private int unitsInStock;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date dateCreated;
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date lastupdated;

}
