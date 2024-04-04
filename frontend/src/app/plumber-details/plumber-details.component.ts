import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails, PostReview } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-plumber-details',
  templateUrl: './plumber-details.component.html',
  styleUrl: './plumber-details.component.css'
})
export class PlumberDetailsComponent implements OnInit {

    plumber!: Observable<MerchantSignUpDetails>
    userUsername!: string
    plumUsername!: string
    reviews$!: Observable<PostReview[]>

    private activatedRoute = inject(ActivatedRoute)
    private backendSvc = inject(BackendService)
    private router = inject(Router)
    private userSvc = inject(UsernameService)

    ngOnInit(): void {
      const username = this.activatedRoute.snapshot.params['username']
      this.plumber = this.backendSvc.getMerchantDetails(username)
      this.plumber.subscribe(
        result => this.plumUsername = result.username
      )
      this.reviews$ = this.backendSvc.getReviewByMerchant(username)
    }

    back(): void {
      this.router.navigate(['/plumber'])
    }

    chat(): void {
      this.userUsername = this.userSvc.getUser().username
      const userAndMerchant: string = this.userUsername + '-' + this.plumUsername
      this.router.navigate(['/userchat', userAndMerchant])
    }
}
