import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { JobRequest } from '../models';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.css'
})
export class UserHistoryComponent implements OnInit {

  username!: string
  jobHistory$!: Observable<JobRequest[]>

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.jobHistory$ = this.backendSvc.getUserJobHistory(this.username)
  }

  back(): void {
    this.router.navigate(['user-homepage', this.username])
  }
}
