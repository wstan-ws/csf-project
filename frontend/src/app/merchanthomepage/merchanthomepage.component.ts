import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-merchanthomepage',
  templateUrl: './merchanthomepage.component.html',
  styleUrl: './merchanthomepage.component.css'
})
export class MerchanthomepageComponent implements OnInit {

  username!: string
  flag!: Boolean
  status!: string

  test$!: Observable<MerchantSignUpDetails>

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)
  private userSvc = inject(UsernameService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.flag = this.userSvc.getActivity();
    if (this.flag) {
      this.status = 'Active'
    } else if (!this.flag) {
      this.status = 'Inactive'
    } else {
      this.status = ''
    }
  }

  profile(): void {
    this.router.navigate(['/merchant-profile', this.username])
  }

  active(): void {
    const active: boolean = true
    this.backendSvc.setActive(this.username, active).then()
    this.userSvc.setActivity(true)
    this.status = 'Active'
  }

  inactive(): void {
    const active: boolean = false
    this.backendSvc.setInactive(this.username, active).then()
    this.userSvc.setActivity(false)
    this.status = 'Inactive'
  }

  logout(): void {
    this.flag = false
    const active: boolean = false
    this.backendSvc.setInactive(this.username, active).then()
    this.userSvc.setActivity(false)
    this.username = ''
    this.router.navigate(['/'])
  }

}
