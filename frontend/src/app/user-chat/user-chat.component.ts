import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from '../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent implements OnInit, OnDestroy {

  @ViewChild('endOfChat') 
  endOfChat: ElementRef | undefined

  messageForm!: FormGroup
  merchantUsername!: string
  chat$!: Observable<Message[]>
  usernames!: string

  private activatedRoute = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private router = inject(Router)
  msgSvc = inject(MessageService)

  ngOnInit(): void {
    this.usernames = this.activatedRoute.snapshot.params['usernames']
    this.merchantUsername = this.usernames.split('-')[1]
    this.msgSvc.connect(this.usernames)
    this.scrollToBottom()
    this.messageForm = this.createMessageForm()
  }

  ngOnDestroy(): void {
    this.msgSvc.disconnect()
  }

  send(): void {
    this.msgSvc.sendMessageUser(this.messageForm.value.message, this.usernames)
    this.scrollToBottom()
    this.messageForm.reset()
  }

  back(): void {
    this.router.navigate(['/user-conversations', this.usernames.split('-')[0]])
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
