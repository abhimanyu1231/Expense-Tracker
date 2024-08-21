import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { IncomeComponent } from './components/income/income.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  {
    path: 'main',
    component: MainlayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'expense', component: ExpenseComponent },
      { path: 'income', component: IncomeComponent },
      { path: 'subscription', component: SubscriptionComponent },
      { path: '', redirectTo: 'expense', pathMatch: 'full' }  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
    
 }
