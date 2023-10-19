import { Component, OnInit } from '@angular/core';
import { login, signUp } from 'src/app/dataType';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin:boolean=true;
  authError:string="";
  constructor(private user:UserService){}
  ngOnInit(): void {
   this.user.userAuthReload();
  }


  // for user signUp
  signUp(data:signUp){
    console.log(data);
    this.user.userSignUp(data);
  }

  // for user Login
  login(data:login){
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result)=>{
      console.log("banana",result);
      if(result){
        this.authError="Please Enter valid User details"
      }
    })
  }

  openSignUp(){
    this.showLogin=false;
  }

  openLogin(){
this.showLogin=true;
  }
}
