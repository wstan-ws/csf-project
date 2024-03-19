import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrl: './userhomepage.component.css'
})
export class UserhomepageComponent implements OnInit {

  username!: string

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
  }

  profile(): void {
    this.router.navigate(['/user-profile', this.username])
  }

  logout(): void {
    this.username = ''
    this.router.navigate(['/'])
  }
}
