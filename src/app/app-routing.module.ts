import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { MenComponent } from './shared/men/men.component';
import { WomenComponent } from './shared/women/women.component';
import { SellerHomeComponent } from './shared/seller-home/seller-home.component';
import { SellerAuthComponent } from './shared/seller-auth/seller-auth.component';
import { UserAuthComponent } from './shared/user-auth/user-auth.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './shared/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './shared/seller-update-product/seller-update-product.component';
import { SearchComponent } from './shared/search/search.component';
import { ProductDetailsComponent } from './shared/product-details/product-details.component';
import { CartPageComponent } from './shared/cart-page/cart-page.component';
import { CheckoutComponent } from './shared/checkout/checkout.component';
import { MyOrderComponent } from './shared/my-order/my-order.component';
const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"men",component:MenComponent},
  {path:"women",component:WomenComponent},
  {path:"seller-auth",component:SellerAuthComponent},
  {path:"seller-home",component:SellerHomeComponent, canActivate:[authGuard]},
  {path:"seller-add-product" ,component:SellerAddProductComponent,canActivate:[authGuard]},
  {path:"sellerUpdate-product/:id",component:SellerUpdateProductComponent,canActivate:[authGuard]},
  {path:"search/:query",component:SearchComponent},
  {path:"details/:productId",component:ProductDetailsComponent},
  {path:"user-auth",component:UserAuthComponent},
  {path:"cart-page",component:CartPageComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"my-orders",component:MyOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
