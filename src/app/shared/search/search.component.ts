import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/dataType';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

    SearchResult:undefined|product[];
    // searchMessage:string="No Result found";
    constructor(private activeRoute:ActivatedRoute, private product:ProductService){}

    ngOnInit():void{
      let query=this.activeRoute.snapshot.paramMap.get('query');
      console.log(query);
      query && this.product.searchProduct(query).subscribe((result)=>{
        this.SearchResult=result;   
      })
    }
}
