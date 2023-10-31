import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  popularProducts:undefined|product[]
  trendyProducts:undefined|product[]
longText: any;
  constructor (private product:ProductService,private router:Router){}

  ngOnInit():void{

    


    this.product.popularProducts().subscribe((data)=>{
      console.log(data);
      this.popularProducts=data;
    });
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }

  // redirectToCheckout(){
  //   this.router.navigate(['./checkout'])
  // }
  
}
