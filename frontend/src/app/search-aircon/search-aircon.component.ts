import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-aircon',
  templateUrl: './search-aircon.component.html',
  styleUrl: './search-aircon.component.css'
})
export class SearchAirconComponent {

    aircons!: Observable<MerchantSignUpDetails[]>
    username!: string

    private backendSvc = inject(BackendService)
    private router = inject(Router)

    ngOnInit(): void {
      this.aircons = this.backendSvc.getAircons()
      this.username = this.backendSvc.getUsername()
    }

    back(): void {
      this.router.navigate(['/user-homepage', this.username])
    }
}
