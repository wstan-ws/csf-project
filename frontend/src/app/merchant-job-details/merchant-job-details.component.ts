import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { MapDirectionsService } from '@angular/google-maps';
import { UsernameService } from '../username.service';
import { Observable, lastValueFrom, map } from 'rxjs';
import { JobRequest } from '../models';
import moment from 'moment';

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
  currLat!: number
  currLng!: number
  
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
    const jobId = this.userSvc.getJobId()
    this.merchantUsername = usernames.split('-')[1]
    this.ongoingJob$ = this.backendSvc.getOngoingJob(jobId)

    const location = async() => {
      await this.backendSvc.retrieveCurrLocation()
      .then(result => {
        this.currLat = result.location.lat
        this.currLng = result.location.lng
      })
      var request: google.maps.DirectionsRequest = {
        origin: {
          lat: this.currLat,
          lng: this.currLng
        },
        destination: {
          query: this.userSvc.getUserPostal()
        },
        travelMode: google.maps.TravelMode.DRIVING
      }
      const start: google.maps.LatLngLiteral = {
        lat: this.currLat,
        lng: this.currLng
      }
      this.directionResults$ = this.mapDirectionsService.route(request).pipe(
        map(response => response.result))
        const distance = new google.maps.DistanceMatrixService()
        const disReq: google.maps.DistanceMatrixRequest = {
          origins: [start],
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
          jobTime = jobTime.substring(10).trim()
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
    location()
  }

  back(): void {
    this.router.navigate(['/merchant-homepage', this.merchantUsername])
  }
}
