import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { UsernameService } from '../username.service';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-find-aircon',
  templateUrl: './find-aircon.component.html',
  styleUrl: './find-aircon.component.css'
})
export class FindAirconComponent implements OnInit {

  searchForm!: FormGroup
  aircons$!: Observable<MerchantSignUpDetails[]>
  username!: string
  query!: string

  private router = inject(Router)
  private userSvc = inject(UsernameService)
  private fb = inject(FormBuilder)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.username = this.userSvc.getUser().username
    this.query = this.activatedRoute.snapshot.queryParams['name']
    this.aircons$ = this.backendSvc.findMerchantByNameA(this.query)
    this.searchForm = this.createSearchForm()
  }

  back(): void {
    this.router.navigate(['/user-homepage', this.username])
  }

  private createSearchForm(): FormGroup {
    return this.fb.group({
      search: this.fb.control<string>("")
    })
  }
}
