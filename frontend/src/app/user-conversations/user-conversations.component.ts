import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRecord, UserSignUpDetails } from '../models';
import { BackendService } from '../backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-conversations',
  templateUrl: './user-conversations.component.html',
  styleUrl: './user-conversations.component.css'
})
export class UserConversationsComponent implements OnInit {

  username!: string
  user$!: Observable<UserSignUpDetails>
  chats$!: Observable<ChatRecord[]> 

  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)
  private router = inject(Router)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.user$ = this.backendSvc.getUserDetails(this.username)
    this.chats$ = this.backendSvc.getConversationsUser(this.username)
  }

  back(): void {
    this.router.navigate(['/user-homepage', this.username])
  }
}
