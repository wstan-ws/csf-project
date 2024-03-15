import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-plumber-details',
  templateUrl: './plumber-details.component.html',
  styleUrl: './plumber-details.component.css'
})
export class PlumberDetailsComponent implements OnInit {

    plumber!: Observable<MerchantSignUpDetails>
    username: string = ''

    private activatedRoute = inject(ActivatedRoute)
    private backendSvc = inject(BackendService)
    private router = inject(Router)

    ngOnInit(): void {
      this.username = this.activatedRoute.snapshot.params['username']
      this.plumber = this.backendSvc.getMerchantDetails(this.username)
    }

    back(): void {
      this.router.navigate(['/plumber'])
    }
}
