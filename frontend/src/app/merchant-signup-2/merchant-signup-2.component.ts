import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MerchantSignUpDetails } from '../models';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMerchant } from '../store/merchant.selector';
import { reset } from '../store/merchant.actions';

@Component({
  selector: 'app-merchant-signup-2',
  templateUrl: './merchant-signup-2.component.html',
  styleUrl: './merchant-signup-2.component.css'
})
export class MerchantSignup2Component implements OnInit {

  merchantSignUpForm!: FormGroup
  username: string[] = []
  match: boolean = false
  merchantToUse: MerchantSignUpDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    postalCode: '',
    username: '',
    password: '',
    elec: false,
    elecLicenseNo: '',
    plum: false,
    plumLicenseNo: '',
    aircon: false,
    airconLicenseNo: '',
    active: false,
    rating: ''
  }

  private fb = inject(FormBuilder)
  private backendSvc = inject(BackendService)
  private router = inject(Router)
  private store = inject(Store)

  ngOnInit(): void {
    this.merchantSignUpForm = this.createMerchantSignUpForm()
    this.backendSvc.getMerchantLoginDetails()
      .then(result => result.forEach(r => this.username.push(r.username)))
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
      this.store.select(selectMerchant)
        .subscribe(result => {
          if (result.length > 0) {
            this.merchantToUse = {
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              email: result[0].email,
              phoneNumber: result[0].phoneNumber,
              companyName: result[0].companyName,
              postalCode: result[0].postalCode,
              username: result[0].username,
              password: result[0].password,
              elec: false,
              elecLicenseNo: '',
              plum: false,
              plumLicenseNo: '',
              aircon: false,
              airconLicenseNo: '',
              active: false,
              rating: ''
            }
          }
        })
      this.merchantToUse.elec = this.merchantSignUpForm.value.elec
      this.merchantToUse.plum = this.merchantSignUpForm.value.plum
      this.merchantToUse.aircon = this.merchantSignUpForm.value.aircon
      this.merchantToUse.elecLicenseNo = this.merchantSignUpForm.value.elecLicenseNo
      this.merchantToUse.plumLicenseNo = this.merchantSignUpForm.value.plumLicenseNo
      this.merchantToUse.airconLicenseNo = this.merchantSignUpForm.value.airconLicenseNo

      for (let i = 0; i < this.username.length; i++) {
        if (this.merchantToUse.username === this.username[i]) {
          this.match = true
          break
        } 
      }
      if (!this.match) {
        this.backendSvc.merchantSignup(this.merchantToUse).subscribe()
        this.merchantSignUpForm = this.createMerchantSignUpForm()
        this.router.navigate(['/merchant-signup-success'])
      } else {
        alert('Username already exists')
      }
    }
    this.store.dispatch(reset())
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
