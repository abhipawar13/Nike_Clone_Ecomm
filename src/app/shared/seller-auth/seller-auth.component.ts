import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signUp } from 'src/app/dataType';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  
  showLogin: boolean = true;
  authError: string = "";
  constructor(private seller:SellerService, private router:Router) { }
 
  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data:signUp): void {  
    // console.log(data);
    this.seller.userSignUp(data); 
    // this.router.navigate(['/']);
  }

  login(data:signUp): void {
    this.authError=""
    // console.log(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError: any)=>{
      console.log(isError);
      if(isError){
        this.authError="Sorry, your password was incorrect. Please double-check your password";
      }
   
    })
  } 

  openLogin(){
this.showLogin=true;
  }
  opneSignup(){
    this.showLogin=false;
  }
}
