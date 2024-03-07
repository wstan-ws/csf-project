import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStore } from '../login.store';

@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrl: './userhomepage.component.css'
})
export class UserhomepageComponent implements OnInit {

  username!: string

  private router = inject(Router)
  private loginStore = inject(LoginStore)

  ngOnInit(): void {
    this.loginStore.getLoginDetail
      .subscribe(result => this.username = result[0]?.username)
  }

  profile(): void {
    this.router.navigate(['/user-profile', this.username])
  }

  logout(): void {
    this.loginStore.clearLoginDetail()
    this.username = ''
    this.router.navigate(['/'])
  }
}
