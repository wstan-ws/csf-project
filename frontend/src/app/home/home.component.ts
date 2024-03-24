import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MerchantStore } from '../merchant.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private router = inject(Router)
  private merchantStore = inject(MerchantStore)

  ngOnInit(): void {
    this.merchantStore.clearData()
  }

  login(): void {
    this.router.navigate(['/user-login'])
  }

  signup(): void {
    this.router.navigate(['/user-signup'])
  }

  about(): void {
    this.router.navigate(['about-us'])
  }
}
