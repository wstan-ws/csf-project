import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-search-aircon',
  templateUrl: './search-aircon.component.html',
  styleUrl: './search-aircon.component.css'
})
export class SearchAirconComponent {

    aircons$!: Observable<MerchantSignUpDetails[]>
    username!: string
    rating$!: string

    private backendSvc = inject(BackendService)
    private router = inject(Router)
    private userSvc = inject(UsernameService)

    ngOnInit(): void {
      this.aircons$ = this.backendSvc.getAircons()
      this.username = this.userSvc.getUser().username
    }

    back(): void {
      this.router.navigate(['/user-homepage', this.username])
    }
}
