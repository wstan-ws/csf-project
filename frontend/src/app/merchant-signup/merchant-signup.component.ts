import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { MerchantActivity, MerchantSignUpDetails } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchant-signup',
  templateUrl: './merchant-signup.component.html',
  styleUrl: './merchant-signup.component.css'
})
export class MerchantSignupComponent implements OnInit {

  merchantSignupForm!: FormGroup
  merchant!: MerchantSignUpDetails
  username: string[] = []
  match: boolean = false

  private fb = inject(FormBuilder)
  private backendSvc = inject(BackendService)
  private router = inject(Router)

  ngOnInit(): void {
    this.merchantSignupForm = this.createMerchantSignupForm()
    this.backendSvc.getMerchantLoginDetails()
      .then(result => result.forEach(r => this.username.push(r.username)))
  }

  resetForm(): void {
    this.merchantSignupForm = this.createMerchantSignupForm()
  }

  submitForm(): void {
    if (this.merchantSignupForm?.get('elec')?.value === false && 
        this.merchantSignupForm?.get('plum')?.value === false && 
        this.merchantSignupForm?.get('aircon')?.value === false) {
      alert("Please select at least 1 specialty")
    } else if ((this.merchantSignupForm?.get('elec')?.value === true && 
        this.merchantSignupForm?.get('elecLicenseNo')?.value === '') || 
        (this.merchantSignupForm?.get('plum')?.value === true && 
        this.merchantSignupForm?.get('plumLicenseNo')?.value === '') || 
        (this.merchantSignupForm?.get('aircon')?.value === true && 
        this.merchantSignupForm?.get('airconLicenseNo')?.value === '')) {
      alert("Please enter License Number")
    } else {
      this.merchant = this.merchantSignupForm.value
      for (let i = 0; i < this.username.length; i++) {
        if (this.merchant.username === this.username[i]) {
          this.match = true
          break
        } 
      }
      if (!this.match) {
        this.backendSvc.merchantSignup(this.merchant).subscribe()
        this.merchantSignupForm = this.createMerchantSignupForm()
        this.router.navigate(['/merchant-signup-success'])
      } else {
        alert('Username already exists')
      }
    }
  }

  private createMerchantSignupForm(): FormGroup {
    return this.fb.group({
      firstName: this.fb.control<string>("", [ Validators.required ]),
      lastName: this.fb.control<string>("", [ Validators.required ]),
      email: this.fb.control<string>("", [ Validators.required, Validators.email ]),
      phoneNumber: this.fb.control<string>("", [ Validators.required, Validators.pattern(/[8-9](\d{7})/), Validators.maxLength(8) ]),
      companyName: this.fb.control<string>("", [ Validators.required ]),
      username: this.fb.control<string>("", [ Validators.required, Validators.minLength(3) ]),
      password: this.fb.control<string>("", [ Validators.required, Validators.minLength(8) ]),
      elec: this.fb.control<boolean>(false),
      elecLicenseNo: this.fb.control<string>(""),
      plum: this.fb.control<boolean>(false),
      plumLicenseNo: this.fb.control<string>(""),
      aircon: this.fb.control<boolean>(false),
      airconLicenseNo: this.fb.control<string>("")
    })
  }
}
