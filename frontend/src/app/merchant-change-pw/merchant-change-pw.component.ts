import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-merchant-change-pw',
  templateUrl: './merchant-change-pw.component.html',
  styleUrl: './merchant-change-pw.component.css'
})
export class MerchantChangePwComponent implements OnInit {

  merchantChangePwForm!: FormGroup
  currPassword!: string

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.params['username']
    this.merchantChangePwForm = this.createMerchantChangePwForm()
    this.backendSvc.getMerchantDetails(username)
      .subscribe(result => this.currPassword = result.password)
  }

  changePw(): void {
    if (this.merchantChangePwForm.get('newpw')?.value != this.merchantChangePwForm.get('confirmpw')?.value) {
      alert('Password does not match')
    } else if (this.merchantChangePwForm.get('newpw')?.value === this.currPassword) {
      alert('New password cannot be the same as your existing password')
    } else {
      const username = this.activatedRoute.snapshot.params['username']
      const newpw = this.merchantChangePwForm.get('newpw')?.value
      this.backendSvc.editMerchantPassword(username, newpw).subscribe()
      alert('Password Changed')
      this.router.navigate(['/merchant-profile', username])
    }
  }

  cancel(): void {
    const username = this.activatedRoute.snapshot.params['username']
    this.router.navigate(['/merchant-profile', username])
  }

  private createMerchantChangePwForm(): FormGroup {
    return this.fb.group({
      newpw: this.fb.control<string>("", [ Validators.required, Validators.minLength(8) ]),
      confirmpw: this.fb.control<string>("", [ Validators.required, Validators.minLength(8) ])
    })
  }

}
