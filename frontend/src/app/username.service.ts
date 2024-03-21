import { Injectable } from "@angular/core";
import { MerchantSignUpDetails, UserSignUpDetails } from "./models";

Injectable()
export class UsernameService {

    user!: UserSignUpDetails
    merchant!: MerchantSignUpDetails
    active!: Boolean

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

    setActivity(status: Boolean): void {
        this.active = status
    }

    getActivity(): Boolean {
        return this.active
    }
}