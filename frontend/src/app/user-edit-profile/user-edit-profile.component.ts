import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { UserSignUpDetails } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrl: './user-edit-profile.component.css'
})
export class UserEditProfileComponent implements OnInit {

  userEditForm!: FormGroup
  user!: UserSignUpDetails

  private fb = inject(FormBuilder)
  private backendSvc = inject(BackendService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private userSvc = inject(UsernameService)

  ngOnInit(): void {
    this.user = this.userSvc.getUser()
    this.userEditForm = this.createUserEditForm()
  }

  editForm(): void {
    const edit = this.userEditForm.value
    const username = this.activatedRoute.snapshot.params['username']
    this.backendSvc.editUserDetails(username, edit).subscribe()
    alert('Profile Updated')
    this.router.navigate(['/user-profile', username])
  }

  cancel(): void {
    const username = this.activatedRoute.snapshot.params['username']
    this.router.navigate(['/user-profile', username])
  }

  private createUserEditForm(): FormGroup {
    return this.fb.group({
      firstName: this.fb.control<string>(this.user.firstName, [ Validators.required ]),
      lastName: this.fb.control<string>(this.user.lastName, [ Validators.required ]),
      email: this.fb.control<string>(this.user.email, [ Validators.required, Validators.email ]),
      phoneNumber: this.fb.control<string>(this.user.phoneNumber, [ Validators.required, Validators.pattern(/[8-9]\d{7}/), Validators.maxLength(8) ]),
      address: this.fb.control<string>(this.user.address, [ Validators.required ])
    })
  }
}
