import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { MerchantSignUpDetails } from '../models';

@Component({
  selector: 'app-merchant-signup',
  templateUrl: './merchant-signup.component.html',
  styleUrl: './merchant-signup.component.css'
})
export class MerchantSignupComponent implements OnInit {

  merchantSignupForm!: FormGroup
  merchant!: MerchantSignUpDetails

  private fb = inject(FormBuilder)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.merchantSignupForm = this.createMerchantSignupForm()
  }

  resetForm(): void {
    this.merchantSignupForm = this.createMerchantSignupForm()
  }

  submitForm(): void {
    this.merchant = this.merchantSignupForm.value
    console.info(">>> merchant sign up: ", this.merchant)
    this.backendSvc.merchantSignup(this.merchant).subscribe()
    this.merchantSignupForm = this.createMerchantSignupForm()
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
