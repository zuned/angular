import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[] = [];

  totalPrice:Subject<number> = new Subject<number>();
  totalQuantity:Subject<number> = new Subject<number>();

  constructor() { }


  addToCart(theCartItem : CartItem) {
    let alreadyExistInCart:boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0 ) {

      //Find method return fist element from array after executing condition
      existingCartItem =  this.cartItems.find(tempCartItem=> tempCartItem.id === theCartItem.id);

      alreadyExistInCart = existingCartItem!=undefined;
    }

    if(alreadyExistInCart){
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotal();
  }//Add cart end here

  computeCartTotal() {
    let totalPriceValue :number = 0;
    let totalQuantityValue : number =0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += (currentCartItem.quantity * currentCartItem.unitPrice);
      totalQuantityValue += currentCartItem.quantity;
    }

    //this is will publish the new values.. all subscriber will receive new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(theCartItem:CartItem) {
    theCartItem.quantity--;
    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotal();
    }
  }

  remove(theCartItem:CartItem) {
    const index = this.cartItems.findIndex(ci=>ci.id=== theCartItem.id);
    if(index > -1){
      this.cartItems.splice(index , 1);
      this.computeCartTotal();
    }
  }
}
