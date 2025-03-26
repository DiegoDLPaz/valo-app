import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {AgentsService} from './services/agents.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {AgentsListComponent} from './components/agents-list/agents-list.component';
import {Agent} from './interfaces/agent-response.interface';

export type Order = "Nombre" | "Rol" | "Base" | "Default" | ""

@Component({
  selector: 'app-agents-page',
  imports: [
    AgentsListComponent
  ],
  templateUrl: './agents-page.component.html'
})

export class AgentsPageComponent implements OnInit{
  agentsService = inject(AgentsService)
  orderBy = signal<Order>("")

  defaultList: Agent[] = []

  agentsResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.agentsService.getAllAgents({})
    }
  })

  ngOnInit(): void {
    if(this.agentsResource.hasValue()){
      this.defaultList = this.agentsResource.value()
    }else{
      setTimeout(() => {
        this.ngOnInit()
      }, 50)
    }
  }

  orderTable(order: Order) {

    if (order === "Nombre") {
      this.agentsResource.value()?.sort((agent, nextAgent) => agent.displayName.localeCompare(nextAgent.displayName))
    }

    if (order === "Rol") {
      this.agentsResource.value()?.sort((agent, nextAgent) => agent.role!.displayName.localeCompare(nextAgent.role!.displayName))
    }

    if (order === "Base") {
      this.agentsResource.value()?.sort((agent, nextAgent) => (nextAgent.isBaseContent ? 1 : 0) - (agent.isBaseContent ? 1 : 0))
    }

    if(order === "Default"){
      this.agentsResource.set(this.defaultList)
    }

    this.orderBy.set(order)
  }

  onChange(text: string){
    this.agentsResource.set(this.defaultList)

    if(text){
      this.agentsResource.set(this.agentsResource.value()!.filter(
        (agent) => agent.displayName.toLowerCase().includes(text.toLowerCase())
      ))
    }else {
      this.agentsResource.set(this.defaultList)
    }
  }


}
