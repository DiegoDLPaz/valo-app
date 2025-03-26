import {Component, input} from '@angular/core';
import {Ability} from '../../interfaces/agent-response.interface';
import {AbilityPipe} from '../../pipes/ability.pipe';

@Component({
  selector: 'app-abilities-carousel',
  imports: [
    AbilityPipe
  ],
  templateUrl: './abilities-carousel.component.html'
})

export class AbilitiesCarouselComponent {
  abilities = input.required<Ability[]>()
  uuid = input.required<string>()
}
