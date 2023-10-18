import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { login, signUp } from '../dataType';

@Injectable({
  providedIn: 'root'
})
export class SellerService {



  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }


  userSignUp(data: signUp) {
    console.log("service call");// Log the provided sign-up data to the console for debugging purposes
    return this.http
      .post('http://localhost:4000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);  //Send a POST request to 'http://localhost:3000/seller'
        this.router.navigate(['seller-home']);
        console.log(result.body);
        localStorage.setItem('seller', JSON.stringify(result.body));
        console.log(result);
        // if (result) {
        //   //If there is a response from the server
        //   localStorage.setItem('seller', JSON.stringify(result.body));
        //   this.router.navigate(['sellerHome']);
        //   console.log(result);
        // }

      });
  }//create post method to signup seller module

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
      //If a seller is found to be logged in, it updates the isSellerLoggedIn subject to true and redirects the seller to the 'sellerHome' route. T
    }
  }

  userLogin(data: login) {
    console.log(data);//debugging purpose only
    //   //API call to authenticate the user will be here
    this.http.get(`http://localhost:4000/seller?email=${data.email}&password=${data.password}`,
      { observe: `response` }
    ).subscribe((result: any) => {
      console.log(result);
      //     // Check if the response contains data and it's not an empty array
      if (result && result.body && result.body.length) {
        console.log("User logged in");
        localStorage.setItem('seller', JSON.stringify(result.body));// Store user data in localStorage
        this.router.navigate(['seller-home']); // Navigate the user to the 'sellerHome' route
      }
      else {
        console.log("login failed");
        this.isLoginError.emit(true);// Emit an event to indicate login error
      }

    })

  }

}
