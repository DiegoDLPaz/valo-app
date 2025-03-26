import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';
import {environment} from '@environment/environment';
import {Buddie, BuddieResponse} from '../interfaces/buddie-response.interface';
import {Agent} from '@agents/interfaces/agent-response.interface';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class BuddiesService {
  private http = inject(HttpClient)
  private buddiesCache =new Map<string,Buddie[]>;

  getAllBuddies(language? :string ) : Observable<Buddie[]>{
    let lan :string = 'es-ES';

    if(language){
      lan = language
    }

    if(this.buddiesCache.has(lan)){
      return of(this.buddiesCache.get(lan)!)
    }

    return this.http.get<BuddieResponse>(`${baseUrl}/buddies`,{
      params: {
        language: lan,
      }
    }).pipe(
      map(response => response.data),
      tap((resp)=> this.buddiesCache.set(lan,resp))
    )
  }

}
