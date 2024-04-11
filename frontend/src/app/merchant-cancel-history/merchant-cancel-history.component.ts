import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JobRequest } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-merchant-cancel-history',
  templateUrl: './merchant-cancel-history.component.html',
  styleUrl: './merchant-cancel-history.component.css'
})
export class MerchantCancelHistoryComponent implements OnInit {

  username!: string
  jobHistory$!: Observable<JobRequest[]>

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.jobHistory$ = this.backendSvc.getMerchantCancelJobHistory(this.username)
  }

  history(): void {
    this.router.navigate(['/merchant-history', this.username])
  }

  back(): void {
    this.router.navigate(['/merchant-homepage', this.username])
  }
}
