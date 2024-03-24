import { Injectable } from "@angular/core";
import { MerchantSignUpDetails, UserSignUpDetails } from "./models";

Injectable()
export class UsernameService {

    user!: UserSignUpDetails
    merchant!: MerchantSignUpDetails
    active!: boolean

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
}