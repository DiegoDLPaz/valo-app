import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {FormUtils} from '../../../utils/form-utils';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {
  formBuilder = inject(FormBuilder)
  authService = inject(AuthService)
  toastrService = inject(ToastrService)
  router = inject(Router)

  registerForm = this.formBuilder.group({
    fullName: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(4)]],
  })

  onRegister(email:string,password:string, name:string) {
    this.registerForm.markAllAsTouched()

    this.authService.register(email, password, name).subscribe({
      next: (response) => {
        this.toastrService.success('¡Se ha registrado con éxito!', 'Éxito');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.toastrService.error('Por favor compruebe que los campos están correctos', 'Error');
      },
    });
  }

  protected readonly formUtils = FormUtils;
}
