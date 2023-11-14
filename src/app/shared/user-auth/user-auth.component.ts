import { Component, OnInit } from '@angular/core';
import { cart, login, product, signUp } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError: string = "";
  constructor(private user: UserService, private product: ProductService) { }
  ngOnInit(): void {
    this.user.userAuthReload();
  }


  // for user signUp
  signUp(data: signUp) {
    // console.log(data);
    this.user.userSignUp(data);
  }

  // for user Login
  login(data: login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.log("banana", result);
      if (result) {
        this.authError = "Please Enter valid User details"
      } else {
        this.localCartToRemoteCart();
      }
    })
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;// Get the user's ID from local storage
    if (data) {
      let cartDataList: product[] = JSON.parse(data) // Parse the local cart data
     
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };// Prepare cart data with user and product information

        delete cartData.id; // Remove the 'id' property from the cart data
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("data stored in DB ");// Log a message if the item is stored in the database
            }
          })
        }, 500);
        if (cartDataList.length === index+1) {
          localStorage.removeItem('localCart');// Remove local cart data after transferring items to the remote cart
        }
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    },2000);
  }
}
