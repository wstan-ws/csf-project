import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantSignUpDetails } from '../models';
import { Router } from '@angular/router';
import { MerchantStore } from '../merchant.store';

@Component({
  selector: 'app-merchant-signup',
  templateUrl: './merchant-signup.component.html',
  styleUrl: './merchant-signup.component.css'
})
export class MerchantSignupComponent implements OnInit {

  merchantSignupForm!: FormGroup

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private merchantStore = inject(MerchantStore)

  ngOnInit(): void {
    this.merchantSignupForm = this.createMerchantSignupForm()
  }

  resetForm(): void {
    this.merchantSignupForm = this.createMerchantSignupForm()
  }

  submitForm(): void {
    const merchant: MerchantSignUpDetails = {
      firstName: this.merchantSignupForm.value.firstName,
      lastName: this.merchantSignupForm.value.lastName,
      email: this.merchantSignupForm.value.email,
      phoneNumber: this.merchantSignupForm.value.phoneNumber,
      companyName: this.merchantSignupForm.value.companyName,
      postalCode: this.merchantSignupForm.value.postalCode,
      username: this.merchantSignupForm.value.username,
      password: this.merchantSignupForm.value.password,
      elec: false,
      elecLicenseNo: '',
      plum: false,
      plumLicenseNo: '',
      aircon: false,
      airconLicenseNo: '',
      active: false,
      rating: '' 
    }
    this.merchantStore.addMerchantSignUpDetails(merchant)
    this.router.navigate(['/merchant-signup-2'])
  }

  back(): void {
    this.router.navigate(['/'])
  }

  private createMerchantSignupForm(): FormGroup {
    return this.fb.group({
      firstName: this.fb.control<string>('', [ Validators.required ]),
      lastName: this.fb.control<string>('', [ Validators.required ]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      phoneNumber: this.fb.control<string>('', [ Validators.required, Validators.pattern(/[8-9](\d{7})/), Validators.maxLength(8) ]),
      companyName: this.fb.control<string>('', [ Validators.required ]),
      postalCode: this.fb.control<string>('', [ Validators.required, Validators.pattern(/\d{6}/), Validators.maxLength(6) ]),
      username: this.fb.control<string>('', [ Validators.required, Validators.minLength(3) ]),
      password: this.fb.control<string>('', [ Validators.required, Validators.minLength(8) ]),
    })
  }
}
