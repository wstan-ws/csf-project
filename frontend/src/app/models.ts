import { MerchantInitialState } from "./store/merchant.reducer"

export interface UserSignUpDetails {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address: string
    postalCode: string
    username: string
    password: string
}

export interface MerchantSignUpDetails {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    companyName: string
    postalCode: string
    username: string
    password: string
    elec: boolean
    elecLicenseNo: string
    plum: boolean
    plumLicenseNo: string
    aircon: boolean
    airconLicenseNo: string
    active: boolean
    rating: string
}

export interface LoginDetails {
    username: string
    password: string
}

export interface Message {
    username: string
    message: string
    timestamp: string
    role: string
    receiver: string
}

export interface ChatRecord {
    chatId: number
    user: string
    merchant: string
    lastMessage: string
    timestamp: number
}

export interface JobRequest {
    jobId: string
    timestamp: string
    user: string
    merchant: string
    type: string
    scheduledDate: string
    scheduledTime: string
    userPostalCode: string
    merchantPostalCode: string
    status: number
    completedTimestamp: string
}

export interface Review {
    reviewId: number
    jobId: string
    rating: number
    comments: string
    date: string
    time: string
}

export interface PostReview {
    user: string
    comments: string
    rating: number
    date: string
}

export interface Joke {
    joke: string
}

export interface AppState {
    merchantDetails: MerchantInitialState
}