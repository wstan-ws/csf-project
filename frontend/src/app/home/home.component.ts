import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private router = inject(Router)

  login(): void {
    this.router.navigate(['/user-login'])
  }

  signup(): void {
    this.router.navigate(['/user-signup'])
  }
}
