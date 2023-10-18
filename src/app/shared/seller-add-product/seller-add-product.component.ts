import { Component } from '@angular/core';
import { product } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  addProductMessage:string|undefined;
  constructor(private product: ProductService) { }
// adding product using api
  submit(data: product) {
    console.log(data);
    this.product.addProduct(data).subscribe((result: any) => {
      console.log(result);
      if(result){
        this.addProductMessage= "Added Successfully";
      }
      setTimeout(()=>(this.addProductMessage=undefined),3000);
    
    })
  }
}
