import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { Router } from '@angular/router';
import { UsernameService } from '../username.service';

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
    private userSvc = inject(UsernameService)

    ngOnInit(): void {
      this.electricians = this.backendSvc.getElectricians()
      this.username = this.userSvc.getUser().username
    }

    back(): void {
      this.router.navigate(['/user-homepage', this.username])
    }
}
