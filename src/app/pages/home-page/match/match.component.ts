import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LeagueService} from '../../../services/league.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {ItemImagePipe} from '../../../pipes/item-image.pipe';
import {TimePlayedPipe} from '../../../pipes/time-played.pipe';
import {DragonTypePipe} from '../../../pipes/dragon-type.pipe';
import {ParticipantTimeLineDto} from '../../../interfaces/match-timeline-response.interface';
import {Participant} from '../../../interfaces/match-response.interface';

@Component({
  selector: 'app-match',
  imports: [
    ItemImagePipe,
    TimePlayedPipe,
    DragonTypePipe
  ],
  templateUrl: './match.component.html'
})

export class MatchComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  service = inject(LeagueService)

  matchId = this.activatedRoute.snapshot.paramMap.get('id')

  blueTeamDrakes = signal<string[]>([])
  blueTeamGrubs = signal<string[]>([])
  blueTeamNashors = signal<string[]>([])

  blueKilledHerald = signal<boolean>(false)

  redTeamDrakes = signal<string[]>([])
  redTeamGrubs = signal<string[]>([])
  redTeamNashors = signal<string[]>([])

  firstBloodSummoner! : Participant;
  heraldKiller! : Participant;

  matchResource = rxResource({
    loader: () => this.service.getMatchById(this.matchId!)
  })

  matchTimelineResource = rxResource({
    loader: () => this.service.getMatchTimeLineById(this.matchId!)
  })

  ngOnInit(): void {
    if (this.matchTimelineResource.isLoading()) {
      setTimeout(() => {
        this.ngOnInit()
      }, 100)
    } else {
      this.getEvents()
    }
  }

  get blueTeam() {
    return this.matchResource.value()!.info.participants.slice(0, 5);
  }

  get redTeam() {
    return this.matchResource.value()!.info.participants.slice(5);
  }

  get blueTeamKills() {
    return this.blueTeam.map(participant => participant.kills).reduce((a, b) => a + b)
  }

  get redTeamKills() {
    return this.redTeam.map(participant => participant.kills).reduce((a, b) => a + b)
  }

  getEvents() {
    for (const frame of this.matchTimelineResource.value()!.info.frames) {
      for (const event of frame.events) {
        switch (event.monsterType) {
          case "DRAGON":
            if (event.killerTeamId === 200) {
              this.redTeamDrakes.set([...this.redTeamDrakes(), event.monsterSubType!])
            } else {
              this.blueTeamDrakes.set([...this.blueTeamDrakes(), event.monsterSubType!])
            }
            break;
          case "HORDE":
            if (event.killerTeamId === 200) {
              this.redTeamGrubs.set([...this.redTeamGrubs(), event.monsterSubType!])
            } else {
              this.blueTeamGrubs.set([...this.blueTeamGrubs(), event.monsterSubType!])
            }
            break;
          case "BARON_NASHOR":
            if (event.killerTeamId === 200) {
              this.redTeamNashors.set([...this.redTeamNashors(), event.monsterSubType!])
            } else {
              this.blueTeamNashors.set([...this.blueTeamNashors(), event.monsterSubType!])
            }
            break;
          case "RIFTHERALD":
            if (event.killerTeamId === 200) {
              this.blueKilledHerald.set(false)
            } else {
              this.blueKilledHerald.set(true)
            }

            const heraldKiller: ParticipantTimeLineDto =
              this.matchTimelineResource.value()?.info.participants
                .filter(participant => participant.participantId === event.killerId)[0]!

            this.heraldKiller = this.matchResource.value()?.info.participants.find(participant=> participant.puuid === heraldKiller.puuid)!

            break;
        }

        if (event.killType === "KILL_FIRST_BLOOD") {
          const firstBloodMaker: ParticipantTimeLineDto =
            this.matchTimelineResource.value()?.info.participants
              .filter(participant => participant.participantId === event.killerId)[0]!

          this.firstBloodSummoner = this.matchResource.value()?.info.participants.find(participant=> participant.puuid === firstBloodMaker.puuid)!
        }
      }

    }
  }

}
