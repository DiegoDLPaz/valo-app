import {Component, inject, OnInit, signal} from '@angular/core';
import {LeagueService} from '../../services/league.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { switchMap, tap} from 'rxjs';
import {LeagueUserResponse, RiotUserResponse} from '@interfaces/user-response.interface';
import {MatchResponse} from '@interfaces/match-response.interface';
import {MatchInfoComponent} from './components/match-info/match-info.component';
import {FormUtils} from '../../utils/form-utils';
import {HomeUserinfoComponent} from './components/home-userinfo/home-userinfo.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ReactiveFormsModule,
    MatchInfoComponent,
    HomeUserinfoComponent
  ],
  templateUrl: './home-page.component.html'
})

export class HomePageComponent implements OnInit {
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
    userName: [localStorage.getItem('userName') || '', Validators.required],
    tagLine: [localStorage.getItem('tagLine') || '', Validators.required],
  })

  ngOnInit() {

    if (this.leagueService.lookedForUser) {
      this.onSubmit(this.leagueService.lookedForUser.gameName, this.leagueService.lookedForUser.tagLine)
      return;
    }

    if (localStorage.getItem('userName') && localStorage.getItem('tagLine')) {
      this.onSubmit(this.userForm.get('userName')?.value!, this.userForm.get('tagLine')?.value!)
    }

  }

  onSubmit(username: string, tagline: string) {
    this.buttonHasBeenTouched = true

    localStorage.setItem('userName', username);
    localStorage.setItem('tagLine', tagline);

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
      return;
    } else {
      this.matchList.set([])
      this.pageCount.set(0)

      this.userForm.patchValue({
        userName: username,
        tagLine: tagline
      })

      this.leagueService.getRiotUserByNameAndTagline(username, tagline).pipe(
        tap(resp => {
          this.userInfo$ = resp;

          this.leagueService.lookedForUser = resp
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

  chargeMoreMatches() {
    this.pageCount.set(this.pageCount() + 1)

    this.updateMatchList()
  }

  updateMatchList() {
    this.leagueService.getMatchesIdsByPuuid(this.puuid(), this.pageCount()).pipe(
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

  get protagonist() {
    return this.matchList()[0].info.participants.filter
    (participant => participant.puuid === this.puuid())[0]
  }

}
