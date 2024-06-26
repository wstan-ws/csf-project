import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails, PostReview } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-aircon-details',
  templateUrl: './aircon-details.component.html',
  styleUrl: './aircon-details.component.css'
})
export class AirconDetailsComponent implements OnInit {

    aircon!: Observable<MerchantSignUpDetails>
    userUsername!: string
    airconUsername!: string
    reviews$!: Observable<PostReview[]>

    private activatedRoute = inject(ActivatedRoute)
    private backendSvc = inject(BackendService)
    private router = inject(Router)
    private userSvc = inject(UsernameService)

    ngOnInit(): void {
      const username = this.activatedRoute.snapshot.params['username']
      this.aircon = this.backendSvc.getMerchantDetails(username)
      this.aircon.subscribe(
        result => this.airconUsername = result.username
      )
      this.reviews$ = this.backendSvc.getReviewByMerchant(username)
    }

    back(): void {
      this.router.navigate(['/aircon'])
    }

    chat(): void {
      this.userUsername = this.userSvc.getUser().username
      const userAndMerchant: string = this.userUsername + '-' + this.airconUsername
      this.router.navigate(['/userchat', userAndMerchant])
    }
}
