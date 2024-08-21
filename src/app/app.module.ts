import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseComponent } from './components/expense/expense.component';
import { NgZorroModule } from './DemoNgZorroModule';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import{AngularFireModule} from '@angular/fire/compat';
import { environment } from './environments/environment';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { IncomeComponent } from './components/income/income.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainlayoutComponent,
    ExpenseComponent,
    ForgetPasswordComponent,
    VerifyEmailComponent,
    SidebarComponent,
    SubscriptionComponent,
    IncomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    NzMenuModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
