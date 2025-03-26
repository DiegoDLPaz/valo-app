import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment/environment.development';
import {Observable, of, tap} from 'rxjs';
import {LeagueUserResponse, RiotUserResponse} from '../interfaces/user-response.interface';
import {MatchResponse} from '../interfaces/match-response.interface';

const baseUrl = environment.leagueUrl

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private http = inject(HttpClient)

  private puuidCache =new Map<string,RiotUserResponse>
  private matchesIdCache = new Map<string, string[]>
  private usersCache =new Map<string,LeagueUserResponse[]>
  private matchesCache = new Map<string,MatchResponse>

  getPuuidByNameAndTagline(username:string, tagline: string): Observable<RiotUserResponse>{
    const key = `${username.toLowerCase()}-${tagline.toLowerCase()}`

    if(this.puuidCache.has(key)){
      return of(this.puuidCache.get(key)!)
    }

    return this.http.get<RiotUserResponse>(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${username}/${tagline}`).pipe(
      tap(resp => this.puuidCache.set(key,resp))
    )
  }

  getUserByPuuid(puuid: string) : Observable<LeagueUserResponse[]>{

    if(this.usersCache.has(puuid)){
      return of(this.usersCache.get(puuid)!)
    }

    return this.http.get<LeagueUserResponse[]>(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`).pipe(
      tap(resp => this.usersCache.set(puuid,resp))
    )
  }

  getMatchesIdsByPuuid(puuid:string, page: number): Observable<string[]>{

    const key = `${puuid}-${page}`

    if(this.matchesIdCache.has(key)){
      console.log("FROM CACHE")
      return of(this.matchesIdCache.get(key)!)
    }

    return this.http.get<string[]>(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,{
      params: {
        start: page*10,
        count: 10,
      }
    }).pipe(
      tap(resp => this.matchesIdCache.set(key,resp))
    )
  }

  getMatchById(matchId: string): Observable<MatchResponse>{

    if(this.matchesCache.has(matchId)){
      return of(this.matchesCache.get(matchId)!)
    }

    return this.http.get<MatchResponse>(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`).pipe(
      tap(resp => this.matchesCache.set(matchId,resp))
    )
  }

}
