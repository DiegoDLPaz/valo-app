import { Component } from '@angular/core';
import {NavBarComponent} from "../../shared/components/nav-bar/nav-bar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard',
    imports: [
        NavBarComponent,
        RouterOutlet
    ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

}
