import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | product;
  productQuantity: number = 1;
  removeCart=false;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      console.log(result);
      this.productData = result;

      let cartData=localStorage.getItem('localCart');
      if(productId && cartData){
        let items=JSON.parse(cartData);
        items=items.filter((item:product)=>productId==item.id.toString())
        if(items.length){
          this.removeCart=true;
        }else{
          this.removeCart=false;
        }
      }
    })
  }

  handQuantity(val: string) {
    if (this.productQuantity <= 10 && val === 'plus') {
      this.productQuantity += 1;
    } else {
      this.productQuantity-=1;
    }
  }

  addToCart(){
    if( this.productData){
      this.productData.quantity=this.productQuantity;
      if(!localStorage.getItem('user')){
      // console.log(this.productData);
      this.product.localAddToCart(this.productData);
      this.removeCart=true;
      }
    }
  }

  removeToCart(productId:number){
    this.product.removeItemFromCart(productId);
  }
}
