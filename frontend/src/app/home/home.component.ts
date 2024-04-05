import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MerchantStore } from '../merchant.store';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { Joke } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  joke$!: Observable<Joke>

  private router = inject(Router)
  private merchantStore = inject(MerchantStore)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.merchantStore.clearData()
    this.joke$ = this.backendSvc.getDadJoke()
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
