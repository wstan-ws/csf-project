import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-merchanthomepage',
  templateUrl: './merchanthomepage.component.html',
  styleUrl: './merchanthomepage.component.css'
})
export class MerchanthomepageComponent implements OnInit {

  username!: string
  activity: string = 'Inactive'
  flag: boolean = false

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
  }

  profile(): void {
    this.router.navigate(['/merchant-profile', this.username])
  }

  switch(): void {
    if (this.flag) {
      this.flag = false
    } else {
      this.flag = true
    }

    if (this.flag) {
      this.activity = 'Active'
      const active: boolean = true
      this.backendSvc.setActive(this.username, active)
        .then()
    } else {
      this.activity = 'Inactive'
      const active: boolean = false
      this.backendSvc.setInactive(this.username, active)
        .then()
    }
  }

  logout(): void {
    this.flag = false
    this.activity = 'Inactive'
    const active: boolean = false
    this.backendSvc.setInactive(this.username, active)
        .then()
    this.username = ''
    this.router.navigate(['/'])
  }

}
