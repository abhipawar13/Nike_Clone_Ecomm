import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData:undefined|product;
  productMessage:undefined|string;
  constructor(private route:ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id');//assigning the value of the 'id' parameter from the current route to the variable productId. After this line of code is executed, productId will contain the value of the 'id' route parameter,
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.log(data);
      this.productData=data;
    })
  }

  submit(data:product){
    console.log(data);
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product has updated"
      }
    });
    setTimeout(() => {
      this.productMessage=undefined;
    }, 3000);
  }
}
