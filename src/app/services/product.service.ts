import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../dataType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  cartData=new EventEmitter<product[] | []>()
  constructor(private http:HttpClient) { }
  addProduct(data:product) {
    // console.log("service called"); 
    return this.http.post('http://localhost:4000/products', data);
  }

  productList() {
    return this.http.get<product[]>('http://localhost:4000/products');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:4000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:4000/products/${id}`);
  }

  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:4000/products/${product.id}`,product);
  }

  popularProducts(){
    return this.http.get<product[]>('http://localhost:4000/products?_limit=10');
  }

  trendyProducts(){
    return this.http.get<product[]>('http://localhost:4000/products?_limit=10');
  }

  searchProduct(query:string){
    return this.http.get<product[]>(`http://localhost:4000/products?q=${query}`);
  }

  localAddToCart(data:product){
    let cartData=[];
    let localCart=localStorage.getItem('localCart');// Retrieve existing cart data from local storage
    if(!localCart){
      // If there is no existing cart data
      localStorage.setItem('localCart',JSON.stringify([data]));// Initialize cart with the current product
    }
    else{
       // If there is existing cart data
      console.log("else");
      cartData=JSON.parse(localCart);// Parse the existing cart data from JSON to an array
      cartData.push(data);//add data in cartdata
      localStorage.setItem('localCart',JSON.stringify(cartData));// Update cart data in local storage

    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId:number){
    let cartData=localStorage.getItem('localCart');// Retrieve existing cart data from local storage
    if(cartData){
      let items:product[]=JSON.parse(cartData);
      items=items.filter((item:product)=>productId!==item.id);
      console.log(items);
    }
  }
}
