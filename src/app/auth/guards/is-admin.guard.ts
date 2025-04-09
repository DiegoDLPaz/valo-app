import { CanMatchFn } from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {firstValueFrom} from 'rxjs';

export const IsAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);

  await firstValueFrom(authService.checkStatus());

  return authService.isAdmin();
};
