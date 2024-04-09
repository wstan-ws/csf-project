import { Injectable } from "@angular/core";
import { MerchantSignUpDetails, UserSignUpDetails } from "./models";

Injectable()
export class UsernameService {

    user!: UserSignUpDetails
    merchant!: MerchantSignUpDetails
    active!: boolean
    userPostal!: string
    merchantPostal!: string
    jobId!: string

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

    setActivity(status: boolean): void {
        this.active = status
    }

    getActivity(): boolean {
        return this.active
    }

    setUserPostal(userPostal: string): void {
        this.userPostal = userPostal
    }

    getUserPostal(): string {
        return this.userPostal
    }

    setMerchantPostal(merchantPostal: string): void {
        this.merchantPostal = merchantPostal
    }

    getMerchantPostal(): string {
        return this.merchantPostal
    }

    setJobId(jobId: string): void {
        this.jobId = jobId
    }

    getJobId(): string {
        return this.jobId
    }
}