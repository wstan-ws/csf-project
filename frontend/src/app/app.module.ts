import { NgModule, isDevMode } from '@angular/core';
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
import { UserEditProfileComponent } from './user-edit-profile/user-edit-profile.component';
import { UserChangePwComponent } from './user-change-pw/user-change-pw.component';
import { MerchantProfileComponent } from './merchant-profile/merchant-profile.component';
import { MerchantChangePwComponent } from './merchant-change-pw/merchant-change-pw.component';
import { MerchantEditProfileComponent } from './merchant-edit-profile/merchant-edit-profile.component';
import { UserSignupSuccessComponent } from './user-signup-success/user-signup-success.component';
import { MerchantSignupSuccessComponent } from './merchant-signup-success/merchant-signup-success.component';
import { SearchElectricianComponent } from './search-electrician/search-electrician.component';
import { ElectricianDetailsComponent } from './electrician-details/electrician-details.component';
import { SearchPlumberComponent } from './search-plumber/search-plumber.component';
import { PlumberDetailsComponent } from './plumber-details/plumber-details.component';
import { SearchAirconComponent } from './search-aircon/search-aircon.component';
import { AirconDetailsComponent } from './aircon-details/aircon-details.component';
import { UsernameService } from './username.service';
import { UserChatComponent } from './user-chat/user-chat.component';
import { WebSocketService } from './websocket.service';
import { MerchantChatComponent } from './merchant-chat/merchant-chat.component';
import { MerchantConversationsComponent } from './merchant-conversations/merchant-conversations.component';
import { UserConversationsComponent } from './user-conversations/user-conversations.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AboutUsComponent } from './about-us/about-us.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MerchantSignup2Component } from './merchant-signup-2/merchant-signup-2.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { UserJobDetailsComponent } from './user-job-details/user-job-details.component';
import { MerchantJobDetailsComponent } from './merchant-job-details/merchant-job-details.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReviewComponent } from './review/review.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { MerchantHistoryComponent } from './merchant-history/merchant-history.component';
import { FindElectricianComponent } from './find-electrician/find-electrician.component';
import { FindAirconComponent } from './find-aircon/find-aircon.component';
import { FindPlumberComponent } from './find-plumber/find-plumber.component';
import { StoreModule } from '@ngrx/store';
import { merchantReducer } from './store/merchant.reducer';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MerchantReviewsComponent } from './merchant-reviews/merchant-reviews.component';
import { UserCancelHistoryComponent } from './user-cancel-history/user-cancel-history.component';
import { MerchantCancelHistoryComponent } from './merchant-cancel-history/merchant-cancel-history.component';
import { SearchElectricianRatingComponent } from './search-electrician-rating/search-electrician-rating.component';
import { SearchAirconRatingComponent } from './search-aircon-rating/search-aircon-rating.component';
import { SearchPlumberRatingComponent } from './search-plumber-rating/search-plumber-rating.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'merchant-signup', component: MerchantSignupComponent},
  {path: 'merchant-signup-2', component: MerchantSignup2Component},
  {path: 'user-login', component: UserLoginComponent},
  {path: 'merchant-login', component: MerchantLoginComponent},
  {path: 'user-homepage/:username', component: UserhomepageComponent},
  {path: 'merchant-homepage/:username', component: MerchanthomepageComponent},
  {path: 'user-profile/:username', component: UserProfileComponent},
  {path: 'user-edit-profile/:username', component: UserEditProfileComponent},
  {path: 'user-change-password/:username', component: UserChangePwComponent},
  {path: 'merchant-profile/:username', component: MerchantProfileComponent},
  {path: 'merchant-edit-profile/:username', component: MerchantEditProfileComponent},
  {path: 'merchant-change-password/:username', component: MerchantChangePwComponent},
  {path: 'user-signup-success', component: UserSignupSuccessComponent},
  {path: 'merchant-signup-success', component: MerchantSignupSuccessComponent},
  {path: 'electrician', component: SearchElectricianComponent},
  {path: 'electrician-details/:username', component: ElectricianDetailsComponent},
  {path: 'plumber', component: SearchPlumberComponent},
  {path: 'plumber-details/:username', component: PlumberDetailsComponent},
  {path: 'aircon', component: SearchAirconComponent},
  {path: 'aircon-details/:username', component: AirconDetailsComponent},
  {path: 'userchat/:usernames', component: UserChatComponent},
  {path: 'merchantchat/:usernames', component: MerchantChatComponent},
  {path: 'user-conversations/:username', component: UserConversationsComponent},
  {path: 'merchant-conversations/:username', component: MerchantConversationsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'user-job-details/:usernames', component: UserJobDetailsComponent},
  {path: 'merchant-job-details/:usernames', component: MerchantJobDetailsComponent},
  {path: 'review/:usernames', component: ReviewComponent},
  {path: 'user-history/:username', component: UserHistoryComponent},
  {path: 'merchant-history/:username', component: MerchantHistoryComponent},
  {path: 'search-electricians', component: FindElectricianComponent},
  {path: 'search-aircons', component: FindAirconComponent},
  {path: 'search-plumbers', component: FindPlumberComponent},
  {path: 'user-booking/:usernames', component: UserBookingComponent},
  {path: 'merchant-reviews/:username', component: MerchantReviewsComponent},
  {path: 'user-cancel-history/:username', component: UserCancelHistoryComponent},
  {path: 'merchant-cancel-history/:username', component: MerchantCancelHistoryComponent},
  {path: 'search-electrician-rating', component: SearchElectricianRatingComponent},
  {path: 'search-aircon-rating', component: SearchAirconRatingComponent},
  {path: 'search-plumber-rating', component: SearchPlumberRatingComponent},
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
    SearchElectricianComponent,
    ElectricianDetailsComponent,
    SearchPlumberComponent,
    PlumberDetailsComponent,
    SearchAirconComponent,
    AirconDetailsComponent,
    UserChatComponent,
    MerchantChatComponent,
    MerchantConversationsComponent,
    UserConversationsComponent,
    AboutUsComponent,
    MerchantSignup2Component,
    UserJobDetailsComponent,
    MerchantJobDetailsComponent,
    ReviewComponent,
    UserHistoryComponent,
    MerchantHistoryComponent,
    FindElectricianComponent,
    FindAirconComponent,
    FindPlumberComponent,
    UserBookingComponent,
    MerchantReviewsComponent,
    UserCancelHistoryComponent,
    MerchantCancelHistoryComponent,
    SearchElectricianRatingComponent,
    SearchAirconRatingComponent,
    SearchPlumberRatingComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    GoogleMapsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forRoot({merchantDetails: merchantReducer}, {}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [BackendService, UsernameService, WebSocketService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
