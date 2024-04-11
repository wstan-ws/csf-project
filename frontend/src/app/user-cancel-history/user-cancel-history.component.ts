import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JobRequest } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-user-cancel-history',
  templateUrl: './user-cancel-history.component.html',
  styleUrl: './user-cancel-history.component.css'
})
export class UserCancelHistoryComponent implements OnInit {

  username!: string
  jobHistory$!: Observable<JobRequest[]>

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.jobHistory$ = this.backendSvc.getUserCancelJobHistory(this.username)
  }

  history(): void {
    this.router.navigate(['/user-history', this.username])
  }

  back(): void {
    this.router.navigate(['user-homepage', this.username])
  }
}
