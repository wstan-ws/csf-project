import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable, lastValueFrom } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { UsernameService } from '../username.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-merchanthomepage',
  templateUrl: './merchanthomepage.component.html',
  styleUrl: './merchanthomepage.component.css'
})
export class MerchanthomepageComponent implements OnInit, OnDestroy {

  activityForm!: FormGroup
  username!: string
  isChecked!: boolean
  status!: string
  merchant$!: Observable<MerchantSignUpDetails>
  chatList: string[] = []

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)
  private userSvc = inject(UsernameService)
  private fb = inject(FormBuilder)
  websocketSvc = inject(WebSocketService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.merchant$ = this.backendSvc.getMerchantDetails(this.username)
    this.websocketSvc.connectAndLoadRequests(this.username)
      .then(() => {
        this.websocketSvc.subscribeRequests(this.username)
        this.websocketSvc.subscribeNotification(this.username)
        this.websocketSvc.subscribeCancel()
      })
      .catch(error => {
        console.error('Websocket connection failed:', error)
      })
    this.isChecked = this.userSvc.getActivity();
    if (this.isChecked) {
      this.status = 'Active'
    } else if (!this.isChecked) {
      this.status = 'Inactive'
    } else {
      this.isChecked = false
      this.status = 'Inactive'
    }
    this.activityForm = this.createActivityForm()
    
  }

  ngOnDestroy(): void {
    this.websocketSvc.disconnect()
  }

  profile(): void {
    this.router.navigate(['/merchant-profile', this.username])
  }

  convo(): void {
    this.router.navigate(['/merchant-conversations', this.username])
  }

  onChange(event: MatSlideToggleChange): void {
    this.isChecked = !this.isChecked
    this.userSvc.setActivity(this.isChecked)
    const active: boolean = this.isChecked
    this.backendSvc.setActive(this.username, active).then()
    if (this.isChecked === true) {
      this.status = 'Active'
    } else {
      this.status = 'Inactive'
    }
  }

  accept(user: string, type: string, scheduledDate: string, scheduledTime: string, jobId: string): void {
    this.websocketSvc.acceptRequest(user, this.username, type, scheduledDate, scheduledTime, jobId)
  }

  reject(user: string): void {
    this.websocketSvc.rejectRequest(user, this.username)
  }

  jobDetails(jobId: string, user: string): void {
    const usernames = user + '-' + this.username
    const registerPostals = async() => {
      await lastValueFrom(this.backendSvc.getOngoingJob(jobId))
        .then(result => this.userSvc.setMerchantPostal(result.merchantPostalCode))
      await lastValueFrom(this.backendSvc.getOngoingJob(jobId))
        .then(result => this.userSvc.setUserPostal(result.userPostalCode))
      this.userSvc.setJobId(jobId)
      this.router.navigate(['/merchant-job-details', usernames])
    }
    registerPostals()
  }

  reviews(): void {
    this.router.navigate(['/merchant-reviews', this.username])
  }

  history(): void {
    this.router.navigate(['/merchant-history', this.username])
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.isChecked = false
      const active: boolean = false
      this.backendSvc.setActive(this.username, active).then()
      this.userSvc.setActivity(false)
      this.username = ''
      this.router.navigate(['/'])
    }
  }

  private createActivityForm(): FormGroup {
    return this.fb.group({
      activity: this.fb.control<Boolean>(this.isChecked)
    })
  }
}
