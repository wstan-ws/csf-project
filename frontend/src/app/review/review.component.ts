import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../models';
import { BackendService } from '../backend.service';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {

  reviewForm!: FormGroup
  merchant!: string
  user!: string
  jobId!: number

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private userSvc = inject(UsernameService)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.reviewForm = this.createReviewForm()
    const usernames = this.activatedRoute.snapshot.params['usernames']
    this.merchant = usernames.split('-')[1]
    this.user = usernames.split('-')[0]
    this.jobId = this.userSvc.getJobId()
  }

  home(): void {
    const usernames = this.activatedRoute.snapshot.params['usernames']
    const user = usernames.split('-')[0]
    this.router.navigate(['/user-homepage', user])
  }

  submit(): void {
    const review: Review = {
      reviewId: 0,
      jobId: this.jobId,
      rating: Number(this.reviewForm.value.rating),
      comments: this.reviewForm.value.comments,
      date: new Date().toLocaleString().split(',')[0],
      time: new Date().toLocaleString().split(',')[1]
    }
    this.backendSvc.postReview(this.merchant, review).then()
    this.router.navigate(['user-homepage', this.user])
  }

  private createReviewForm(): FormGroup {
    return this.fb.group({
      rating: this.fb.control<string>(""),
      comments: this.fb.control<string>("")
    })
  }
}
