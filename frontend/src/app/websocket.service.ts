import { EventEmitter, Injectable, inject } from "@angular/core";
import { BackendService } from "./backend.service";
import { ChatRecord, JobRequest, Message } from "./models";
import { v4 as uuidv4 } from 'uuid';
declare var SockJS: any;
declare var Stomp: any;

@Injectable()
export class WebSocketService {

    stompClient: any
    msg: Message[] = []
    jobRequests: JobRequest[] = []
    acceptedJobs: JobRequest[] = []
    ongoingService: JobRequest[] = []
    newChat: Message[] = []
    newMessageReceived: EventEmitter<void> = new EventEmitter<void>()

    private backendSvc = inject(BackendService)

    connect(): void {
        const serverUrl = 'http://localhost:8080/socket'
            const ws = new SockJS(serverUrl)
            this.stompClient = Stomp.over(ws)
            this.stompClient.connect({}, () => {
                console.log('WebSocket connected, Services Loaded');
            })
    }

    connectAndLoadServices(user: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.backendSvc.getAllUserServices(user)
            .then(result => {
                if (result !== null) {
                    result.forEach(r => this.ongoingService.push(r))
                }
            })
            const serverUrl = 'http://localhost:8080/socket'
            const ws = new SockJS(serverUrl)
            this.stompClient = Stomp.over(ws)
            this.stompClient.connect({}, () => {
                console.log('WebSocket connected, Services Loaded');
                resolve()
            }, (error: any) => {
                reject(error)
            })
        })
    }

    connectAndLoadRequests(merchant: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.backendSvc.getAllJobRequests(merchant)
            .then(result => {
                if (result !== null) {
                    result.forEach(r => this.jobRequests.push(r))
                }
            })
            this.backendSvc.getAllAcceptedJobs(merchant)
                .then(result => {
                    if (result !== null) {
                        result.forEach(r => this.acceptedJobs.push(r))
                    }
                })
            const serverUrl = 'http://localhost:8080/socket'
            const ws = new SockJS(serverUrl)
            this.stompClient = Stomp.over(ws)
            this.stompClient.connect({}, () => {
                console.log('WebSocket connected, Requests Loaded')
                resolve()
            }, (error: any) => {
                reject(error)
            })
        })
    }

    connectAndLoadMessage(usernames: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
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
            this.stompClient.connect({}, () => {
                console.log('WebSocket connected, Messages Loaded')
                resolve()
            }, (error: any) => {
                reject(error)
            })
        })
    }

    disconnect(): void {
        this.msg = []
        this.jobRequests = []
        this.acceptedJobs = []
        this.ongoingService = []
        this.stompClient.disconnect()
    }

    subscribeMessage(usernames: string): void {
        const that = this
        that.stompClient.subscribe(`/message/${usernames}`, (message: any) => {
            if (message) {
                that.msg.unshift(JSON.parse(message.body))
                that.newMessageReceived.emit()
            }
        })
    }

    subscribeNotification(username: string): void {
        const that = this
        that.stompClient.subscribe(`/message`, (message: any) => {
            if (message) {
                if (JSON.parse(message.body).receiver === username) {
                    that.newChat.unshift(JSON.parse(message.body))
                }
            }
        })
    }

    subscribeRequests(username: string): void {
        const that = this
        that.stompClient.subscribe(`/message/${username}`, (message: any) => {
            if (message) {
                that.jobRequests.unshift(JSON.parse(message.body))
            }
        })
    }

    subscribeServices(username: string): void {
        const that = this
        that.stompClient.subscribe(`/message/accepted/${username}`, (message: any) => {
            if (message) {
                that.ongoingService.unshift(JSON.parse(message.body))
            }
        })
    }

    sendMessageUser(message: string, usernames: string): void {
        const user = usernames.split('-')[0]
        const merchant = usernames.split('-')[1]
        const body: Message = {
            username: user,
            message: message,
            timestamp: new Date().toLocaleString(),
            role: 'user',
            receiver: merchant
          }
        this.stompClient.send(`/app/send/${usernames}`, {}, JSON.stringify(body))
        this.stompClient.send('/app/send', {}, JSON.stringify(body))
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
        const user = usernames.split('-')[0]
        const body: Message = {
            username: merchant,
            message: message,
            timestamp: new Date().toLocaleString(),
            role: 'merchant',
            receiver: user
          }
        this.stompClient.send(`/app/send/${usernames}`, {}, JSON.stringify(body))
        this.stompClient.send('/app/send', {}, JSON.stringify(body))
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

    requestMerchant(usernames: string, type: string, date: string, time: string): void {
        const user = usernames.split('-')[0]
        const merchant = usernames.split('-')[1]
        const body: Message = {
            username: user,
            message: 'NOTICE: '+user+' has requested for ' +merchant+ '\'s service',
            timestamp: new Date().toLocaleString(),
            role: 'user',
            receiver: merchant
            }
        this.stompClient.send(`/app/send/${usernames}`, {}, JSON.stringify(body))
        this.stompClient.send('/app/send', {}, JSON.stringify(body))
        this.backendSvc.postMessage(usernames, body)
        const chatRecord: ChatRecord = {
            chatId: 0,
            user: usernames.split('-')[0],
            merchant: usernames.split('-')[1],
            lastMessage: 'NOTICE: '+user+' has requested for ' +merchant+ '\'s service',
            timestamp: Date.now()
        }
        this.backendSvc.editLastMessage(chatRecord).subscribe()
        const myuuid = uuidv4();
        const requestUser: JobRequest = {
            jobId: myuuid,
            timestamp: new Date().toLocaleString(),
            user: user,
            merchant: merchant,
            type: type,
            scheduledDate: date,
            scheduledTime: time,
            userPostalCode: '',
            merchantPostalCode: '',
            status: 0,
            completedTimestamp: ''
        }
        this.stompClient.send(`/app/request/${merchant}`, {}, JSON.stringify(requestUser))
        this.backendSvc.postNewJobRequest(requestUser).then()
    }

    acceptRequest(user: string, merchant: string, type: string, scheduledDate: string, scheduledTime: string, jobId: string): void {
        this.jobRequests = this.jobRequests.filter(job => job.user !== user)
        const acceptedRequest: JobRequest = {
            jobId: jobId,
            timestamp: new Date().toLocaleString(),
            user: user,
            merchant: merchant,
            type: type,
            scheduledDate: scheduledDate,
            scheduledTime: scheduledTime,
            userPostalCode: '',
            merchantPostalCode: '',
            status: 1,
            completedTimestamp: ''
        }
        this.acceptedJobs.unshift(acceptedRequest)
        const usernames = user+'-'+merchant
        this.backendSvc.editJobRequestStatus(usernames, acceptedRequest)
            .subscribe()
        const body: Message = {
            username: merchant.trim(),
            message: 'NOTICE: '+merchant+' has accepted ' +user+ '\'s request',
            timestamp: new Date().toLocaleString(),
            role: 'merchant',
            receiver: user
            }
        this.stompClient.send(`/app/send/${usernames}`, {}, JSON.stringify(body))
        this.stompClient.send('/app/send', {}, JSON.stringify(body))
        this.backendSvc.postMessage(usernames, body)
        const chatRecord: ChatRecord = {
            chatId: 0,
            user: usernames.split('-')[0],
            merchant: usernames.split('-')[1],
            lastMessage: 'NOTICE: '+merchant+' has accepted ' +user+ '\'s request',
            timestamp: Date.now()
        }
        this.backendSvc.editLastMessage(chatRecord).subscribe()
        this.stompClient.send(`/app/request/accepted/${user}`, {}, JSON.stringify(acceptedRequest))
    }

    rejectRequest(user: string, merchant: string): void {
        this.jobRequests = this.jobRequests.filter(job => job.user !== user)
        const rejectedRequest: JobRequest = {
            jobId: '',
            timestamp: new Date().toLocaleString(),
            user: user,
            merchant: merchant,
            type: '',
            scheduledDate: '',
            scheduledTime: '',
            userPostalCode: '',
            merchantPostalCode: '',
            status: 2,
            completedTimestamp: ''
        }
        const usernames = user+'-'+merchant
        this.backendSvc.editJobRequestStatus(usernames, rejectedRequest)
            .subscribe()
        const body: Message = {
            username: merchant.trim(),
            message: 'NOTICE: '+merchant+' has rejected ' +user+ '\'s request',
            timestamp: new Date().toLocaleString(),
            role: 'merchant',
            receiver: user
            }
        this.stompClient.send(`/app/send/${usernames}`, {}, JSON.stringify(body))
        this.stompClient.send('/app/send', {}, JSON.stringify(body))
        this.backendSvc.postMessage(usernames, body)
        const chatRecord: ChatRecord = {
            chatId: 0,
            user: usernames.split('-')[0],
            merchant: usernames.split('-')[1],
            lastMessage: 'NOTICE: '+merchant+' has rejected ' +user+ '\'s request',
            timestamp: Date.now()
        }
        this.backendSvc.editLastMessage(chatRecord).subscribe()
    }

    completeRequest(usernames: string, jobId: string): void {
        const user: string = usernames.split('-')[0]
        const merchant: string = usernames.split('-')[1]
        const completedRequest: JobRequest = {
            jobId: jobId,
            timestamp: '',
            user: user,
            merchant: merchant,
            type: '',
            scheduledDate: '',
            scheduledTime: '',
            userPostalCode: '',
            merchantPostalCode: '',
            status: 3,
            completedTimestamp: new Date().toLocaleString()
        }
        this.backendSvc.completeJobRequest(usernames, completedRequest).subscribe()
        this.acceptedJobs = this.acceptedJobs.filter(job => job.user !== user)
    }

    enterChatUser(usernames: string): void {
        const merchant: string = usernames.split('-')[1]
        this.newChat = this.newChat.filter(chat => chat.username !== merchant)
    }

    enterChatMerchant(usernames: string): void {
        const user: string = usernames.split('-')[0]
        this.newChat = this.newChat.filter(chat => chat.username !== user)
    }
}