import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    if(localStorage.getItem('seller')){
      return true;
    }
  return inject(SellerService).isSellerLoggedIn;

};
