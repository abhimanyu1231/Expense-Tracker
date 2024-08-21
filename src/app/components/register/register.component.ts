import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  private authService = inject(AuthService);
   constructor(private fb: FormBuilder) {
     this.registerForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(8)]],
       confirmPassword: ['', Validators.required]
     }, {
      validator: MustMatch('password', 'confirmPassword') 
    });
   }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onSubmit(){
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.get('email')?.value,this.registerForm.get('password')?.value);
    }
   
  }
}
