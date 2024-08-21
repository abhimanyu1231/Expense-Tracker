import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  private authService = inject(AuthService);
  constructor(private fb: FormBuilder) {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
}

onSubmit(): void {
  if (this.loginForm.valid) {
   this.authService.login(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value);
  }
}

signInWithGoogle() {
  this.authService.googleSignIn();
}
}
