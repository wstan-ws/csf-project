import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSignUpDetails } from '../models';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit {

  userSignupForm!: FormGroup
  user!: UserSignUpDetails
  username: string[] = []
  match: boolean = false
  
  private fb = inject(FormBuilder)
  private backendSvc = inject(BackendService)
  private router = inject(Router)

  ngOnInit(): void {
    this.userSignupForm = this.createUserSignupForm()
    this.backendSvc.getUserLoginDetails()
      .then(result => result.forEach(r => this.username.push(r.username)))
  }

  resetForm(): void {
    this.userSignupForm.reset()
  }

  submitForm(): void {
    this.user = this.userSignupForm.value
    for (let i = 0; i < this.username.length; i++) {
      if (this.user.username === this.username[i]) {
        this.match = true
        break
      } 
    }
    if (!this.match) {
      this.backendSvc.userSignup(this.user).then()
      this.userSignupForm = this.createUserSignupForm()
      this.router.navigate(['/user-signup-success'])
    } else {
      alert('Username already exists')
    }
  }

  back(): void {
    this.router.navigate(['/'])
  }

  createUserSignupForm(): FormGroup {
    return this.fb.group({
      firstName: this.fb.control<string>("", [ Validators.required ]),
      lastName: this.fb.control<string>("", [ Validators.required ]),
      email: this.fb.control<string>("", [ Validators.required, Validators.email ]),
      phoneNumber: this.fb.control<string>("" , [ Validators.required, Validators.pattern(/[8-9]\d{7}/), Validators.maxLength(8) ]),
      address: this.fb.control<string>("", [ Validators.required ]),
      postalCode: this.fb.control<string>("", [ Validators.required, Validators.pattern(/\d{6}/), Validators.maxLength(6) ]),
      username: this.fb.control<string>("", [ Validators.required, Validators.minLength(3) ]),
      password: this.fb.control<string>("", [ Validators.required, Validators.minLength(8) ])
    })
  }

}
