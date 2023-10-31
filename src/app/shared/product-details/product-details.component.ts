import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, product } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService, private router:Router) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      console.log(result);
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter(
          (item: product) => productId === item.id.toString()
        );
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;// Get the user's ID from local storage
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result) => {
          let item = result.filter(
            (item: product) =>
              productId?.toString() === item.productId?.toString());
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        });
      }
    });
  }

  handQuantity(val: string) {
    if (this.productQuantity <= 10 && val === 'plus') {
      this.productQuantity += 1;
    } else {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;// Set the quantity of the product
      if (!localStorage.getItem('user')) {
        // If the user is not logged in (guest user)
        // console.log(this.productData);
        this.product.localAddToCart(this.productData);// Add the product to the local cart
        this.removeCart = true;// Set flag to display the remove button
      }
      else {
        // If the user is logged in
        console.log("user is loged in");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;// Get the user's ID from local storage
        // console.log(userId);
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };// Prepare cart data with user and product information

        delete cartData.id;//Remove the 'id' property from the cart data
        console.log(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          // Call the API to add the product to the user's cart
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
      // this.removeCart=false;
    }
    else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;// Get the user's ID from local storage
      console.log(this.cartData);
      this.cartData && this.product.removeToCart(this.cartData.id)
        .subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
          }
        })
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      this.removeCart = false;
    }
  }

  redirectToCheckout(){
    this.router.navigate(['./checkout'])
  }
}
