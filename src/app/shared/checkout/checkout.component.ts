import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, priceSummary } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalPrice: number|undefined;
  cartData:cart[]|undefined;
  orderMsg:string|undefined;
  constructor(private product:ProductService, private router:Router){}

  ngOnInit():void{
    this.product.currentCart().subscribe((result)=>{
      console.log(result);
    
      let price=0;
      this.cartData=result;
      result.forEach((item)=>{
        if(item.quantity){
          price=price+(+item.price * + item.quantity);
        }
      })
      // console.log(price);
      this.totalPrice=price+(price/10)+98-(price/10);
     
      console.log(this.totalPrice);
    })
  }


  orderNow(data:{email:string,address:string,contact:string}){
    console.log(data);
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData:order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }

      this.cartData?.forEach((item)=>{
        setTimeout(()=>{
          item.id && this.product.deleteCartItems(item.id)
        },700);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          // alert('order placed');
          this.orderMsg="Your Order has been Placed"
          setTimeout(()=>{
            this.router.navigate(['/my-orders']);
            this.orderMsg=undefined;
          },4000);
        }
      })
    }

   
  }


}
