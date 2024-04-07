import { createSelector } from "@ngrx/store";
import { MerchantInitialState } from "./merchant.reducer";
import { AppState } from "../models";

export const selectMerchants = (state: AppState) => state.merchantDetails
export const selectMerchant = createSelector(
    selectMerchants,
    (state: MerchantInitialState) => state.merchantDetails
)