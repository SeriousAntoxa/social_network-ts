import { ToggleIsFetchingActionType, toggleIsFetching } from "./common-reducer"
import { ResultCodesEnum, authAPI } from "../api/api"
import { FormAction, stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"

const SET_AUTH_DATA = "socialNetwork/auth/SET-AUTH-DATA"
const IS_AUTH_USER = "socialNetwork/auth/IS-AUTH-USER"
const GET_CAPTCHA_URL = "socialNetwork/auth/GET-CAPTCHA-URL"

type InitialStateType = {
    userId: number
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: 0,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
}

type ActionsTypes = SetAuthDataActionType | SetCaptchaUrlActionType | SetIsAuthUserActionType

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
    userId: number
    login: string | null
    email: string | null
}

type SetAuthDataActionType = {
    type: typeof SET_AUTH_DATA
    payload: SetAuthDataActionPayloadType
}

export let setAuthData = (userId: number, login: string | null, email: string | null): SetAuthDataActionType => {
    return {
        type: SET_AUTH_DATA,
        payload: { userId, login, email },
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

type SetIsAuthUserActionType = {
    type: typeof IS_AUTH_USER
    isAuth: boolean
}

export let setIsAuthUser = (isAuth: boolean): SetIsAuthUserActionType => {
    return {
        type: IS_AUTH_USER,
        isAuth,
    }
}

export type ThunkActionType = ThunkAction<Promise<any>, AppStateType, unknown, ActionsTypes | ToggleIsFetchingActionType | FormAction>

export const getAuthUserData = (): ThunkActionType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let responseData = await authAPI.auth()

        if (responseData.resultCode === ResultCodesEnum.Success) {
            let { id, login, email } = responseData.data
            dispatch(setAuthData(id, login, email))
            dispatch(setIsAuthUser(true))
        }

        dispatch(toggleIsFetching(false))
    }
}

export const getCaptchaUrl = (): ThunkActionType => {
    return async (dispatch) => {
        let response = await authAPI.getCaptchaUrl()
        dispatch(setCaptchaUrl(response.data.url))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkActionType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let responseData = await authAPI.login(email, password, rememberMe, captcha)

        if (responseData.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData())
            dispatch(setCaptchaUrl(null))
        } else {
            if (responseData.resultCode === ResultCodesEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }

            let errorMessage =
                responseData.messages.length > 0
                    ? responseData.messages
                    : "Some error"
            dispatch(stopSubmit("login", { _error: errorMessage }))
        }

        dispatch(toggleIsFetching(false))
    }
}

export const logout = (): ThunkActionType => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        let responseData = await authAPI.logout()

        if (responseData.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthData(0, null, null))
            dispatch(setIsAuthUser(false))
        }

        dispatch(toggleIsFetching(false))
    }
}
