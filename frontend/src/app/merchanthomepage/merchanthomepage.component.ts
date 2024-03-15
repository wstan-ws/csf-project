import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-merchanthomepage',
  templateUrl: './merchanthomepage.component.html',
  styleUrl: './merchanthomepage.component.css'
})
export class MerchanthomepageComponent implements OnInit {

  username!: string

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
  }

  profile() {
    this.router.navigate(['/merchant-profile', this.username])
  }

  logout() {
    this.username = ''
    this.router.navigate(['/'])
  }

}
