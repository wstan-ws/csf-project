import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { ChatRecord } from '../models';

@Component({
  selector: 'app-merchant-conversations',
  templateUrl: './merchant-conversations.component.html',
  styleUrl: './merchant-conversations.component.css'
})
export class MerchantConversationsComponent implements OnInit {

  username!: string
  chats$!: Observable<ChatRecord[]> 

  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.chats$ = this.backendSvc.getConversationsMerchant(this.username)
  }
}
