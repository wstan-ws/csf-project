import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { MerchantSignUpDetails, UserSignUpDetails } from "./models";
import { Observable, lastValueFrom } from "rxjs";

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

    getUsernameList(): Promise<any> {
        const url: string = 'http://localhost:8080/api/usernamelist'
        return lastValueFrom(this.http.get(url)) 
    }
}