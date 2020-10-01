import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8080/api/products';
  private productCategoriesUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductCategories() {
    return this.httpClient.get<GetProductCategoryResponse>(this.productCategoriesUrl).pipe(
      map(resp=>resp._embedded.productCategory)
    );
  }

  getProductListPaginate(thePage:number,theSize:number,
      theCategoryId:number) : Observable<GetProductResponse> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
              +`&page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetProductResponse>(searchUrl);
  }

  searchProductPaginate(thePage:number,theSize:number,
    theKeyword:string) : Observable<GetProductResponse> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
            +`&page=${thePage}&size=${theSize}`;

  return this.httpClient.get<GetProductResponse>(searchUrl);
}


  getProductList(theCategoryId:number) : Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string) : Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  getProduct(theProductId: number) : Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl)
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetProductResponse>(searchUrl).pipe(
      map(resp => resp._embedded.products)
    );
  }
}

interface GetProductResponse {
  _embedded: {
    products : Product[];
  },
  page: {
    size: number,
    totalElement : number,
    totalPages : number,
    number : number
  }
}

interface GetProductCategoryResponse {
  _embedded: {
    productCategory : ProductCategory[];
  }
}
