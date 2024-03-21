import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRecord } from '../models';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-conversations',
  templateUrl: './user-conversations.component.html',
  styleUrl: './user-conversations.component.css'
})
export class UserConversationsComponent implements OnInit {

  username!: string
  chats$!: Observable<ChatRecord[]> 

  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.chats$ = this.backendSvc.getConversationsUser(this.username)
  }

}
