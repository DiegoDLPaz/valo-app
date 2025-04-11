import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AgentsPageComponent } from './pages/agents-page/agents-page.component';
import { BuddiesPageComponent } from './pages/buddies-page/buddies-page.component';
import { CompetitiveTiersPageComponent } from './pages/competitive-tiers-page/competitive-tiers-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgentPageComponent } from '@agents/pages/agent-page/agent-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import {AdminDashboardPageComponent} from './pages/admin-dashboard-page/admin-dashboard-page.component';
import {UsersPageComponent} from './pages/admin-dashboard-page/users-page/users-page.component';
import {UserPageComponent} from './pages/admin-dashboard-page/user-page/user-page.component';
import {NotAuthenticatedGuard} from './auth/guards/not-authenticated.guard';
import {IsAdminGuard} from './auth/guards/is-admin.guard';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {UserEditPageComponent} from './pages/admin-dashboard-page/user-edit-page/user-edit-page.component';
import {KeyboardPageComponent} from './pages/keyboard-page/keyboard-page.component';
import {MatchComponent} from './pages/home-page/pages/match/match.component';
import {ChampionInfoComponent} from './pages/home-page/pages/champion-info/champion-info.component';
import {ChampPageComponent} from './pages/champ-page/champ-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        title: 'Login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        title: 'Register',
        component: RegisterPageComponent
      }
    ],
    canMatch: [NotAuthenticatedGuard]
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfilePageComponent,
  },
  {
    path: 'champ-info/:champId',
    title: 'Champ',
    component: ChampionInfoComponent
  },
  {
    path: 'match/:id',
    title: 'Match',
    component: MatchComponent
  },
  {
    path: 'admin',
    component: AdminDashboardPageComponent,
    children: [
      {
        path: 'users',
        title: 'Users',
        component: UsersPageComponent
      },
      {
        path: 'user/:userId',
        title: 'User',
        component: UserPageComponent
      },
      {
        path: 'user/edit/:userId',
        title: 'User Edit',
        component: UserEditPageComponent
      },
      {
        path: '**',
        redirectTo: 'users'
      }
    ],
    canMatch: [IsAdminGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomePageComponent
      },
      {
        path: 'agents',
        title: 'Agents',
        component: AgentsPageComponent,
      },
      {
        path: 'agent/:uuid',
        title: 'Agent',
        component: AgentPageComponent
      },
      {
        path: 'buddies',
        title: 'Buddies',
        component: BuddiesPageComponent
      },
      // {
      //   path: 'competitive-tiers',
      //   title: 'Competitive Tiers',
      //   component: CompetitiveTiersPageComponent
      // },
      {
        path: 'champ',
        title: 'Champs',
        component: ChampPageComponent,
      },
      {
        path: 'champ-info',
        title: 'Champ info',
        component: ChampionInfoComponent,
      },
      // {
      //   path: 'keyboard',
      //   title: 'Keyboard',
      //   component: KeyboardPageComponent
      // },
      {
        path: '**',
        redirectTo: 'home'
      },
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];
