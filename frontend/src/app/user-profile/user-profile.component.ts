import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { UserSignUpDetails } from '../models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  userDetails$!: Observable<UserSignUpDetails>
  username: string = ''

  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.params['username']
    this.userDetails$ = this.backendSvc.getUserDetails(username)
    this.username = username
    this.backendSvc.getUserDetails(username)
      .subscribe(result => this.backendSvc.setUser(result))
  }

  back(): void {
    this.router.navigate(['/user-homepage', this.username])
  }

  edit(): void {
    this.router.navigate(['/user-edit-profile', this.username])
  }

  changepw(): void {
    this.router.navigate(['/user-change-password', this.username])
  }
}
