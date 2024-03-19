import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { Message } from '../models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent implements OnInit {

  messageForm!: FormGroup
  merchantUsername!: string
  chat$!: Observable<Message[]>
  usernames!: string

  private activatedRoute = inject(ActivatedRoute)
  private backendSvc = inject(BackendService)
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.usernames = this.activatedRoute.snapshot.params['usernames']
    this.merchantUsername = this.usernames.split('-')[1]
    this.chat$! = this.backendSvc.getChat(this.usernames)
    this.messageForm = this.createMessageForm()
  }

  send(): void {
    const user = this.usernames.split('-')[0]
    const body: Message = {
      username: user,
      message: this.messageForm.value.message,
      timestamp: ''
    }
    this.backendSvc.postMessage(this.usernames, body)
    this.messageForm.reset()
  }

  private createMessageForm(): FormGroup {
    return this.fb.group({
      message: this.fb.control<string>("")
    })
  }


}
