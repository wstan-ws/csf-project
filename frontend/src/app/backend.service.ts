import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { LoginDetails, MerchantSignUpDetails, UserSignUpDetails } from "./models";
import { Observable, lastValueFrom } from "rxjs";

@Injectable()
export class BackendService {

    user!: UserSignUpDetails

    private http = inject(HttpClient)

    setUser(user: UserSignUpDetails): void {
        this.user = user
    }

    getUser(): UserSignUpDetails {
        return this.user
    }

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
}