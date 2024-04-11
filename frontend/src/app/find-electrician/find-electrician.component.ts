import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MerchantSignUpDetails } from '../models';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-find-electrician',
  templateUrl: './find-electrician.component.html',
  styleUrl: './find-electrician.component.css'
})
export class FindElectricianComponent implements OnInit {

  searchForm!: FormGroup
  electricians$!: Observable<MerchantSignUpDetails[]>
  query!: string

  private router = inject(Router)
  private fb = inject(FormBuilder)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.queryParams['name']
    this.electricians$ = this.backendSvc.findMerchantByNameE(this.query)
    this.searchForm = this.createSearchForm()
  }

  back(): void {
    this.router.navigate(['/electrician'])
  }

  private createSearchForm(): FormGroup {
    return this.fb.group({
      search: this.fb.control<string>("")
    })
  }
}
