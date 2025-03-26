import {Component, input} from '@angular/core';
import {Buddie} from '../interfaces/buddie-response.interface';

@Component({
  selector: 'app-buddie-card',
  imports: [],
  templateUrl: './buddie-card.component.html'
})
export class BuddieCardComponent {
    buddie = input.required<Buddie>()
}
