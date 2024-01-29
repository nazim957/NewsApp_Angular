import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { authGuard } from './services/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { WishlistComponent } from './components/user/wishlist/wishlist.component';
import { canDeactivateGuard } from './services/can-deactivate.guard';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'aboutus',
    component: AboutUsComponent,
    pathMatch: 'full'
  },
  {
    path: 'contactus',
    component: ContactUsComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
    canDeactivate:[canDeactivateGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'user',
    component:UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [authGuard] 
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    pathMatch: 'full',
    canActivate: [authGuard] 
  },
  {
    path:'forgot',
   component:ForgotpasswordComponent,
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
