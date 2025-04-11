import {Component, inject, input} from '@angular/core';
import {Participant} from '@interfaces/match-response.interface';
import {ItemImagePipe} from '@pipes/item-image.pipe';
import {LeagueService} from '@services/league.service';
import {Router} from '@angular/router';

@Component({
  selector: 'match-participant-list',
  imports: [
    ItemImagePipe
  ],
  templateUrl: './match-participant-list.component.html'
})
export class MatchParticipantListComponent {
  service = inject(LeagueService)
  router = inject(Router)

  participant = input.required<Participant>()

  onParticipantClicked(puuid :string){
    this.service.getRiotUserByPuuid(puuid).subscribe( resp=>{

        this.service.lookedForUser = resp
        this.router.navigate(['/'])
      }
    )
  }

}
