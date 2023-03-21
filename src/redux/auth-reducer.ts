import { toggleIsFetching } from "./common-reducer"
import { authAPI } from "../api/api"
import { stopSubmit } from "redux-form"

const SET_AUTH_DATA = "socialNetwork/auth/SET-AUTH-DATA"
const IS_AUTH_USER = "socialNetwork/auth/IS-AUTH-USER"
const GET_CAPTCHA_URL = "socialNetwork/auth/GET-CAPTCHA-URL"

type InitialStateType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
}

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case IS_AUTH_USER:
            return {
                ...state,
                isAuth: action.isAuth,
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }
        default: {
            return { ...state }
        }
    }
}

export default authReducer

type SetAuthDataActionPayloadType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

type SetAuthDataActionType = {
    type: typeof SET_AUTH_DATA
    payload: SetAuthDataActionPayloadType
}

export let setAuthData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthDataActionType => {
    return {
        type: SET_AUTH_DATA,
        payload: { userId, login, email, isAuth },
    }
}

type SetCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL
    captchaUrl: string | null
}

export let setCaptchaUrl = (captchaUrl: string | null): SetCaptchaUrlActionType => {
    return {
        type: GET_CAPTCHA_URL,
        captchaUrl,
    }
}

export const getAuthUserData = () => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        let response = await authAPI.auth()

        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data
            dispatch(setAuthData(id, login, email, true))
        }

        dispatch(toggleIsFetching(false))
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        let response = await authAPI.getCaptchaUrl()
        dispatch(setCaptchaUrl(response.data.url))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        let response = await authAPI.login(email, password, rememberMe, captcha)

        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
            dispatch(setCaptchaUrl(null))
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }

            let errorMessage =
                response.data.messages.length > 0
                    ? response.data.messages
                    : "Some error"
            dispatch(stopSubmit("login", { _error: errorMessage }))
        }

        dispatch(toggleIsFetching(false))
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        let response = await authAPI.logout()

        if (response.data.resultCode === 0) {
            dispatch(setAuthData(null, null, null, false))
        }

        dispatch(toggleIsFetching(false))
    }
}
