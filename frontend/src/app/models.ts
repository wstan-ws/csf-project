export interface UserSignUpDetails {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address: string
    username: string
    password: string
}

export interface MerchantSignUpDetails {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    companyName: string
    username: string
    password: string
    elec: boolean
    elecLicenseNo: string
    plum: boolean
    plumLicenseNo: string
    aircon: boolean
    airconLicenseNo: string
}

export interface LoginDetails {
    username: string
    password: string
}