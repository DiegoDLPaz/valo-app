import {Component,input} from "@angular/core";
import {Tier, TiersEpisode} from '../../interfaces/tiers-response.interface';
import {NgStyle} from '@angular/common';

@Component({
  selector: "app-tiers-card",
  imports: [
    NgStyle
  ],
  templateUrl: "./tiers-card.component.html"
})

export class AppComponent {
  tier = input.required<Tier>()


}
