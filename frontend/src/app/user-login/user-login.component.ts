import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { LoginDetails } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit {

  userLoginForm!: FormGroup
  loginDetailList!: LoginDetails[]
  match: boolean = false

  private fb = inject(FormBuilder)
  private backendSvc = inject(BackendService)
  private router = inject(Router)

  ngOnInit(): void {
    this.userLoginForm = this.createUserLoginForm()
    this.backendSvc.getUserLoginDetails()
      .then(result => this.loginDetailList = result as LoginDetails[])
  }

  login(): void {
    const username = this.userLoginForm.get('username')?.value
    const password = this.userLoginForm.get('password')?.value
    for (let i = 0; i < this.loginDetailList.length; i++) {
      if (username === this.loginDetailList[i].username && password === this.loginDetailList[i].password) {
        this.match = true
        break
      }
    }
    if (this.match) {
      this.backendSvc.getUserDetails(username)
        .subscribe(result => this.backendSvc.setUser(result))
      this.router.navigate(['/user-homepage', username])
      this.match = false
    } else {
      alert('Username or password is incorrect')
    }
  }

  private createUserLoginForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>("", [ Validators.required, Validators.minLength(3) ]),
      password: this.fb.control<string>("", [ Validators.required, Validators.minLength(8) ])
    })
  }

}
