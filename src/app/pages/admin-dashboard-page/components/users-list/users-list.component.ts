import {Component, input} from '@angular/core';
import {User} from '../../../../auth/interfaces/user.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [
    RouterLink
  ],
  templateUrl: './users-list.component.html'
})
export class UsersListComponent {
  users = input.required<User[]>()
}
