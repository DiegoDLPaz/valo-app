import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment/environment';
import {Agent, AgentResponse, AgentsResponse} from '../interfaces/agent-response.interface';
import {map, Observable, of, tap} from 'rxjs';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

const baseUrl = environment.baseUrl

interface Options {
  language? : string,
  isPlayableCharacter?: boolean
}

@Injectable({
  providedIn: 'root'
})

export class AgentsService {
  private http = inject(HttpClient)
  private agentsCache =new Map<string,Agent[]>;
  private agentCache =new Map<string,Agent>;



  getAllAgents(options: Options) : Observable<Agent[]>{
    const {language = "es-ES", isPlayableCharacter = true} = options!

    const key = `${language}-${isPlayableCharacter}`

    if (this.agentsCache.has(key)){
      return of(this.agentsCache.get(key)!)
    }

    return this.http.get<AgentsResponse>(`${baseUrl}/agents`,{
      params: {
        language: language,
        isPlayableCharacter: isPlayableCharacter
      }
    }).pipe(
      map(response => response.data),
      tap((resp) => this.agentsCache.set(key,resp))
    )
  }

  getAgentByUuid(options: Options, uuid: string) : Observable<Agent>{
    const {language = "es-ES", isPlayableCharacter = true} = options!

    const key = uuid

    if(this.agentCache.has(key)){
      console.log("Getting data from Cache")
      return of(this.agentCache.get(key)!)
    }

    return this.http.get<AgentResponse>(`${baseUrl}/agents/${uuid}`,{
      params: {
        language: language,
        isPlayableCharacter: isPlayableCharacter
      }
    }).pipe(
      map(response => response.data),
      tap(
        resp => this.agentCache.set(key,resp)
      ),
      tap( ()=> (console.log("Getting data from server")))
    )
  }


}
