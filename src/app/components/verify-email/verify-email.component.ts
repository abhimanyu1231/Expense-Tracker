import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private notification: NzNotificationService
  ) {
   
  }
  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        user.reload().then(() => {
          if (user.emailVerified) {
            this.router.navigate(['/main']); 
          } else {
            this.notification.warning(
              'Email not verified',
              'Please verify your email before accessing the main page.'
            );
          }
        });
      }
    });
  }
 

}