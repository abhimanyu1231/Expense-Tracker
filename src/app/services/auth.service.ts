import { Injectable } from '@angular/core';
import{AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GoogleAuthProvider} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  verified :any;
  constructor(private fireauth: AngularFireAuth, private router:Router,private notification: NzNotificationService) { }
  login(email:string, password:string){
  this.fireauth.signInWithEmailAndPassword(email,password).then(res=> {
    localStorage.setItem('token','true');
    if(res.user?.emailVerified==true){
    this.router.navigate(['/main']);
    this.notification.success(
      'Login Successful',
      'You have been successfully Login!'
    );
  }else{
    this.router.navigate(['/verify-email']);
  }
  },err => {
    console.log(email);
    console.log(password);
    
    this.notification.error(
      'Login Failed',
      err.message
    ); 
    this.router.navigate(['/login']);
  })
  }
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res=> {
      this.notification.success(
        'Registration Successful',
        'You have been successfully registered!'
      );
      this.router.navigate(['/login']);
      this.verifyemail(res.user);
    }, err => {
      this.notification.error(
        'Registration Failed',
        err.message
      ); 
    })
  }
  

  logout(){
    this.fireauth.signOut().then(()=> {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },err => {
      alert(err.message);
      this.router.navigate(['/main']);
    })
  }

  forgetpassword(email : string){
    this.fireauth.sendPasswordResetEmail(email).then(()=> {
      this.router.navigate(['/verify-email']);
    },err => {
      this.notification.error(
        'Something went wrong!',
        err.message
      ); 
    })
  }

  verifyemail(user:any){
   user.sendEmailVerification().then((res:any)=> {
    this.router.navigate(['/verify-email']);
  },(err:any) => {
    this.notification.error(
      'Something went wrong. Not able to send mail to your email.',
      err.message
    ); 
  })
}

googleSignIn() {
  return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

    this.router.navigate(['/main']);
    localStorage.setItem('token',JSON.stringify(res.user?.uid));

  }, err => {
    alert(err.message);
  })
}

}
