import { Component , inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';


const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {

  fb = inject(FormBuilder);
  authServ = inject(AuthService);
  router = inject(Router)

    form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: passwordMatchValidator });

    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }
    get confirmPassword() { return this.form.get('confirmPassword'); }

    onSubmit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;

    this.authServ.createUserWithEmailAndPassword(email!, password!)
      .then(() => {
        this.router.navigate(['/home']); // redirige y el header ya mostrará logout
      })
      .catch((error) => {
        console.error(error.message);
      });
  }




}


// https://firebase.google.com/docs/auth/web/password-auth?hl=it
