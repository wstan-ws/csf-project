import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { ChatRecord, MerchantSignUpDetails, Message } from '../models';

@Component({
  selector: 'app-merchant-conversations',
  templateUrl: './merchant-conversations.component.html',
  styleUrl: './merchant-conversations.component.css'
})
export class MerchantConversationsComponent implements OnInit {

  username!: string
  merchant$!: Observable<MerchantSignUpDetails>
  chats$!: Observable<ChatRecord[]> 

  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)
  private router = inject(Router)

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.merchant$ = this.backendSvc.getMerchantDetails(this.username)
    this.chats$ = this.backendSvc.getConversationsMerchant(this.username)
  }

  back(): void {
    this.router.navigate(['/merchant-homepage', this.username])
  }
}
