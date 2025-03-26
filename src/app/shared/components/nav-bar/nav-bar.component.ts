import {Component, OnInit} from '@angular/core';
import {routes} from '../../../app.routes';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent{
    appRoutes  = routes[0].children!.filter(route => route.title !== 'Agent')
}
