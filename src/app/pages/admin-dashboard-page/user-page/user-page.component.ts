import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {UsersService} from '../services/users.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {MatDialog} from '@angular/material/dialog';
import {
  ConfirmationDialogComponent
} from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-page',
  imports: [
    RouterLink
  ],
  templateUrl: './user-page.component.html'
})
export class UserPageComponent {
  usersService = inject(UsersService)
  activatedRoute = inject(ActivatedRoute)
  dialog = inject(MatDialog)
  router = inject(Router)

  id = this.activatedRoute.snapshot.paramMap.get('userId')

  userResource = rxResource({
    loader: () => this.usersService.getUserById(this.id!)
  })

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.deleteUserById(this.id!).subscribe(() => {
        });
        this.router.navigateByUrl('/admin/users')
      } else {
        console.log('User canceled the deletion');
      }
    });
  }
}
