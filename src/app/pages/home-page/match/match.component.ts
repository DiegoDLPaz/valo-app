import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LeagueService} from '../../../services/league.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {ItemImagePipe} from '../../../pipes/item-image.pipe';
import {TimePlayedPipe} from '../../../pipes/time-played.pipe';

@Component({
  selector: 'app-match',
  imports: [
    ItemImagePipe,
    TimePlayedPipe
  ],
  templateUrl: './match.component.html'
})

export class MatchComponent {
  activatedRoute = inject(ActivatedRoute)
  service = inject(LeagueService)

  matchId = this.activatedRoute.snapshot.paramMap.get('id')

  matchResource = rxResource({
    loader: () => this.service.getMatchById(this.matchId!)
  })

  matchTimelineResource = rxResource({
    loader: () => this.service.getMatchTimeLineById(this.matchId!)
  })


  get blueTeam(){
    return this.matchResource.value()!.info.participants.slice(0, 5);
  }

  get redTeam(){
    return this.matchResource.value()!.info.participants.slice(5);
  }

  get blueTeamKills(){
    return this.blueTeam.map(participant => participant.kills).reduce((a,b)=> a+b)
  }

  get redTeamKills(){
    return this.redTeam.map(participant => participant.kills).reduce((a,b)=> a+b)
  }

  get blueTeamNashors(){
    return this.blueTeam.map(participant => participant.dragonKills)
  }
}
