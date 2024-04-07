import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { Joke } from '../models';
import { Store } from '@ngrx/store';
import { reset } from '../store/merchant.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  joke$!: Observable<Joke>

  private router = inject(Router)
  private backendSvc = inject(BackendService)
  private store = inject(Store)

  ngOnInit(): void {
    this.store.dispatch(reset())
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
