import {Component, computed, HostListener, inject} from '@angular/core';
import {AgentsService} from '../services/agents.service';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Router} from '@angular/router';
import {AbilitiesCarouselComponent} from '../components/abilities-carousel/abilities-carousel.component';

@Component({
  selector: 'app-agent-page',
  imports: [
    AbilitiesCarouselComponent
  ],
  templateUrl: './agent-page.component.html'
})
export class AgentPageComponent {
  agentsService = inject(AgentsService)
  activatedRoute = inject(ActivatedRoute)

  agentUuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';

  agentResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.agentsService.getAgentByUuid({},this.agentUuid)
    }
  })

}
