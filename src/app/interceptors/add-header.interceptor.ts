import { HttpRequest,HttpHandlerFn} from '@angular/common/http';
import {environment} from '@environment/environment.development';


export function addHeaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  const newReq = req.clone({
    headers: req.headers.append('X-Riot-Token', environment.API_KEY),
  });

  return next(newReq);
}
