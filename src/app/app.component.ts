import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
import { product } from './dataType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'ECommerce';


  menuType: string = 'default';
  sellerName: string = '';
  userName:string="";
  searchResult: any[] = [];
  constructor(private route: Router, private product: ProductService) { }


  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } 
        else if(localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          console.log(userStore);
          let userData = userStore && JSON.parse(userStore);
          console.log(userData);
          this.userName = userData.name;
          this.menuType = 'user';
        }
        else{
          this.menuType='default';
        }
      }
    });
  }
  // seller logout
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  // user logout
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
  }

  searchProduct(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.trim(); // Trim whitespace from the input

    if (query.length >= 3) { // Check if the query length is greater than or equal to 3 characters
      this.product.searchProduct(query).subscribe((result: any[]) => {
        // console.log(result);
        this.searchResult = result;
      });
    } else {
      this.searchResult = []; // Clear search results if the query length is less than 3 characters
    }
  }

  submitSearch(val: string) {
    console.log(val);
    this.route.navigate([`search/${val}`]);
  }

  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }


}
