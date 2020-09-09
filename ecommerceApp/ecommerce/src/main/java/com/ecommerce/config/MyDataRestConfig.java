package com.ecommerce.config;

import com.ecommerce.domain.Product;
import com.ecommerce.domain.ProductCategory;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

public class MyDataRestConfig implements RepositoryRestConfigurer {
    HttpMethod[] theUnsupportedActions = {HttpMethod.PUT ,HttpMethod.POST ,HttpMethod.DELETE};

    @Override
    public void configureRepositoryRestConfiguration
            (RepositoryRestConfiguration config) {
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}
