import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';

@Component({
  selector: 'app-electrician-details',
  templateUrl: './electrician-details.component.html',
  styleUrl: './electrician-details.component.css'
})
export class ElectricianDetailsComponent implements OnInit {

    electrician!: Observable<MerchantSignUpDetails>
    username: string = ''

    private activatedRoute = inject(ActivatedRoute)
    private backendSvc = inject(BackendService)
    private router = inject(Router)

    ngOnInit(): void {
      this.username = this.activatedRoute.snapshot.params['username']
      this.electrician = this.backendSvc.getMerchantDetails(this.username)
    }

    back(): void {
      this.router.navigate(['/electrician'])
    }
}
