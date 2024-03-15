import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-aircon-details',
  templateUrl: './aircon-details.component.html',
  styleUrl: './aircon-details.component.css'
})
export class AirconDetailsComponent implements OnInit {

    aircon!: Observable<MerchantSignUpDetails>
    username: string = ''

    private activatedRoute = inject(ActivatedRoute)
    private backendSvc = inject(BackendService)
    private router = inject(Router)

    ngOnInit(): void {
      this.username = this.activatedRoute.snapshot.params['username']
      this.aircon = this.backendSvc.getMerchantDetails(this.username)
    }

    back(): void {
      this.router.navigate(['/aircon'])
    }
}
