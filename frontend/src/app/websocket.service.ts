import { EventEmitter, Injectable, inject } from "@angular/core";
import { BackendService } from "./backend.service";
import { ChatRecord, JobRequest, Message } from "./models";
declare var SockJS: any;
declare var Stomp: any;

@Injectable()
export class WebSocketService {

    stompClient: any
    msg: Message[] = []
    jobRequests: JobRequest[] = []
    newMessageReceived: EventEmitter<void> = new EventEmitter<void>()

    private backendSvc = inject(BackendService)

    connectAndLoadRequests(merchant: string): void {
        this.backendSvc.getAllJobRequests(merchant)
            .then(result => {
                if (result !== null) {
                    result.forEach(r => this.jobRequests.push(r))
                }
            })
        const serverUrl = 'http://localhost:8080/socket'
        const ws = new SockJS(serverUrl)
        this.stompClient = Stomp.over(ws)
    }

    connectAndLoadMessage(usernames: string): void {
        this.backendSvc.getChat(usernames)
            .then(result => {
                if (result !== null) {
                    result.forEach(r => this.msg.push(r))
                } else {
                    const chatRecord: ChatRecord = {
                        chatId: 0,
                        user: usernames.split('-')[0],
                        merchant: usernames.split('-')[1],
                        lastMessage: '',
                        timestamp: 0
                    }
                    this.backendSvc.postChatRecord(chatRecord).then()
                }
            })
        const serverUrl = 'http://localhost:8080/socket'
        const ws = new SockJS(serverUrl)
        this.stompClient = Stomp.over(ws)
    }

    disconnect(): void {
        this.msg = []
        this.jobRequests = []
        this.stompClient.disconnect()
    }

    subscribeMessage(usernames: string): void {
        const that = this
        this.stompClient.connect({}, function(frame: any) {
            that.stompClient.subscribe(`/message/${usernames}`, (message: any) => {
                if (message) {
                    that.msg.push(JSON.parse(message.body))
                    that.newMessageReceived.emit()
                }
            })
        })
    }

    subscribeRequests(username: string): void {
        const that = this
        this.stompClient.connect({}, function(frame: any) {
            that.stompClient.subscribe(`/message/${username}`, (message: any) => {
                if (message) {
                    console.log('request received from backend')
                    that.jobRequests.push(JSON.parse(message.body))
                }
            })
        })
    }

    sendMessageUser(message: string, usernames: string): void {
        const user = usernames.split('-')[0]
        const body: Message = {
            username: user,
            message: message,
            timestamp: Date.now(),
            role: 'user'
          }
        this.stompClient.send(`/app/send/${usernames}`, {}, JSON.stringify(body))
        this.backendSvc.postMessage(usernames, body)
        const chatRecord: ChatRecord = {
            chatId: 0,
            user: usernames.split('-')[0],
            merchant: usernames.split('-')[1],
            lastMessage: message,
            timestamp: Date.now()
        }
        this.backendSvc.editLastMessage(chatRecord).subscribe()
    }

    sendMessageMerchant(message: string, usernames: string): void {
        const merchant = usernames.split('-')[1]
        const body: Message = {
            username: merchant,
            message: message,
            timestamp: Date.now(),
            role: 'merchant'
          }
        this.stompClient.send(`/app/send/${usernames}`, {}, JSON.stringify(body))
        this.backendSvc.postMessage(usernames, body)
        const chatRecord: ChatRecord = {
            chatId: 0,
            user: usernames.split('-')[0],
            merchant: usernames.split('-')[1],
            lastMessage: message,
            timestamp: Date.now()
        }
        this.backendSvc.editLastMessage(chatRecord).subscribe()
    }

    requestMerchant(usernames: string): void {
        const user = usernames.split('-')[0]
        const merchant = usernames.split('-')[1]
        const body: Message = {
            username: user,
            message: 'NOTICE: '+user+' has requested for ' +merchant+ '\'s service',
            timestamp: Date.now(),
            role: 'user'
            }
        this.stompClient.send(`/app/send/${usernames}`, {}, JSON.stringify(body))
        this.backendSvc.postMessage(usernames, body)
        const chatRecord: ChatRecord = {
            chatId: 0,
            user: usernames.split('-')[0],
            merchant: usernames.split('-')[1],
            lastMessage: 'NOTICE: '+user+' has requested for ' +merchant+ '\'s service',
            timestamp: Date.now()
        }
        this.backendSvc.editLastMessage(chatRecord).subscribe()

        const requestUser: JobRequest = {
            jobId: 0,
            timestamp: Date.now(),
            user: user,
            merchant: merchant,
            userPostalCode: '',
            merchantPostalCode: '',
            status: 0
        }
        this.stompClient.send(`/app/request/${merchant}`, {}, JSON.stringify(requestUser))
        // post new job as pending
        this.backendSvc.postNewJobRequest(requestUser).then()
    }
}