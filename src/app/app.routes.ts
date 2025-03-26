import {Routes} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AgentsPageComponent} from './pages/agents-page/agents-page.component';
import {BuddiesPageComponent} from './pages/buddies-page/buddies-page.component';
import {CompetitiveTiersPageComponent} from './pages/competitive-tiers-page/competitive-tiers-page.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AgentPageComponent} from './pages/agents-page/agent-page/agent-page.component';
import {RedirectBackGuard} from './guard/redirect-back.guard';
import {CtnlPageComponent} from './pages/ctnl-page/ctnl-page.component';

export const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      {
        path:'home',
        title: 'Home',
        component: HomePageComponent
      },
      {
        path:'agents',
        title: 'Agents',
        component: AgentsPageComponent
      },
      {
        path:'agent/:uuid',
        title: 'Agent',
        component: AgentPageComponent,
        canActivate: [RedirectBackGuard]
      },
      {
        path:'buddies',
        title: 'Buddies',
        component: BuddiesPageComponent
      },
      {
        path:'Competitive-tiers',
        title: 'Competitive Tiers',
        component: CompetitiveTiersPageComponent
      },
      {
        path:'ctnl',
        title: 'CTNL',
        component: CtnlPageComponent
      },
      {
        path:'**',
        redirectTo: 'home'
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
