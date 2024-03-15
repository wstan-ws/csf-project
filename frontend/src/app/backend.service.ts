import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { LoginDetails, MerchantSignUpDetails, UserSignUpDetails } from "./models";
import { Observable, lastValueFrom } from "rxjs";

@Injectable()
export class BackendService {

    user!: UserSignUpDetails
    merchant!: MerchantSignUpDetails

    private http = inject(HttpClient)

    setUser(user: UserSignUpDetails): void {
        this.user = user
    }

    getUser(): UserSignUpDetails {
        return this.user
    }

    setMerchant(merchant: MerchantSignUpDetails): void {
        this.merchant = merchant
    }

    getMerchant(): MerchantSignUpDetails {
        return this.merchant
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
}