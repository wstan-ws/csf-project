import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { UsernameService } from '../username.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-aircon',
  templateUrl: './search-aircon.component.html',
  styleUrl: './search-aircon.component.css'
})
export class SearchAirconComponent implements OnInit {

    searchForm!: FormGroup
    aircons$!: Observable<MerchantSignUpDetails[]>
    username!: string

    private backendSvc = inject(BackendService)
    private router = inject(Router)
    private userSvc = inject(UsernameService)
    private fb = inject(FormBuilder)

    ngOnInit(): void {
      this.aircons$ = this.backendSvc.getAircons()
      this.username = this.userSvc.getUser().username
      this.searchForm = this.createSearchForm()
    }

    back(): void {
      this.router.navigate(['/user-homepage', this.username])
    }

    search(): void {
      this.router.navigate(['/search-aircons'], {queryParams: {name: this.searchForm.value.search}})
    }

    two(): void {
      this.router.navigate(['/search-aircon-rating'], {queryParams: {rating: 2}})
    }

    three(): void {
      this.router.navigate(['/search-aircon-rating'], {queryParams: {rating: 3}})
    }

    four(): void {
      this.router.navigate(['/search-aircon-rating'], {queryParams: {rating: 4}})
    }

    five(): void {
      this.router.navigate(['/search-aircon-rating'], {queryParams: {rating: 5}})
    }

    private createSearchForm(): FormGroup {
      return this.fb.group({
        search: this.fb.control<string>("")
      })
    }
}
