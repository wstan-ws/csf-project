import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { UserSignUpDetails } from '../models';
import { Observable, lastValueFrom } from 'rxjs';
import { WebSocketService } from '../websocket.service';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrl: './userhomepage.component.css'
})
export class UserhomepageComponent implements OnInit, OnDestroy {

  username!: string
  user$!: Observable<UserSignUpDetails>
  usernames!: string

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)
  private userSvc = inject(UsernameService)
  websocketSvc = inject(WebSocketService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.user$ = this.backendSvc.getUserDetails(this.username)
    this.websocketSvc.connectAndLoadServices(this.username)
    this.websocketSvc.subscribeServices(this.username)
    console.log(new Date().toISOString().split('T')[0])
    console.log(new Date().toISOString().split('T')[1].split('.')[0])
  }

  ngOnDestroy(): void {
    this.websocketSvc.disconnect()
  }

  profile(): void {
    this.router.navigate(['/user-profile', this.username])
  }

  convo(): void {
    this.router.navigate(['/user-conversations', this.username])
  }

  jobDetails(merchant: string): void {
    this.usernames = this.username + '-' + merchant
    const registerPortals = async() => {
      await lastValueFrom(this.backendSvc.getOngoingJob(this.usernames))
        .then(result => this.userSvc.setMerchantPostal(result.merchantPostalCode))
      console.log('set merchant postal')
      await lastValueFrom(this.backendSvc.getOngoingJob(this.usernames))
        .then(result => this.userSvc.setUserPostal(result.userPostalCode))
      console.log('set user postal')
      this.router.navigate(['/user-job-details', this.usernames])
    }
    registerPortals()
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.username = ''
      this.router.navigate(['/'])
    }
  }
}
