import { createAction, props } from "@ngrx/store";
import { MerchantSignUpDetails } from "../models";


export const save = createAction('[Merchant Details] Saved', props<{details: MerchantSignUpDetails}>())
export const reset = createAction('[Merchant Details] Reset')