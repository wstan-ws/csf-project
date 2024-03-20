import { Injectable, inject } from "@angular/core";
import { BackendService } from "./backend.service";
import { Message } from "./models";
declare var SockJS: any;
declare var Stomp: any;

@Injectable()
export class MessageService {

    stompClient: any
    msg: Message[] = []

    private backendSvc = inject(BackendService)

    connect(usernames: string): void {
        this.backendSvc.getChat(usernames)
            .then(result => {
                if (result !== null) {
                    result.forEach(r => this.msg.push(r))
                }
            })
        const serverUrl = 'http://localhost:8080/socket'
        const ws = new SockJS(serverUrl)
        this.stompClient = Stomp.over(ws)
        const that = this
        this.stompClient.connect({}, function(frame: any) {
            that.stompClient.subscribe('/message', function (message: any) {
                if (message) {
                    that.msg.push(JSON.parse(message.body))
                }
            })
        })
    }

    disconnect(): void {
        this.msg = []
    }

    sendMessage(message: string, usernames: string): void {
        const user = usernames.split('-')[0]
        const body: Message = {
            username: user,
            message: message,
            timestamp: Date.now()
          }
        this.stompClient.send('/app/send', {}, JSON.stringify(body))
        this.backendSvc.postMessage(usernames, body)
    }
     
}