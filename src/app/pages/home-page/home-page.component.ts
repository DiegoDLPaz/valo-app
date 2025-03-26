import {Component, inject, signal} from '@angular/core';
import {LeagueService} from '../../services/league.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable, switchMap, tap} from 'rxjs';
import {LeagueUserResponse, RiotUserResponse} from '../../interfaces/user-response.interface';
import {RankedTypePipe} from '../../pipes/ranked-type.pipe';
import {MatchResponse} from '../../interfaces/match-response.interface';
import {MatchInfoComponent} from '../../components/match-info/match-info.component';
import {FormUtils} from '../../utils/form-utils';
import {RankImagesPipe} from '../../pipes/rank-images.pipe';

@Component({
  selector: 'app-home-page',
  imports: [
    ReactiveFormsModule,
    RankedTypePipe,
    MatchInfoComponent,
    RankImagesPipe
  ],
  templateUrl: './home-page.component.html'
})

export class HomePageComponent {
  leagueService = inject(LeagueService)
  formBuilder = inject(FormBuilder)
  formUtils = FormUtils

  userInfo$: RiotUserResponse | null = null;
  buttonHasBeenTouched = false
  leagueUserInfo$ = signal<LeagueUserResponse[]>([]);
  matchList = signal<MatchResponse[]>([])
  pageCount = signal(0)

  puuid = signal<string>('');

  userForm = this.formBuilder.group({
    userName: ['', Validators.required],
    tagLine: ['', Validators.required],
  })

  onSubmit(username: string, tagline: string) {
    this.buttonHasBeenTouched = true

    if(this.userForm.invalid){
      this.userForm.markAllAsTouched()
      return;
    }else{
      this.matchList.set([])
      this.pageCount.set(0)

      this.leagueService.getPuuidByNameAndTagline(username, tagline).pipe(
        tap(resp => {
          this.userInfo$ = resp;
        }),
        switchMap(resp => {
          this.puuid.set(resp.puuid);
          return this.leagueService.getUserByPuuid(resp.puuid);
        })
      ).subscribe(
        resp => {

          this.leagueUserInfo$.set(resp);

          this.updateMatchList()
        }
      );
    }
  }

  chargeMoreMatches(){
    this.pageCount.set(this.pageCount()+1)

    this.updateMatchList()
  }

  updateMatchList(){
    this.leagueService.getMatchesIdsByPuuid(this.puuid(),this.pageCount()).pipe(
      tap(matchIds => {
        matchIds.forEach(id => {

          this.leagueService.getMatchById(id).subscribe(
            matchResp => {
              this.matchList.set([...this.matchList(), matchResp])
              return this.matchList().sort((match, nextMatch) => nextMatch.info.gameStartTimestamp - match.info.gameStartTimestamp)
            }
          );
        });
      })
    ).subscribe();
  }

  get protagonist(){
    return this.matchList()[0].info.participants.filter
    (participant => participant.puuid === this.puuid())[0]
  }

}
