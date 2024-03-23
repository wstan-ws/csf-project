import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { LoginDetails } from '../models';
import { Router } from '@angular/router';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-merchant-login',
  templateUrl: './merchant-login.component.html',
  styleUrl: './merchant-login.component.css'
})
export class MerchantLoginComponent implements OnInit {

  merchantLoginForm!: FormGroup
  loginDetailList!: LoginDetails[]
  match: boolean = false

  private fb = inject(FormBuilder)
  private backendSvc = inject(BackendService)
  private router = inject(Router)
  private userSvc = inject(UsernameService)

  ngOnInit(): void {
    this.merchantLoginForm = this.createMerchantLoginForm()
    this.backendSvc.getMerchantLoginDetails()
      .then(result => this.loginDetailList = result as LoginDetails[])
  }

  login(): void {
    const username = this.merchantLoginForm.get('username')?.value
    const password = this.merchantLoginForm.get('password')?.value
    for (let i = 0; i < this.loginDetailList.length; i++) {
      if (username === this.loginDetailList[i].username && password === this.loginDetailList[i].password) {
        this.match = true
        break
      }
    }
    if (this.match) {
      this.backendSvc.getMerchantDetails(username)
        .subscribe(result => this.userSvc.setMerchant(result))
      this.router.navigate(['/merchant-homepage', username])
      this.match = false
    } else {
      alert('Username or password is incorrect')
    }
  }

  back(): void {
    this.router.navigate(['/'])
  }

  private createMerchantLoginForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>("", [ Validators.required, Validators.minLength(3) ]),
      password: this.fb.control<string>("", [ Validators.required, Validators.minLength(8) ])
    })
  }

}
