import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { UserSignUpDetails } from '../models';
import { Observable, last, lastValueFrom } from 'rxjs';
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
  chatList: string[] = []

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
    const getAllChats = async() => {
      await lastValueFrom(this.backendSvc.getConversationsUser(this.username))
        .then(result => result.forEach(r => {
          const usernames = r.user + '-' + r.merchant
          this.chatList.push(usernames)
        }))
      for (let i = 0; i < this.chatList.length; i++) {
        this.websocketSvc.subscribeUserNotification(this.chatList[i], this.username)
      }
    }
    getAllChats()
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
      await lastValueFrom(this.backendSvc.getOngoingJob(this.usernames))
        .then(result => this.userSvc.setUserPostal(result.userPostalCode))
      this.router.navigate(['/user-job-details', this.usernames])
    }
    registerPortals()
  }

  history(): void {
    this.router.navigate(['/user-history', this.username])
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.username = ''
      this.router.navigate(['/'])
    }
  }
}
