import {Component, input, signal} from '@angular/core';
import {MatchResponse, Participant} from '../../interfaces/match-response.interface';
import {DecimalPipe, NgStyle} from '@angular/common';
import {VictoryPipe} from '../../pipes/victory.pipe';
import {ItemImagePipe} from '../../pipes/item-image.pipe';
import {TimestamptodatePipe} from '../../pipes/timestamptodate.pipe';
import {TimePlayedPipe} from '../../pipes/time-played.pipe';
import {GoldGainedPipe} from '../../pipes/gold-gained.pipe';

@Component({
  selector: 'app-match-info',
  imports: [
    NgStyle,
    VictoryPipe,
    ItemImagePipe,
    TimestamptodatePipe,
    TimePlayedPipe,
    GoldGainedPipe
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
