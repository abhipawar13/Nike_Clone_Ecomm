import { Injectable } from '@angular/core';
import { login, signUp } from '../dataType';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(user:signUp){
  //  console.log(user);
    this.http.post("http://localhost:4000/users",user,{observe:'response'})
    .subscribe((result)=>{
      console.log(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    });
  }

      userLogin(data:login){
        this.http.get<signUp[]>(`http://localhost:4000/users?email=${data.email}&password=${data.password}`,
        {observe:'response'})
        .subscribe((result)=>{
          if(result && result.body){
            localStorage.setItem('user',JSON.stringify(result.body[0]));
            this.router.navigate(['/']);
          }
        })
      }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

}
