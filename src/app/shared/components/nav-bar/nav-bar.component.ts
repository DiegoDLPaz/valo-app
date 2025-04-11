import {Component, inject, OnInit} from '@angular/core';
import {routes} from '../../../app.routes';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {Converter} from '../../utils/converter';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent{
  authService = inject(AuthService)
  converter = new Converter()

  appRoutes  = routes[5].children!
    .filter(route => route.title !== 'Agent' && route.path !== 'auth' && route.path !== 'champ-info')
}
