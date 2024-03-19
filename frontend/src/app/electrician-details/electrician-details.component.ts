import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-electrician-details',
  templateUrl: './electrician-details.component.html',
  styleUrl: './electrician-details.component.css'
})
export class ElectricianDetailsComponent implements OnInit {

    electrician!: Observable<MerchantSignUpDetails>
    userUsername!: string
    electricianUsername!: string

    private activatedRoute = inject(ActivatedRoute)
    private backendSvc = inject(BackendService)
    private router = inject(Router)
    private UserSvc = inject(UsernameService)

    ngOnInit(): void {
      this.electrician = this.backendSvc.getMerchantDetails(this.activatedRoute.snapshot.params['username'])
      this.electrician.subscribe(
        result => this.electricianUsername = result.username
      )
    }

    back(): void {
      this.router.navigate(['/electrician'])
    }

    chat(): void {
      this.userUsername = this.UserSvc.getUser().username
      const userAndMerchant: string = this.userUsername + '-' + this.electricianUsername
      this.router.navigate(['/userchat', userAndMerchant])
    }
}
