package com.ecommerce.config;

import com.ecommerce.domain.Product;
import com.ecommerce.domain.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    HttpMethod[] theUnsupportedActions = {HttpMethod.PUT ,HttpMethod.POST ,HttpMethod.DELETE};

    EntityManager entityManager;


    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

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

        exposeId(config);

    }

    private void exposeId(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = this.entityManager.getMetamodel().getEntities();
        List<Class> entityClasses = entities.stream().map(EntityType::getJavaType).collect(Collectors.toList());
        //ExposeIdFor Entity Classes
        config.exposeIdsFor(entityClasses.toArray(new Class[0]));
    }
}
