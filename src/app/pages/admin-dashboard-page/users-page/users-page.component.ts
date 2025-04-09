import {Component, inject} from '@angular/core';
import {UsersService} from '../services/users.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {UsersListComponent} from '../components/users-list/users-list.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users-page',
  imports: [
    UsersListComponent,
    RouterLink
  ],
  templateUrl: './users-page.component.html'
})
export class UsersPageComponent {
  usersService = inject(UsersService)

  usersResource = rxResource({
    request:() => ({}),
    loader:() => {
      return this.usersService.getAllUsers()
    }
  })
}
