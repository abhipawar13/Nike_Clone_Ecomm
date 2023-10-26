import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  cartData:cart[]|undefined;
  priceSummary:priceSummary={
      price: 0,
      discount:0,
      tax:0,
      delivery:0,
      total:0 
  }
  constructor(private product:ProductService, private router:Router){}

  ngOnInit():void{
    this.product.currentCart().subscribe((result)=>{
      console.log(result);
      this.cartData=result;
      let price=0;
      result.forEach((item)=>{
        if(item.quantity){
          price=price+(+item.price * + item.quantity);
        }
      })
      // console.log(price);
      this.priceSummary.price=price;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.delivery=98;
      this.priceSummary.total=price+(price/10)+98-(price/10);
      console.log(this.priceSummary);
    })
  }

  checkout(){
    this.router.navigate(['/checkout']);
  }

  removeItemFromCart(cartId:any){
    this.product.deleteCartItems(cartId);
    console.log(cartId);
    window.location.reload();
  }
}
