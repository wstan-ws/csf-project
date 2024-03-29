import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-job-details',
  templateUrl: './user-job-details.component.html',
  styleUrl: './user-job-details.component.css'
})
export class UserJobDetailsComponent implements OnInit {

  userUsername!: string

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    const usernames = this.activatedRoute.snapshot.params['usernames']
    this.userUsername = usernames.split('-')[0]
  }

  back(): void {
    this.router.navigate(['/user-homepage', this.userUsername])
  }
}
