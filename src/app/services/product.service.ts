import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../dataType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  cartData = new EventEmitter<product[] | []>()
  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    // console.log("service called"); 
    return this.http.post('http://localhost:4000/products', data);
  }

  productList() {
    return this.http.get<product[]>('http://localhost:4000/products');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:4000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:4000/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:4000/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:4000/products?_limit=10');
  }

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:4000/products?_limit=10');
  }

  searchProduct(query: string) {
    return this.http.get<product[]>(`http://localhost:4000/products?q=${query}`);
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');// Retrieve existing cart data from local storage
    if (!localCart) {
      // If there is no existing cart data
      localStorage.setItem('localCart', JSON.stringify([data]));// Initialize cart with the current product
      this.cartData.emit([data]);
    }
    else {
      // If there is existing cart data
      console.log("else");
      cartData = JSON.parse(localCart);// Parse the existing cart data from JSON to an array
      cartData.push(data);//add data in cartdata
      localStorage.setItem('localCart', JSON.stringify(cartData));// Update cart data in local storage
      this.cartData.emit(cartData);
    }

  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');// Retrieve existing cart data from local storage
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      // console.log(items);
      localStorage.setItem('localCart', JSON.stringify(items));// Update items data in local storage
      this.cartData.emit(items);//to update the header items
    }
  }


  addToCart(cartData: cart) {
    return this.http.post('http://localhost:4000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http.get<product[]>('http://localhost:4000/cart?userId=' + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }

      });

  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:4000/cart/' + cartId);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:4000/cart?userId='+userData.id);
  }

  orderNow(data:order){ 
    return this.http.post('http://localhost:4000/orders',data)

  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:4000/orders?userId='+userData.id)
  }

  deleteCartItems(cartId:number){
    return this.http.delete('http://localhost:4000/cart/' + cartId).subscribe((result)=>{
      if(result){
          this.cartData.emit([])
          console.log(result);
      }
    })
  }

   cancelOrder(orderId:number){
    return this.http.delete('http://localhost:4000/orders/'+orderId);
  }
}
