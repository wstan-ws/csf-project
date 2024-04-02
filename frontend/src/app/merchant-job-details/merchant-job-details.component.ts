import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { MapDirectionsService } from '@angular/google-maps';
import { UsernameService } from '../username.service';
import { Observable, lastValueFrom, map } from 'rxjs';
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
  distance!: string
  duration!: string
  eta!: string
  
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
  private userSvc = inject(UsernameService)
  private mapDirectionsService = inject(MapDirectionsService)

  ngOnInit(): void {
    const usernames = this.activatedRoute.snapshot.params['usernames']
    this.merchantUsername = usernames.split('-')[1]
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

    const distance = new google.maps.DistanceMatrixService()
    const disReq: google.maps.DistanceMatrixRequest = {
      origins: [this.userSvc.getMerchantPostal()],
      destinations: [this.userSvc.getUserPostal()],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }
    const handleDistance = async() => {
      var durationInSec!: number
      await distance.getDistanceMatrix(disReq)
        .then(response => this.distance = response.rows[0].elements[0].distance.text)
      await distance.getDistanceMatrix(disReq)
        .then(response => this.duration = response.rows[0].elements[0].duration.text)
      await distance.getDistanceMatrix(disReq)
        .then(response => durationInSec = response.rows[0].elements[0].duration.value)
      var jobTime!: string
      await lastValueFrom(this.ongoingJob$)
        .then(result => jobTime = result.time)
      var hour: unknown = jobTime.split(':')[0]
      const other = jobTime.split(':')[1]
      var min: unknown = other.split(':')[0]
      const totalSec: number = ((hour as number) * 3600) + ((min as number) * 60)
      const etaSec: number = totalSec + durationInSec
      hour = Math.floor(etaSec/3600) 
      min = Math.floor((etaSec - (hour as number * 3600))/60)
      this.eta = (hour as string) + ':' + (min as string) 
    }
    handleDistance()
  }

  back(): void {
    this.router.navigate(['/merchant-homepage', this.merchantUsername])
  }
}
