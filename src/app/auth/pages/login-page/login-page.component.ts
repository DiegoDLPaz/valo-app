import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  formBuilder = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  toastService = inject(ToastrService)

  loginForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(4)]],
  })

  onLogin(email:string, password:string){
    this.loginForm.markAllAsTouched()

    this.authService.login(email,password).subscribe({
      next: (response) => {
        this.toastService.success('Has iniciado sesión correctamente', 'Éxito', {
          timeOut: 1000
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastService.error('Por favor compruebe los credenciales', 'Error al iniciar la sesión');
      },
    })
  }

  protected readonly formUtils = FormUtils;
}
