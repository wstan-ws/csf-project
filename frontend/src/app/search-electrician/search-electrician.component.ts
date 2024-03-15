import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-electrician',
  templateUrl: './search-electrician.component.html',
  styleUrl: './search-electrician.component.css'
})
export class SearchElectricianComponent implements OnInit {

    electricians!: Observable<MerchantSignUpDetails[]>
    username!: string

    private backendSvc = inject(BackendService)
    private router = inject(Router)

    ngOnInit(): void {
      this.electricians = this.backendSvc.getElectricians()
      this.username = this.backendSvc.getUsername()
    }

    back(): void {
      this.router.navigate(['/user-homepage', this.username])
    }
}
