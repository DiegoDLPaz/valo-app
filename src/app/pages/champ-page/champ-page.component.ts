import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LeagueService} from '@services/league.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {Champion} from '@interfaces/champion-response.interface';
import {LeagueEntryDTO} from '@interfaces/league-entry.interface';
import {concatMap, delay, forkJoin, from, map, switchMap, takeWhile, toArray} from 'rxjs';
import {MatchResponse} from '@interfaces/match-response.interface';


const MAX_MATCHES = 300;

@Component({
  selector: 'app-champ-page',
  imports: [],
  templateUrl: './champ-page.component.html'
})
export class ChampPageComponent implements AfterViewInit{

  @ViewChild('queue') queueSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('tier') tierSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('division') divisionSelect!: ElementRef<HTMLSelectElement>;

  http = inject(HttpClient)
  leagueService = inject(LeagueService)

  leagueEntries! :LeagueEntryDTO[];

  champsResource = rxResource({
    loader: () =>{
      return this.leagueService.getChamps()
    }
  })

  mapChampsToList(championsData: { [key: string]: Champion }): Champion[] {
    return Object.values(championsData);
  }

  get champs () {
    return this.mapChampsToList(this.champsResource.value()?.data!)
  }

  getWinratesFromEntries(entries: LeagueEntryDTO[]) {
    const uniqueMatchIds = new Set<string>();

    return from(entries).pipe(
      concatMap(entry =>
        this.leagueService.getMatchesIdsByPuuid(entry.puuid, 0).pipe(
          delay(1200),
          map(matchIds => {
            matchIds.forEach(id => {
              if (uniqueMatchIds.size < MAX_MATCHES) {
                uniqueMatchIds.add(id);
              }
            });
          })
        )
      ),
      // Stop when we have enough matches
      takeWhile(() => uniqueMatchIds.size < MAX_MATCHES, true),
      // Wait until all match ids are gathered
      toArray(),
      switchMap(() => {
        const ids = Array.from(uniqueMatchIds).slice(0, MAX_MATCHES);
        return from(ids).pipe(
          concatMap(id =>
            this.leagueService.getMatchById(id).pipe(delay(1200))
          ),
          toArray()
        );
      }),
      map((matches: MatchResponse[]) => {
        const champStats = new Map<string, { wins: number; games: number }>();

        matches.forEach(match => {
          match.info.participants.forEach(participant => {
            const champ = participant.championName;
            const won = participant.win;

            if (!champStats.has(champ)) {
              champStats.set(champ, { wins: 0, games: 0 });
            }

            const data = champStats.get(champ)!;
            data.games++;
            if (won) data.wins++;
          });
        });

        return champStats;
      })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const queue = this.queueSelect.nativeElement.value;
      const tier = this.tierSelect.nativeElement.value;
      const division = this.divisionSelect.nativeElement.value;

      this.onSelectChanged(queue, tier, division);

    });
  }

  onSelectChanged(queue: string, tier: string, division: string) {
    this.leagueService.getRankInfo(queue, tier, division).subscribe(
      (resp) => {
        this.leagueEntries = resp;
      },
    );

    this.getWinratesFromEntries(this.leagueEntries).subscribe(champStats => {
      champStats.forEach((stats, champ) => {
        const winrate = (stats.wins / stats.games) * 100;
        console.log(`${champ}: ${winrate.toFixed(2)}% (${stats.wins}/${stats.games})`);
      });
    });
  }

}
