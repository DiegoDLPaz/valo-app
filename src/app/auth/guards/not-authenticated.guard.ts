import {CanMatchFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {firstValueFrom} from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async (route, segments) => {

  const authService = inject(AuthService);
  const router = inject(Router)

  const isAuthenticated = await firstValueFrom(authService.checkStatus())

  if(isAuthenticated){
    router.navigateByUrl('/')
    return false;
  }
  return true;
};
