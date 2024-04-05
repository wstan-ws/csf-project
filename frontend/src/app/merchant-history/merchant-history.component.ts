import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { JobRequest } from '../models';

@Component({
  selector: 'app-merchant-history',
  templateUrl: './merchant-history.component.html',
  styleUrl: './merchant-history.component.css'
})
export class MerchantHistoryComponent implements OnInit {

  username!: string
  jobHistory$!: Observable<JobRequest[]>

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.jobHistory$ = this.backendSvc.getMerchantJobHistory(this.username)
  }

  back(): void {
    this.router.navigate(['/merchant-homepage', this.username])
  }
}
