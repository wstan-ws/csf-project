import { Component, OnInit, inject } from '@angular/core';
import { LoginStore } from '../login.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merchanthomepage',
  templateUrl: './merchanthomepage.component.html',
  styleUrl: './merchanthomepage.component.css'
})
export class MerchanthomepageComponent implements OnInit {

  username!: string

  private router = inject(Router)
  private loginStore = inject(LoginStore)

  ngOnInit(): void {
    this.loginStore.getLoginDetail
      .subscribe(result => this.username = result[0]?.username)
  }

  profile() {
    this.router.navigate(['/merchant-profile', this.username])
  }

  logout() {
    this.loginStore.clearLoginDetail()
    this.username = ''
    this.router.navigate(['/'])
  }

}
