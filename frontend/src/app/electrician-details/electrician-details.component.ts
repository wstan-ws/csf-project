import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails, PostReview, Review } from '../models';
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
    reviews$!: Observable<PostReview[]>

    private activatedRoute = inject(ActivatedRoute)
    private backendSvc = inject(BackendService)
    private router = inject(Router)
    private userSvc = inject(UsernameService)

    ngOnInit(): void {
      const username = this.activatedRoute.snapshot.params['username']
      this.electrician = this.backendSvc.getMerchantDetails(username)
      this.electrician.subscribe(
        result => this.electricianUsername = result.username
      )
      this.reviews$ = this.backendSvc.getReviewByMerchant(username)
    }

    back(): void {
      this.router.navigate(['/electrician'])
    }

    chat(): void {
      this.userUsername = this.userSvc.getUser().username
      const userAndMerchant: string = this.userUsername + '-' + this.electricianUsername
      this.router.navigate(['/userchat', userAndMerchant])
    }
}
