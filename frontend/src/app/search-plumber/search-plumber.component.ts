import { Component, OnInit, inject } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { UsernameService } from '../username.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-plumber',
  templateUrl: './search-plumber.component.html',
  styleUrl: './search-plumber.component.css'
})
export class SearchPlumberComponent implements OnInit {

    searchForm!: FormGroup
    plumbers!: Observable<MerchantSignUpDetails[]>
    username!: string

    private backendSvc = inject(BackendService)
    private router = inject(Router)
    private userSvc = inject(UsernameService)
    private fb = inject(FormBuilder)

    ngOnInit(): void {
      this.plumbers = this.backendSvc.getPlumbers()
      this.username = this.userSvc.getUser().username
      this.searchForm = this.createSearchForm()
    }

    back(): void {
      this.router.navigate(['/user-homepage', this.username])
    }

    search(): void {
      this.router.navigate(['/search-plumbers'], {queryParams: {name: this.searchForm.value.search}})
    }

    private createSearchForm(): FormGroup {
      return this.fb.group({
        search: this.fb.control<string>("")
      })
    }
}
