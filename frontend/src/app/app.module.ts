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

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'merchant-signup', component: MerchantSignupComponent},
  {path: 'user-login', component: UserLoginComponent},
  {path: 'merchant-login', component: MerchantLoginComponent},
  {path: 'user-homepage', component: UserhomepageComponent},
  {path: 'merchant-homepage', component: MerchanthomepageComponent},
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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
