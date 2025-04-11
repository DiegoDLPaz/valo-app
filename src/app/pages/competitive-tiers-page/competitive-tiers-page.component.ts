import {Component, inject} from '@angular/core';
import {AppComponent} from './components/tiers-card/tiers-card.component';
import {TiersService} from './services/tiers.service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-competitive-tiers-page',
  imports: [
    AppComponent
  ],
  templateUrl: './competitive-tiers-page.component.html'
})

export class CompetitiveTiersPageComponent {
  tiersService = inject(TiersService)

  tiersResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.tiersService.getAllTiersFromAllEpisodes()
    }
  })

}
