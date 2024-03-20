import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
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

  messageForm!: FormGroup
  merchantUsername!: string
  chat$!: Observable<Message[]>
  usernames!: string

  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)
  private fb = inject(FormBuilder)
  msgSvc = inject(MessageService)

  ngOnInit(): void {
    this.usernames = this.activatedRoute.snapshot.params['usernames']
    this.merchantUsername = this.usernames.split('-')[1]
    this.msgSvc.connect(this.usernames)
    this.messageForm = this.createMessageForm()
  }

  ngOnDestroy(): void {
    this.msgSvc.disconnect()
  }

  send(): void {
    this.msgSvc.sendMessage(this.messageForm.value.message, this.usernames)
    this.messageForm.reset()
  }

  private createMessageForm(): FormGroup {
    return this.fb.group({
      message: this.fb.control<string>("")
    })
  }


}
