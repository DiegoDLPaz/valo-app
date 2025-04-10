import {Component, input} from '@angular/core';
import {MatchResponse} from '@interfaces/match-response.interface';
import { NgStyle} from '@angular/common';
import {VictoryPipe} from '@pipes/victory.pipe';
import {ItemImagePipe} from '@pipes/item-image.pipe';
import {TimestamptodatePipe} from '@pipes/timestamptodate.pipe';
import {TimePlayedPipe} from '@pipes/time-played.pipe';
import {GoldGainedPipe} from '@pipes/gold-gained.pipe';
import {GameTypePipe} from '@pipes/game-type.pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-match-info',
  imports: [
    NgStyle,
    VictoryPipe,
    ItemImagePipe,
    TimestamptodatePipe,
    TimePlayedPipe,
    GoldGainedPipe,
    GameTypePipe,
    RouterLink
  ],
  templateUrl: './match-info.component.html'
})

export class MatchInfoComponent {
  match = input.required<MatchResponse>()
  puuid = input.required<string>()

  get protagonist(){
    return this.match().info.participants.filter
    (participant => participant.puuid === this.puuid())[0]
  }

}
