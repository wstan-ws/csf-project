import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-search-aircon-rating',
  templateUrl: './search-aircon-rating.component.html',
  styleUrl: './search-aircon-rating.component.css'
})
export class SearchAirconRatingComponent implements OnInit {

  rating!: number
  aircons$!: Observable<MerchantSignUpDetails[]>

  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.rating = this.activatedRoute.snapshot.queryParams['rating']
    this.aircons$ = this.backendSvc.findMerchantByRatingA(this.rating)
  }

  back(): void {
    this.router.navigate(['/aircon'])
  }
}
