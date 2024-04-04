import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable, lastValueFrom, map } from 'rxjs';
import { JobRequest } from '../models';
import { MapDirectionsService } from '@angular/google-maps';
import { UsernameService } from '../username.service';
import { WebSocketService } from '../websocket.service';
import moment from 'moment';

@Component({
  selector: 'app-user-job-details',
  templateUrl: './user-job-details.component.html',
  styleUrl: './user-job-details.component.css'
})
export class UserJobDetailsComponent implements OnInit {

  userUsername!: string
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
  private mapDirectionsService = inject(MapDirectionsService)
  private userSvc = inject(UsernameService)
  private websocketSvc = inject(WebSocketService)

  ngOnInit(): void {
    const usernames = this.activatedRoute.snapshot.params['usernames']
    this.userUsername = usernames.split('-')[0]
    this.ongoingJob$ = this.backendSvc.getOngoingJob(usernames)
    this.ongoingJob$.subscribe(result => this.userSvc.setJobId(result.jobId))
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
        .then(result => jobTime = result.timestamp)
      const ampm: string = jobTime.split(' ')[1]
      var hour: unknown = jobTime.split(':')[0]
      const other = jobTime.split(':')[1]
      var min: unknown = other.split(':')[0]
      if (ampm === 'PM') {
        const hourN: number = Number(hour)
        const minN: number = Number(min)
        const totalSec: number = ((hourN + 12) * 3600) + (minN * 60)
        const etaSec: number = totalSec + durationInSec
        this.eta = moment.utc(etaSec * 1000).format('hh:mm A')
      } else {
        const hourN: number = Number(hour)
        const minN: number = Number(min)
        const totalSec: number = (hourN * 3600) + (minN * 60)
        const etaSec: number = totalSec + durationInSec
        this.eta = moment.utc(etaSec * 1000).format('hh:mm A')
      }
    }
    handleDistance()
  }

  complete(): void {
    const usernames = this.activatedRoute.snapshot.params['usernames']
    this.websocketSvc.completeRequest(usernames)
    this.router.navigate(['/review', usernames])
  }

  back(): void {
    this.router.navigate(['/user-homepage', this.userUsername])
  }

}
