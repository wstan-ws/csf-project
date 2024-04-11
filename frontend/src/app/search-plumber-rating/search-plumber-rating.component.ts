import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-search-plumber-rating',
  templateUrl: './search-plumber-rating.component.html',
  styleUrl: './search-plumber-rating.component.css'
})
export class SearchPlumberRatingComponent implements OnInit {

  rating!: number
  plumbers$!: Observable<MerchantSignUpDetails[]>

  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.rating = this.activatedRoute.snapshot.queryParams['rating']
    this.plumbers$ = this.backendSvc.findMerchantByRatingP(this.rating)
  }

  back(): void {
    this.router.navigate(['/plumber'])
  }
}
