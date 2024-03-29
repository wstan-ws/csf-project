import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { UserSignUpDetails } from '../models';
import { Observable } from 'rxjs';
import { WebSocketService } from '../websocket.service';

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
  websocketSvc = inject(WebSocketService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.user$ = this.backendSvc.getUserDetails(this.username)
    this.websocketSvc.connectAndLoadServices(this.username)
    this.websocketSvc.subscribeServices(this.username)
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
    this.router.navigate(['/user-job-details', this.usernames])
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.username = ''
      this.router.navigate(['/'])
    }
  }
}
