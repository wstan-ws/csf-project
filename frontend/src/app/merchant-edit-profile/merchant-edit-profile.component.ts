import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantSignUpDetails } from '../models';
import { BackendService } from '../backend.service';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-merchant-edit-profile',
  templateUrl: './merchant-edit-profile.component.html',
  styleUrl: './merchant-edit-profile.component.css'
})
export class MerchantEditProfileComponent implements OnInit {

  merchantEditForm!: FormGroup
  merchant!: MerchantSignUpDetails

  private fb = inject(FormBuilder)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private backendSvc = inject(BackendService)
  private userSvc = inject(UsernameService)

  ngOnInit(): void {
    this.merchant = this.userSvc.getMerchant()
    this.merchantEditForm = this.createMerchantEditForm()
  }

  editForm(): void {
    const edit = this.merchantEditForm.value
    const username = this.activatedRoute.snapshot.params['username']
    this.backendSvc.editMerchantDetails(username, edit).subscribe()
    alert('Profile Updated')
    this.router.navigate(['/merchant-profile', username])
  }

  cancel(): void {
    const username = this.activatedRoute.snapshot.params['username']
    this.router.navigate(['/merchant-profile', username])
  }

  private createMerchantEditForm(): FormGroup {
    return this.fb.group({
      firstName: this.fb.control<string>(this.merchant.firstName, [ Validators.required ]),
      lastName: this.fb.control<string>(this.merchant.lastName, [ Validators.required ]),
      email: this.fb.control<string>(this.merchant.email, [ Validators.required, Validators.email ]),
      phoneNumber: this.fb.control<string>(this.merchant.phoneNumber, [ Validators.required, Validators.pattern(/[8-9]\d{7}/), Validators.maxLength(8) ]),
      companyName: this.fb.control<string>(this.merchant.companyName, [ Validators.required ]),
      elec: this.fb.control<boolean>(this.merchant.elec),
      elecLicenseNo: this.fb.control<string>(this.merchant.elecLicenseNo),
      plum: this.fb.control<boolean>(this.merchant.plum),
      plumLicenseNo: this.fb.control<string>(this.merchant.plumLicenseNo),
      aircon: this.fb.control<boolean>(this.merchant.aircon),
      airconLicenseNo: this.fb.control<string>(this.merchant.airconLicenseNo)
    })
  }

}
