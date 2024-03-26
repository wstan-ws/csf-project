import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Message } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-merchant-chat',
  templateUrl: './merchant-chat.component.html',
  styleUrl: './merchant-chat.component.css'
})
export class MerchantChatComponent implements OnInit, OnDestroy {

  @ViewChild('endOfChat') 
  endOfChat: ElementRef | undefined

  messageForm!: FormGroup
  userUsername!: string
  chat$!: Observable<Message[]>
  usernames!: string

  private activatedRoute = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private router = inject(Router)
  msgSvc = inject(MessageService)

  ngOnInit(): void {
    this.usernames = this.activatedRoute.snapshot.params['usernames']
    this.userUsername = this.usernames.split('-')[0]
    this.msgSvc.connect(this.usernames)
    this.scrollToBottom()
    this.messageForm = this.createMessageForm()
  }

  ngOnDestroy(): void {
    this.msgSvc.disconnect()
  }

  send(): void {
    this.msgSvc.sendMessageMerchant(this.messageForm.value.message, this.usernames)
    this.scrollToBottom()
    this.messageForm.reset()
  }

  back(): void {
    this.router.navigate(['/merchant-conversations', this.usernames.split('-')[1]])
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  private createMessageForm(): FormGroup {
    return this.fb.group({
      message: this.fb.control<string>("")
    })
  }
}