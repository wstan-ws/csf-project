import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { LoginDetails, LoginDetailsSlice } from "./models";

const INIT_STATE: LoginDetailsSlice = {loginDetails: []}

@Injectable()
export class LoginStore extends ComponentStore<LoginDetailsSlice> {

    constructor() {super(INIT_STATE)}

    readonly addLoginDetail = this.updater<LoginDetails>(
        (slice: LoginDetailsSlice, loginDetails: LoginDetails) => {
            const newSlice: LoginDetailsSlice = {
                loginDetails: [...slice.loginDetails, loginDetails]
            }
        return newSlice
        }
    )

    readonly getLoginDetail = this.select(
        (slice: LoginDetailsSlice) => slice.loginDetails
    )

    clearLoginDetail() {
        this.setState({loginDetails: []})
    }
}