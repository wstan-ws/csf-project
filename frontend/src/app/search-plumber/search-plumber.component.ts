import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-search-plumber',
  templateUrl: './search-plumber.component.html',
  styleUrl: './search-plumber.component.css'
})
export class SearchPlumberComponent implements OnInit {

    plumbers!: Observable<MerchantSignUpDetails[]>
    username!: string

    private backendSvc = inject(BackendService)
    private router = inject(Router)
    private userSvc = inject(UsernameService)

    ngOnInit(): void {
      this.plumbers = this.backendSvc.getPlumbers()
      this.username = this.userSvc.getUser().username
    }

    back(): void {
      this.router.navigate(['/user-homepage', this.username])
    }
}
