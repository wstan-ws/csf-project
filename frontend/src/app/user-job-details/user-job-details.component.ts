import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable, map } from 'rxjs';
import { JobRequest } from '../models';
import { MapDirectionsService } from '@angular/google-maps';
import { UsernameService } from '../username.service';

@Component({
  selector: 'app-user-job-details',
  templateUrl: './user-job-details.component.html',
  styleUrl: './user-job-details.component.css'
})
export class UserJobDetailsComponent implements OnInit {

  userUsername!: string
  ongoingJob$!: Observable<JobRequest>
  directionResults$!: Observable<google.maps.DirectionsResult | undefined>
  
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
    this.userUsername = usernames.split('-')[0]
    this.ongoingJob$ = this.backendSvc.getOngoingJob(usernames)
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
    this.router.navigate(['/user-homepage', this.userUsername])
  }

}
