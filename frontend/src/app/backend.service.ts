import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ChatRecord, JobRequest, Joke, LoginDetails, MerchantSignUpDetails, Message, PostReview, Review, UserSignUpDetails } from "./models";
import { Observable, last, lastValueFrom } from "rxjs";

@Injectable()
export class BackendService {

    private http = inject(HttpClient)

    userSignup(body: UserSignUpDetails): Promise<any> {
        const url: string = 'http://localhost:8080/api/usersignup'
        return lastValueFrom(this.http.post<UserSignUpDetails>(url, body)) 
    }

    merchantSignup(body: MerchantSignUpDetails): Observable<any> {
        const url: string = 'http://localhost:8080/api/merchantsignup'
        return this.http.post<MerchantSignUpDetails>(url, body)
    }

    getUserLoginDetails(): Promise<LoginDetails[]> {
        const url: string = 'http://localhost:8080/api/userlogindetails'
        return lastValueFrom(this.http.get<LoginDetails[]>(url)) 
    }

    getMerchantLoginDetails(): Promise<LoginDetails[]> {
        const url: string = 'http://localhost:8080/api/merchantlogindetails'
        return lastValueFrom(this.http.get<LoginDetails[]>(url)) 
    }

    getUserDetails(filter: string): Observable<UserSignUpDetails> {
        const url: string = `http://localhost:8080/api/userdetails/${filter}`
        return this.http.get<UserSignUpDetails>(url)
    }

    editUserDetails(filter: string, body: any): Observable<any> {
        const url: string = `http://localhost:8080/api/edituserdetails/${filter}`
        return this.http.patch(url, body)
    }

    editUserPassword(filter: string, body: any): Observable<any> {
        const url: string = `http://localhost:8080/api/edituserpassword/${filter}`
        return this.http.patch(url, body)
    }

    getMerchantDetails(filter: string): Observable<MerchantSignUpDetails> {
        const url: string = `http://localhost:8080/api/merchantdetails/${filter}`
        return this.http.get<MerchantSignUpDetails>(url)
    }

    editMerchantDetails(filter: string, body: any): Observable<any> {
        const url: string = `http://localhost:8080/api/editmerchantdetails/${filter}`
        return this.http.patch(url, body)
    }

    editMerchantPassword(filter: string, body: any): Observable<any> {
        const url: string = `http://localhost:8080/api/editmerchantpassword/${filter}`
        return this.http.patch(url, body)
    }

    getElectricians(): Observable<MerchantSignUpDetails[]> {
        const url: string = 'http://localhost:8080/api/getelectricians'
        return this.http.get<MerchantSignUpDetails[]>(url)
    }

    getPlumbers(): Observable<MerchantSignUpDetails[]> {
        const url: string = 'http://localhost:8080/api/getplumbers'
        return this.http.get<MerchantSignUpDetails[]>(url)
    }

    getAircons(): Observable<MerchantSignUpDetails[]> {
        const url: string = 'http://localhost:8080/api/getaircons'
        return this.http.get<MerchantSignUpDetails[]>(url)
    }

    setActive(filter: string, body: boolean): Promise<any> {
        const url: string = `http://localhost:8080/api/setactive/${filter}`
        return lastValueFrom(this.http.patch(url, body)) 
    }

    getChat(filter: string): Promise<Message[]> {
        const url: string = `http://localhost:8080/api/chat/${filter}`
        return lastValueFrom(this.http.get<Message[]>(url)) 
    }

    postMessage(filter: string, body: Message): Promise<any> {
        const url: string = `http://localhost:8080/api/chat/post/${filter}`
        return lastValueFrom(this.http.post<Message>(url, body))
    }

    postChatRecord(body: ChatRecord): Promise<any> {
        const url: string = 'http://localhost:8080/api/postchat'
        return lastValueFrom(this.http.post<ChatRecord>(url, body))
    }

    getConversationsMerchant(filter: string): Observable<ChatRecord[]> {
        const url: string = `http://localhost:8080/api/getconversationsmerchant/${filter}`
        return this.http.get<ChatRecord[]>(url)
    }

