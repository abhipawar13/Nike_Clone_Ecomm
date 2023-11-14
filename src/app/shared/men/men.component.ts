import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent {
  category: string | undefined; // Holds the selected category, e.g., 'sneakers'
  products: product[] = [];
  

  constructor (private product:ProductService,private router:Router, private activeRoute:ActivatedRoute){  
    
  }
  
  ngOnInit(): void {
    let category=this.activeRoute.snapshot.paramMap.get('category');
    console.log(category);
    category && this.product.getProductsByCategory(category).subscribe((result)=>{
      console.log(result);
      this.products=result;
    })
  }
  
  loadProducts(): void {
    this.product.getProductsByCategory(this.category).subscribe(data => {
      this.products = data;
    });
  } 
}
