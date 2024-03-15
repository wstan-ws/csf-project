import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';

@Component({
  selector: 'app-search-plumber',
  templateUrl: './search-plumber.component.html',
  styleUrl: './search-plumber.component.css'
})
export class SearchPlumberComponent implements OnInit {

    plumbers!: Observable<MerchantSignUpDetails[]>

    private backendSvc = inject(BackendService)
    private router = inject(Router)

    ngOnInit(): void {
      this.plumbers = this.backendSvc.getPlumbers()
    }

    back(): void {
      this.router.navigate(['/user-homepage'])
    }
}
