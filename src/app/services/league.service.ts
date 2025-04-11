import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environment/environment.development';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {LeagueUserResponse, RiotUserResponse} from '../interfaces/user-response.interface';
import {MatchResponse} from '../interfaces/match-response.interface';
import {TimelineDto} from '../interfaces/match-timeline-response.interface';
import {LeagueEntryDTO} from '../interfaces/league-entry.interface';
import {ChampionResponse} from '../interfaces/champion-response.interface';

const baseUrl = environment.leagueUrl;

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private http = inject(HttpClient);

  private puuidCache = new Map<string, RiotUserResponse>();
  private matchesIdCache = new Map<string, string[]>();
  private usersCache = new Map<string, LeagueUserResponse[]>();
  private matchesCache = new Map<string, MatchResponse>();

  lookedForUser!: RiotUserResponse;

  private customHeaders = new HttpHeaders().set('X-Riot-Token', environment.API_KEY);

  getRiotUserByNameAndTagline(username: string, tagline: string): Observable<RiotUserResponse> {
    const key = `${username.toLowerCase()}-${tagline.toLowerCase()}`;

    if (this.puuidCache.has(key)) {
      return of(this.puuidCache.get(key)!);
    }

    return this.http
      .get<RiotUserResponse>(
        `${baseUrl}/accounts/by-riot-id/${username}/${tagline}`,
        {headers: this.customHeaders}
      )
      .pipe(tap((resp) => this.puuidCache.set(key, resp)));
  }

  getRiotUserByPuuid(puuid: string): Observable<RiotUserResponse> {
    return this.http
      .get<RiotUserResponse>(`${baseUrl}/accounts/by-puuid/${puuid}`, {headers: this.customHeaders}).pipe(
        tap(resp => console.log('Service response:', resp)),
        catchError(err => {
          console.error('Error in service:', err);
          return throwError(() => err);
        })
      );
  }

  getUserByPuuid(puuid: string): Observable<LeagueUserResponse[]> {
    if (this.usersCache.has(puuid)) {
      return of(this.usersCache.get(puuid)!);
    }

    return this.http
      .get<LeagueUserResponse[]>(
        `https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
        {headers: this.customHeaders}
      )
      .pipe(tap((resp) => this.usersCache.set(puuid, resp)));
  }

  getAllMatchesByPuuid(puuid:string): Observable<string[]>{
    return this.http.get<string[]>(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`
      ,{headers: this.customHeaders,
        params:{
          count: 10,
        }})
  }

  getMatchesIdsByPuuid(puuid: string, page: number): Observable<string[]> {
    const key = `${puuid}-${page}`;

    if (this.matchesIdCache.has(key)) {
      console.log('FROM CACHE');
      return of(this.matchesIdCache.get(key)!);
    }

    return this.http
      .get<string[]>(
        `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,
        {
          headers: this.customHeaders,
          params: {
            start: page * 10,
            count: 10,
          },
        }
      )
      .pipe(tap((resp) => this.matchesIdCache.set(key, resp)));
  }

  getMatchById(matchId: string): Observable<MatchResponse> {
    if (this.matchesCache.has(matchId)) {
      return of(this.matchesCache.get(matchId)!);
    }

    return this.http
      .get<MatchResponse>(
        `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,
        {headers: this.customHeaders}
      )
      .pipe(tap((resp) => this.matchesCache.set(matchId, resp)));
  }

  getMatchTimeLineById(matchId: string): Observable<TimelineDto> {
    return this.http.get<TimelineDto>(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`,
      {headers: this.customHeaders})
  }

  getRankInfo(queue: string, tier: string, division: string): Observable<LeagueEntryDTO[]> {
    return this.http.get<LeagueEntryDTO[]>(`https://euw1.api.riotgames.com/lol/league-exp/v4/entries/${queue}/${tier}/${division}`, {headers: this.customHeaders})
  }

  getChamps(){
    return this.http.get<ChampionResponse>(`https://ddragon.leagueoflegends.com/cdn/14.8.1/data/es_ES/champion.json`)
  }

}
