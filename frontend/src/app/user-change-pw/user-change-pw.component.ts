import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-user-change-pw',
  templateUrl: './user-change-pw.component.html',
  styleUrl: './user-change-pw.component.css'
})
export class UserChangePwComponent implements OnInit {

  userChangePwForm!: FormGroup

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.userChangePwForm = this.createUserChangePwForm()
  }

  changePw(): void {
    if (this.userChangePwForm.get('newpw')?.value != this.userChangePwForm.get('confirmpw')?.value) {
      alert('Password does not match')
    } else {
      const username = this.activatedRoute.snapshot.params['username']
      const newpw = this.userChangePwForm.get('newpw')?.value
      this.backendSvc.editUserPassword(username, newpw).subscribe()
      alert('Password Changed')
      this.router.navigate(['/user-profile', username])
    }
  }

  cancel(): void {
    const username = this.activatedRoute.snapshot.params['username']
    this.router.navigate(['/user-profile', username])
  }

  private createUserChangePwForm(): FormGroup {
    return this.fb.group({
      newpw: this.fb.control<string>("", [ Validators.required, Validators.minLength(8) ]),
      confirmpw: this.fb.control<string>("", [ Validators.required, Validators.minLength(8) ])
    })
  }

}
