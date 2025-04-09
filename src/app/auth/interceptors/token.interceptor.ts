import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();

  if(req.url.includes('/auth')){
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });

    return next(newReq);
  }

  return next(req);
};
