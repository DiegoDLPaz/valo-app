import {Component, input} from '@angular/core';
import {AgentsPipe} from '../../pipes/agents.pipe';
import {RouterLink} from '@angular/router';
import {Agent} from '../../interfaces/agent-response.interface';

@Component({
  selector: 'app-agents-list',
  imports: [
    AgentsPipe,
    RouterLink
  ],
  templateUrl: './agents-list.component.html'
})
export class AgentsListComponent {
  agents = input.required<Agent[]>()
}
