import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {UsersService} from '../services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';
import {ToastrService} from 'ngx-toastr';
import {firstValueFrom} from 'rxjs';
import {User} from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-user-edit-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-edit-page.component.html'
})

export class UserEditPageComponent implements OnInit{
  userService = inject(UsersService)
  activatedRoute = inject(ActivatedRoute)
  fb = inject(FormBuilder)
  router = inject(Router)
  toastService = inject(ToastrService)

  id = this.activatedRoute.snapshot.paramMap.get('userId')

  user = signal<User>({
    id: '',
    email: '',
    name: '',
    rol: ''
  })

  userForm = this.fb.group({
    name: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email]],
    rol: ['',[Validators.required]],
  })

  ngOnInit() {
    this.userService.getUserById(this.id!).subscribe(user => {
      this.user.set(user)

      this.userForm.patchValue({
        name: this.user().name,
        email: this.user().email,
        rol: this.user().rol
      })
    })
  }

  onUpdate(name:string,email:string,rol:string){
    this.userForm.markAllAsTouched()

    this.userService.updateUserById(this.id!,name,email,rol).subscribe({
      next: (response) => {
        this.toastService.success('El usuario se ha actualizado correctamente', 'Éxito', {
          timeOut: 1000
        });
        this.router.navigate([`/admin/user/${this.id}`]);
      },
      error: (error) => {
        this.toastService.error('Por favor compruebe que los campos son correctos', 'Error al actualizar');
      },
    })
  }


  protected readonly formUtils = FormUtils;
}
