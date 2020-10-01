import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products :Product[] = [];
  currentCategoryId:number = 1;
  previousCategoryId:number = 1;
  searchMode:boolean = false;

  thePageNumber:number = 1;
  thePageSize:number = 10;
  theTotalElement:number = 0;

  previousKeyword :string = null;

  constructor(private productService : ProductService , 
              private cartService:CartService,
              private route:ActivatedRoute ) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
    
  }

  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts()
    }else {
      this.handleListProducts();
    }
   
  }

  handleSearchProducts() {
    const theKeyword:string = this.route.snapshot.paramMap.get('keyword');
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;

    this.productService.searchProductPaginate(this.thePageNumber -1 , this.thePageSize ,theKeyword)
    .subscribe( this.processResult() );
    
   /* this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products = data;
      }
    );*/
  }

  handleListProducts() {
    const hasCategoryId :boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId) {
      this.currentCategoryId = Number.parseInt(this.route.snapshot.paramMap.get('id')) ;
    }else{
      this.currentCategoryId = 1;
    }
    if(this.previousCategoryId != this.currentCategoryId)
    {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1 , this.thePageSize , this.currentCategoryId)
                      .subscribe(this.processResult());
    /*
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );*/
  }
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElement = data.page.totalElements;
    }
  }


  updatePageSize(pageSize:number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct:Product) {
    const theCartItem = new CartItem(theProduct);
    
    this.cartService.addToCart(theCartItem);
  }
}
