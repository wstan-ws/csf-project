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
  user!: UserSignUpDetails

  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.params['username']
    this.userDetails$ = this.backendSvc.getUserDetails(username)
    this.userDetails$.subscribe(result => this.user = result)
    this.username = username
  }

  back(): void {
    this.router.navigate(['/user-homepage'])
  }

  edit(): void {
    this.backendSvc.setUser(this.user)
    this.router.navigate(['/user-edit-profile', this.username])
  }

  changepw(): void {
    this.router.navigate(['/user-change-password', this.username])
  }
}
