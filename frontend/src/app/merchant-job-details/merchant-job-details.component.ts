import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { MapDirectionsService } from '@angular/google-maps';
import { UsernameService } from '../username.service';
import { Observable, map } from 'rxjs';
import { JobRequest } from '../models';

@Component({
  selector: 'app-merchant-job-details',
  templateUrl: './merchant-job-details.component.html',
  styleUrl: './merchant-job-details.component.css'
})
export class MerchantJobDetailsComponent implements OnInit {

  merchantUsername!: string
  ongoingJob$!: Observable<JobRequest>
  directionResults$!: Observable<google.maps.DirectionsResult | undefined>
  origin!: string
  destination!: string
  
  options: google.maps.MapOptions = {
    center: {
      lat: 1.3521,
      lng: 103.8198
    },
    zoom: 11
  }

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)
  private mapDirectionsService = inject(MapDirectionsService)
  private userSvc = inject(UsernameService)

  ngOnInit(): void {
    const usernames = this.activatedRoute.snapshot.params['usernames']
    this.merchantUsername = usernames.split('-')[1]
    this.ongoingJob$ = this.backendSvc.getOngoingJob(usernames)
    console.log('getting postals')
    var request: google.maps.DirectionsRequest = {
      origin: {
        query: this.userSvc.getMerchantPostal()
      },
      destination: {
        query: this.userSvc.getUserPostal()
      },
      travelMode: google.maps.TravelMode.DRIVING
    }
    this.directionResults$ = this.mapDirectionsService.route(request).pipe(
      map(response => response.result))
  }

  back(): void {
    this.router.navigate(['/merchant-homepage', this.merchantUsername])
  }
}
