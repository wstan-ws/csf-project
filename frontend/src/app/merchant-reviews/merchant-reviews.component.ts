import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { PostReview } from '../models';

@Component({
  selector: 'app-merchant-reviews',
  templateUrl: './merchant-reviews.component.html',
  styleUrl: './merchant-reviews.component.css'
})
export class MerchantReviewsComponent implements OnInit {

  username!: string
  reviews$!: Observable<PostReview[]>

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.reviews$ = this.backendSvc.getReviewByMerchant(this.username)
  }

  back(): void {
    this.router.navigate(['/merchant-homepage', this.username])
  }

}
