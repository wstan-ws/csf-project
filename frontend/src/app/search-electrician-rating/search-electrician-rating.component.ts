import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-search-electrician-rating',
  templateUrl: './search-electrician-rating.component.html',
  styleUrl: './search-electrician-rating.component.css'
})
export class SearchElectricianRatingComponent implements OnInit {

  rating!: number
  electricians$!: Observable<MerchantSignUpDetails[]>

  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.rating = this.activatedRoute.snapshot.queryParams['rating']
    this.electricians$ = this.backendSvc.findMerchantByRatingE(this.rating)
  }

  back(): void {
    this.router.navigate(['/electrician'])
  }
}
