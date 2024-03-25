import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { UsernameService } from '../username.service';
import { UserSignUpDetails } from '../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrl: './userhomepage.component.css'
})
export class UserhomepageComponent implements OnInit {

  username!: string
  user$!: Observable<UserSignUpDetails>

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.user$ = this.backendSvc.getUserDetails(this.username)
  }

  profile(): void {
    this.router.navigate(['/user-profile', this.username])
  }

  convo(): void {
    this.router.navigate(['/user-conversations', this.username])
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.username = ''
      this.router.navigate(['/'])
    }
  }
}
