import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.component.html',
  styleUrl: './merchant-profile.component.css'
})
export class MerchantProfileComponent implements OnInit {

  merchant$!: Observable<MerchantSignUpDetails>

  private backendSvc = inject(BackendService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private userSvc = inject(UsernameService)

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.params['username']
    this.merchant$ = this.backendSvc.getMerchantDetails(username)
    this.backendSvc.getMerchantDetails(username)
      .subscribe(result => this.userSvc.setMerchant(result))
  }

  back() {
    const username = this.activatedRoute.snapshot.params['username']
    this.router.navigate(['/merchant-homepage', username])
  }

  edit() {
    const username = this.activatedRoute.snapshot.params['username']
    this.router.navigate(['/merchant-edit-profile', username])
  }

  changepw() {
    const username = this.activatedRoute.snapshot.params['username']
    this.router.navigate(['/merchant-change-password', username])
  }
}
