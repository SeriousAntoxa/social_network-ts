
import { profileAPI } from "./../api/profile-api"
import { FormAction, stopSubmit } from "redux-form"
import { BaseThunkType } from "./redux-store"
import { ResultCodesEnum } from "../api/api"

const ADD_POST = "socialNetwork/profile/ADD-POST"
const SET_USER_PROFILE = "socialNetwork/profile/SET-USER-PROFILE"
const SET_USER_STATUS = "socialNetwork/profile/SET-USER-STATUS"
const SAVE_PHOTO_SUCCESS = "socialNetwork/profile/SAVE-PHOTO-SUCCESS"

let initialState = {
    posts: [
        { id: 1, message: "some text post 1", likeCounter: 1 },
        { id: 2, message: "some text post 2", likeCounter: 21 },
        { id: 3, message: "some text post 3", likeCounter: 3 },
        { id: 4, message: "some text post 4", likeCounter: 6 },
    ] as Array<PostType>,
    profile: {} as ProfileType,
    status: "no status" as string,
    newPost: null as string | null
}

export type InitialStateType = typeof initialState

export type PostType = {
    id: number
    message: string
    likeCounter: number
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos?: PhotosType
    aboutMe?: string
}

export type ContactsType = {
    github?: string | null
    vk?: string | null
    facebook?: string | null
    instagram?: string | null
    twitter?: string | null
    website?: string | null
    youtube?: string | null
    mainLink?: string | null
}

export type PhotosType = {
    small: string | undefined
    large: string | undefined
}

type ActionsTypes = AddPostType | SetUserProfileType | SetUserStatusType | SavePhotoSuccessType

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let postData: PostType = {
                id: 5,
                message: action.newPost,
                likeCounter: 0,
            }
            return {
                ...state,
                posts: [...state.posts, postData],
                newPost: action.newPost
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: { ...action.profile },
            }
        }

        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }

        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos },
            }
        }

        default:
            return { ...state }
    }
}

export default profileReducer

type AddPostType = {
    type: typeof ADD_POST
    newPost: string
}
export let addPost = (newPost: string): AddPostType => ({ type: ADD_POST, newPost })

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export let setUserProfile = (profile: ProfileType): SetUserProfileType => ({
    type: SET_USER_PROFILE,
    profile,
})

type SetUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}
export let setUserStatus = (status: string): SetUserStatusType => ({
    type: SET_USER_STATUS,
    status,
})

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export let savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos,
})


type ThunkActionType = BaseThunkType<ActionsTypes>
//ThunkCreator
export const getUser = (userId: number): ThunkActionType => {
    //redux-thunk -->
    return async (dispatch) => {
        let responseData = await profileAPI.getUser(userId)
        dispatch(setUserProfile(responseData))
    }
}

export const getStatus = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        let responseData = await profileAPI.getStatus(userId)
        dispatch(setUserStatus(responseData))
    }
}

export const updateStatus = (status: string): ThunkActionType => {
    return async (dispatch) => {
        await profileAPI.updateStatus(status)
        dispatch(setUserStatus(status))
    }
}

export const savePhoto = (file: File): ThunkActionType => {
    return async (dispatch) => {
        let responseData = await profileAPI.savePhoto(file)
        if (responseData.resultCode === ResultCodesEnum.Success) {
            dispatch(savePhotoSuccess(responseData.data.photos))
        }
    }
}

export const saveProfile = (profile: ProfileType): BaseThunkType<ActionsTypes | FormAction> => {
    return async (dispatch, getState) => {
        let state = getState()
        let userId = state.auth.userId
        let responseData = await profileAPI.saveProfile(profile)
        if (responseData.resultCode === ResultCodesEnum.Success) {
            dispatch(getUser(userId))
        } else {
            let errors: any = { contacts: {} as ContactsType }
            responseData.messages.forEach((e: any) => {
                let endStr = e.indexOf("(")
                if (e.includes("Instagram")) {
                    errors.contacts.instagram = e.slice(0, endStr)
                }
                if (e.includes("Github")) {
                    errors.contacts.gitHub = e.slice(0, endStr)
                }
                if (e.includes("Website")) {
                    errors.contacts.webSite = e.slice(0, endStr)
                }
            })
            dispatch(stopSubmit("profileData", errors))
            return Promise.reject(errors)
        }
    }
}
