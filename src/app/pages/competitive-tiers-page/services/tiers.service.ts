import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';
import {Tier, TiersEpisode, TiersResponse} from '../interfaces/tiers-response.interface';
import {Buddie, BuddieResponse} from '@buddies/interfaces/buddie-response.interface';
import {environment} from '@environment/environment';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class TiersService {
  private http = inject(HttpClient)
  private tiersCache =new Map<string,TiersEpisode>;

  getAllTiersFromAllEpisodes(language?: string): Observable<TiersEpisode>{
    let lan :string = 'es-ES';

    if(language){
      lan = language
      if(this.tiersCache.has(lan)){
        return of(this.tiersCache.get(lan)!)
      }
    }

    return this.http.get<TiersResponse>(`${baseUrl}/competitivetiers`,{
      params: {
        language: lan,
      }
    }).pipe(
      map(response => response.data[0]),
      tap(resp => this.tiersCache.set(lan,resp))
    )
  }
}
