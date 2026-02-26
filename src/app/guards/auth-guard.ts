import { effect, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
 const authServ= inject(AuthService);
 const router = inject(Router);
 return new Promise((resolve, reject)=>{
  // if (!authServ) {
  //   reject(false);
  // }
  effect(()=>{
    if (authServ.isAuth()) {
      resolve(true);
    } else{
      router.navigate(['/login']);
      resolve(false);
    }
  })
 })
};
