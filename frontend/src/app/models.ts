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
}

export interface MerchantSignUpDetailsSlice {
    merchants: MerchantSignUpDetails[]
}

export interface LoginDetails {
    username: string
    password: string
}

export interface Message {
    username: string
    message: string
    timestamp: number
}

export interface ChatRecord {
    chatId: number
    user: string
    merchant: string
    lastMessage: string
    timestamp: number
}