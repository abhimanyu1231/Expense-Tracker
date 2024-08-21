import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  email : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    this.auth.forgetpassword(this.email);
    this.email = '';
  }

}
