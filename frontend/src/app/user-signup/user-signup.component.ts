import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit {

  userSignupForm!: FormGroup

  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.userSignupForm = this.createUserSignupForm()
  }

  resetForm(): void {
    this.userSignupForm.reset()
  }

  submitForm(): void {
    console.info('>>> Sign Up Form: ', this.userSignupForm.value) 
    this.userSignupForm = this.createUserSignupForm()
  }

  createUserSignupForm(): FormGroup {
    return this.fb.group({
      firstName: this.fb.control<string>("", [ Validators.required ]),
      lastName: this.fb.control<string>("", [ Validators.required ]),
      email: this.fb.control<string>("", [ Validators.required, Validators.email ]),
      phoneNumber: this.fb.control<number>(0 , [ Validators.required, Validators.min(80000000), Validators.max(99999999) ]),
      address: this.fb.control<string>("", [ Validators.required ]),
      username: this.fb.control<string>("", [ Validators.required, Validators.minLength(3) ]),
      password: this.fb.control<string>("", [ Validators.required, Validators.minLength(8) ])
    })
  }
}
