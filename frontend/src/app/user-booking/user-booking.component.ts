import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrl: './user-booking.component.css'
})
export class UserBookingComponent implements OnInit {

  usernames!: string
  bookingForm!: FormGroup
  time: string[] = [
    '12:00 AM', '12:15 AM', '12:30 AM', '12:45 AM', '1:00 AM', '1:15 AM', '1:30 AM', '1:45 AM',
    '2:00 AM', '2:15 AM', '2:30 AM', '2:45 AM', '3:00 AM', '3:15 AM', '3:30 AM', '3:45 AM',
    '4:00 AM', '4:15 AM', '4:30 AM', '4:45 AM', '5:00 AM', '5:15 AM', '5:30 AM', '5:45 AM',
    '6:00 AM', '6:15 AM', '6:30 AM', '6:45 AM', '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM',
    '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM', '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM',
    '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM',
    '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM',
    '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM', '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM',
    '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM', '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM',
    '6:00 PM', '6:15 PM', '6:30 PM', '6:45 PM', '7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM',
    '8:00 PM', '8:15 PM', '8:30 PM', '8:45 PM', '9:00 PM', '9:15 PM', '9:30 PM', '9:45 PM',
    '10:00 PM', '10:15 PM', '10:30 PM', '10:45 PM', '11:00 PM', '11:15 PM', '11:30 PM', '11:45 PM'
  ]
  minDate: Date = new Date()

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private websocketSvc = inject(WebSocketService)

  ngOnInit(): void {
    this.websocketSvc.connect()
    this.usernames = this.activatedRoute.snapshot.params['usernames']
    this.bookingForm = this.createBookingForm()
  }

  back(): void {
    this.router.navigate(['/userchat', this.usernames])
  }

  book(): void {
    const type = this.bookingForm.value.type
    var date = this.bookingForm.value.date
    date = date.toLocaleString().split(',')[0]
    const time = this.bookingForm.value.time
    this.websocketSvc.requestMerchant(this.usernames, type, date, time)
    this.router.navigate(['/userchat', this.usernames])
  }

  private createBookingForm(): FormGroup {
    return this.fb.group({
      type: this.fb.control<string>("On-Demand"),
      date: this.fb.control<string>(""),
      time: this.fb.control<string>("")
    })
  }
}
