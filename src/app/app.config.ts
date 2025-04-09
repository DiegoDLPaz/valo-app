import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {addHeaderInterceptor} from './interceptors/add-header.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {tokenInterceptor} from './auth/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(
      withFetch(),
       withInterceptors([
         tokenInterceptor
       ])
      // ([
      //   addHeaderInterceptor
      // ])
    ),
    provideAnimations(),
    provideToastr()
  ]
};
