import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-merchant-job-details',
  templateUrl: './merchant-job-details.component.html',
  styleUrl: './merchant-job-details.component.css'
})
export class MerchantJobDetailsComponent {

  merchantUsername!: string

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    const usernames = this.activatedRoute.snapshot.params['usernames']
    this.merchantUsername = usernames.split('-')[1]
  }

  back(): void {
    this.router.navigate(['/merchant-homepage', this.merchantUsername])
  }
}
