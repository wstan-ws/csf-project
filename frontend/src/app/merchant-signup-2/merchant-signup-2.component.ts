import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MerchantStore } from '../merchant.store';
import { MerchantSignUpDetails } from '../models';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchant-signup-2',
  templateUrl: './merchant-signup-2.component.html',
  styleUrl: './merchant-signup-2.component.css'
})
export class MerchantSignup2Component implements OnInit {

  merchantSignUpForm!: FormGroup
  merchantFromStore!: MerchantSignUpDetails
  username: string[] = []
  match: boolean = false

  private fb = inject(FormBuilder)
  private merchantStore = inject(MerchantStore)
  private backendSvc = inject(BackendService)
  private router = inject(Router)

  ngOnInit(): void {
    this.merchantSignUpForm = this.createMerchantSignUpForm()
    this.backendSvc.getMerchantLoginDetails()
      .then(result => result.forEach(r => this.username.push(r.username)))
    this.merchantStore.getMerchantSignUpDetails
      .subscribe(result => this.merchantFromStore = result[0])
  }

  submitForm(): void {
    if (this.merchantSignUpForm?.get('elec')?.value === false && 
        this.merchantSignUpForm?.get('plum')?.value === false && 
        this.merchantSignUpForm?.get('aircon')?.value === false) {
      alert("Please select at least 1 specialty")
    } else if ((this.merchantSignUpForm?.get('elec')?.value === true && 
        this.merchantSignUpForm?.get('elecLicenseNo')?.value === '') || 
        (this.merchantSignUpForm?.get('plum')?.value === true && 
        this.merchantSignUpForm?.get('plumLicenseNo')?.value === '') || 
        (this.merchantSignUpForm?.get('aircon')?.value === true && 
        this.merchantSignUpForm?.get('airconLicenseNo')?.value === '')) {
      alert("Please enter License Number")
    } else {
      const merchant: MerchantSignUpDetails = {
        firstName: this.merchantFromStore.firstName,
        lastName: this.merchantFromStore.lastName,
        email: this.merchantFromStore.email, 
        phoneNumber: this.merchantFromStore.phoneNumber,
        companyName: this.merchantFromStore.companyName,
        postalCode: this.merchantFromStore.postalCode,
        username: this.merchantFromStore.username,
        password: this.merchantFromStore.password,
        elec: this.merchantSignUpForm.value.elec,
        elecLicenseNo: this.merchantSignUpForm.value.elecLicenseNo,
        plum: this.merchantSignUpForm.value.plum,
        plumLicenseNo: this.merchantSignUpForm.value.plumLicenseNo,
        aircon: this.merchantSignUpForm.value.aircon,
        airconLicenseNo: this.merchantSignUpForm.value.airconLicenseNo,
        active: false
      }
      for (let i = 0; i < this.username.length; i++) {
        if (merchant.username === this.username[i]) {
          this.match = true
          break
        } 
      }
      if (!this.match) {
        this.backendSvc.merchantSignup(merchant).subscribe()
        this.merchantSignUpForm = this.createMerchantSignUpForm()
        this.router.navigate(['/merchant-signup-success'])
      } else {
        alert('Username already exists')
      }
    }

    this.merchantStore.clearData()
  }

  resetForm(): void {
    this.merchantSignUpForm = this.createMerchantSignUpForm()
  }

  back(): void {
    this.router.navigate(['/'])
  }

  private createMerchantSignUpForm(): FormGroup {
    return this.fb.group({
      elec: this.fb.control<boolean>(false),
      elecLicenseNo: this.fb.control<string>(""),
      plum: this.fb.control<boolean>(false),
      plumLicenseNo: this.fb.control<string>(""),
      aircon: this.fb.control<boolean>(false),
      airconLicenseNo: this.fb.control<string>("")
    })
  }
}