    getConversationsUser(filter: string): Observable<ChatRecord[]> {
        const url: string = `http://localhost:8080/api/getconversationsuser/${filter}`
        return this.http.get<ChatRecord[]>(url)
    }

    editLastMessage(body: ChatRecord): Observable<any> {
        const url: string = 'http://localhost:8080/api/editlastmessage'
        return this.http.patch(url, body)
    }

    postNewJobRequest(body: JobRequest): Promise<any> {
        const url: string = 'http://localhost:8080/api/postnewjobrequest'
        return lastValueFrom(this.http.post<JobRequest>(url, body))
    }

    getAllJobRequests(filter: string): Promise<JobRequest[]> {
        const url: string = `http://localhost:8080/api/getalljobrequests/${filter}`
        return lastValueFrom(this.http.get<JobRequest[]>(url)) 
    }

    editJobRequestStatus(filter: string, body: JobRequest): Observable<any> {
        const url: string = `http://localhost:8080/api/editjobrequeststatus/${filter}`
        return this.http.patch(url, body)
    }

    getAllAcceptedJobs(filter: string): Promise<JobRequest[]> {
        const url: string = `http://localhost:8080/api/getallacceptedjobs/${filter}`
        return lastValueFrom(this.http.get<JobRequest[]>(url))
    }

    getAllUserServices(filter: string): Promise<JobRequest[]> {
        const url: string = `http://localhost:8080/api/getalluserservices/${filter}`
        return lastValueFrom(this.http.get<JobRequest[]>(url))
    }

    getOngoingJob(filter: string): Observable<JobRequest> {
        const url: string = `http://localhost:8080/api/getongoingjob/${filter}`
        return this.http.get<JobRequest>(url)
    }

    completeJobRequest(filter: string, body: JobRequest): Observable<any> {
        const url: string = `http://localhost:8080/api/completejobrequest/${filter}`
        return this.http.patch(url, body)
    }

    postReview(filter: string, body: Review): Promise<any> {
        const url: string = `http://localhost:8080/api/postreview/${filter}`
        return lastValueFrom(this.http.post<Review>(url, body))
    }

    getReviewByMerchant(filter: string): Observable<PostReview[]> {
        const url: string = `http://localhost:8080/api/getreviews/${filter}`
        return this.http.get<PostReview[]>(url)
    }

    getUserJobHistory(filter: string): Observable<JobRequest[]> {
        const url: string = `http://localhost:8080/api/getuserjobhistory/${filter}`
        return this.http.get<JobRequest[]>(url)
    }

    getMerchantJobHistory(filter: string): Observable<JobRequest[]> {
        const url: string = `http://localhost:8080/api/getmerchantjobhistory/${filter}`
        return this.http.get<JobRequest[]>(url)
    }

    findMerchantByNameE(filter: string): Observable<MerchantSignUpDetails[]> {
        const url: string = `http://localhost:8080/api/findmerchantbynamee?name=${filter}`
        return this.http.get<MerchantSignUpDetails[]>(url)
    }

    findMerchantByNameA(filter: string): Observable<MerchantSignUpDetails[]> {
        const url: string = `http://localhost:8080/api/findmerchantbynamea?name=${filter}`
        return this.http.get<MerchantSignUpDetails[]>(url)
    }

    findMerchantByNameP(filter: string): Observable<MerchantSignUpDetails[]> {
        const url: string = `http://localhost:8080/api/findmerchantbynamep?name=${filter}`
        return this.http.get<MerchantSignUpDetails[]>(url)
    }

    getDadJoke(): Observable<Joke> {
        const url: string = 'http://localhost:8080/api/getdadjoke'
        return this.http.get<Joke>(url)
    }

    retrieveCurrLocation(): Promise<any> {
        const apiKey = 'AIzaSyCWbhx1cWSqlc2qYafobggsmzCJiuJCKsg'
        const url: string = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`
        return lastValueFrom(this.http.post(url, {})) 
    }

    cancelJobRequest(filter: string, body: JobRequest): Observable<any> {
        const url: string = `http://localhost:8080/api/canceljobrequest/${filter}`
        return this.http.patch<string>(url, body)
    }
}