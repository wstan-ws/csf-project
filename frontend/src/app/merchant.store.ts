import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { MerchantSignUpDetails, MerchantSignUpDetailsSlice } from "./models";

const INIT_STATE: MerchantSignUpDetailsSlice = {merchants: []}

@Injectable()
export class MerchantStore extends ComponentStore<MerchantSignUpDetailsSlice> {

    constructor() {super(INIT_STATE)}

    readonly addMerchantSignUpDetails = this.updater<MerchantSignUpDetails>(
        (slice: MerchantSignUpDetailsSlice, merchant: MerchantSignUpDetails) => {
            const newSlice: MerchantSignUpDetailsSlice = {
                merchants: [...slice.merchants, merchant]
            }
        return newSlice
        }
    )

    readonly getMerchantSignUpDetails = this.select(
        (slice: MerchantSignUpDetailsSlice) => slice.merchants
    )

    clearData() {
        this.setState({ merchants: [] });
    }
}