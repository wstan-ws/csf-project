import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { MerchantSignupComponent } from './merchant-signup/merchant-signup.component';
import { MerchantLoginComponent } from './merchant-login/merchant-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { BackendService } from './backend.service';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { MerchanthomepageComponent } from './merchanthomepage/merchanthomepage.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginStore } from './login.store';
import { UserEditProfileComponent } from './user-edit-profile/user-edit-profile.component';
import { UserChangePwComponent } from './user-change-pw/user-change-pw.component';
import { MerchantProfileComponent } from './merchant-profile/merchant-profile.component';
import { MerchantChangePwComponent } from './merchant-change-pw/merchant-change-pw.component';
import { MerchantEditProfileComponent } from './merchant-edit-profile/merchant-edit-profile.component';
import { UserSignupSuccessComponent } from './user-signup-success/user-signup-success.component';
import { MerchantSignupSuccessComponent } from './merchant-signup-success/merchant-signup-success.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'merchant-signup', component: MerchantSignupComponent},
  {path: 'user-login', component: UserLoginComponent},
  {path: 'merchant-login', component: MerchantLoginComponent},
  {path: 'user-homepage', component: UserhomepageComponent},
  {path: 'merchant-homepage', component: MerchanthomepageComponent},
  {path: 'user-profile/:username', component: UserProfileComponent},
  {path: 'user-edit-profile/:username', component: UserEditProfileComponent},
  {path: 'user-change-password/:username', component: UserChangePwComponent},
  {path: 'merchant-profile/:username', component: MerchantProfileComponent},
  {path: 'merchant-edit-profile/:username', component: MerchantEditProfileComponent},
  {path: 'merchant-change-password/:username', component: MerchantChangePwComponent},
  {path: 'user-signup-success', component: UserSignupSuccessComponent},
  {path: 'merchant-signup-success', component: MerchantSignupSuccessComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserSignupComponent,
    MerchantSignupComponent,
    MerchantLoginComponent,
    UserLoginComponent,
    UserhomepageComponent,
    MerchanthomepageComponent,
    UserProfileComponent,
    UserEditProfileComponent,
    UserChangePwComponent,
    MerchantProfileComponent,
    MerchantChangePwComponent,
    MerchantEditProfileComponent,
    UserSignupSuccessComponent,
    MerchantSignupSuccessComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [BackendService, LoginStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
