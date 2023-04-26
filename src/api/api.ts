import axios from "axios"
import { ProfileType } from "../redux/profile-reducer"
import { AsExpression } from "typescript"

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

const instants = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "9a18a34d-8ece-4542-91d5-deb842c499ad",
    },
})

export const usersAPI = {
    getUsers(countItemsPerPage: number, page: number) {
        return instants.get(`users?page=${page}&count=${countItemsPerPage}`)
    },
    followUsers(userId: number) {
        return instants.post(`follow/${userId}`)
    },
    unfollowUsers(userId: number) {
        return instants.delete(`follow/${userId}`)
    },
}

type AuthResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type getCaptchaUrlResponseType = {
    url: string
}

export const authAPI = {
    auth() {
        return instants.get<AuthResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string) {
        return instants.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return instants.delete<LogoutResponseType>(`auth/login`).then(res => res.data)
    },
    getCaptchaUrl() {
        return instants.get<getCaptchaUrlResponseType>(`security/get-captcha-url`)
    },
}

type getUserResponseType = ProfileType

export const profileAPI = {
    getUser(userId: number) {
        return instants.get<getUserResponseType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instants.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instants.put(`profile/status`, { status })
    },
    savePhoto(photoFile: any) {
        let formData = new FormData()
        formData.append("image", photoFile)

        return instants.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    },
    saveProfile(profile: ProfileType) {
        return instants.put(`profile`, profile)
    },
}
