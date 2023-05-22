import { APIResponseDataType, instants } from "./api"

type AuthResponseDataType = {
        id: number
        email: string
        login: string
}

type LoginResponseDataType = {
        userId: number
}

type getCaptchaUrlResponseDataType = {
    url: string
}

export const authAPI = {
    auth() {
        return instants.get<APIResponseDataType<AuthResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string) {
        return instants.post<APIResponseDataType<LoginResponseDataType>>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return instants.delete<APIResponseDataType>(`auth/login`).then(res => res.data)
    },
    getCaptchaUrl() {
        return instants.get<getCaptchaUrlResponseDataType>(`security/get-captcha-url`).then(res => res.data)
    },
}