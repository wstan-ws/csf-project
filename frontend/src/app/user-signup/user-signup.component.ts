import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignUpDetails } from '../models';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit {

  userSignupForm!: FormGroup
  user!: UserSignUpDetails
  
  private fb = inject(FormBuilder)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.userSignupForm = this.createUserSignupForm()
  }

  resetForm(): void {
    this.userSignupForm.reset()
  }

  submitForm(): void {
    this.user = this.userSignupForm.value
    this.backendSvc.userSignup(this.user)
      .then()
    this.userSignupForm = this.createUserSignupForm()
  }

  createUserSignupForm(): FormGroup {
    return this.fb.group({
      firstName: this.fb.control<string>("", [ Validators.required ]),
      lastName: this.fb.control<string>("", [ Validators.required ]),
      email: this.fb.control<string>("", [ Validators.required, Validators.email ]),
      phoneNumber: this.fb.control<string>("" , [ Validators.required, Validators.pattern(/[8-9]\d{7}/), Validators.maxLength(8) ]),
      address: this.fb.control<string>("", [ Validators.required ]),
      username: this.fb.control<string>("", [ Validators.required, Validators.minLength(3) ]),
      password: this.fb.control<string>("", [ Validators.required, Validators.minLength(8) ])
    })
  }

}
