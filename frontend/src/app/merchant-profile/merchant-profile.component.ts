import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';

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

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.params['username']
    this.merchant$ = this.backendSvc.getMerchantDetails(username)
  }

  back() {
    this.router.navigate(['/merchant-homepage'])
  }

  edit() {

  }

  changepw() {
    const username = this.activatedRoute.snapshot.params['username']
    this.router.navigate(['/merchant-change-password', username])
  }
}
