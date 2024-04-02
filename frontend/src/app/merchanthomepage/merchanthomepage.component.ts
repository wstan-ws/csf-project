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
    this.websocketSvc.subscribeRequests(this.username)
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

  accept(user: string): void {
    this.websocketSvc.acceptRequest(user, this.username)
  }

  reject(user: string): void {
    this.websocketSvc.rejectRequest(user, this.username)
  }

  jobDetails(user: string): void {
    const usernames = user + '-' + this.username
    const registerPortals = async() => {
      await lastValueFrom(this.backendSvc.getOngoingJob(usernames))
        .then(result => this.userSvc.setMerchantPostal(result.merchantPostalCode))
      await lastValueFrom(this.backendSvc.getOngoingJob(usernames))
        .then(result => this.userSvc.setUserPostal(result.userPostalCode))
      this.router.navigate(['/merchant-job-details', usernames])
    }
    registerPortals()
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
