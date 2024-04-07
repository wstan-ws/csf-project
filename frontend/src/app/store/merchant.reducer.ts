import { createReducer, on } from "@ngrx/store";
import { MerchantSignUpDetails } from "../models";
import { reset, save } from "./merchant.actions";

export interface MerchantInitialState {
    merchantDetails: MerchantSignUpDetails[]
}

export const initialState: MerchantInitialState = {
    merchantDetails: []
}

export const merchantReducer = createReducer(
    initialState,
    on(save, (state, { details }) => ({
        ...state,
        merchantDetails: [...state.merchantDetails, details]
    })),
    on(reset, (state) => ({
        merchantDetails: []
    }))
)

