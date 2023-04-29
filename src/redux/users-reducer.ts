import { ToggleIsFetchingActionType, toggleIsFetching } from "./common-reducer"
import { usersAPI } from "./../api/api"
import { PhotosType } from "./profile-reducer"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"

const FOLLOW = "socialNetwork/users/FOLLOW"
const UNFOLLOW = "socialNetwork/users/UNFOLLOW"
const SET_USERS = "socialNetwork/users/SET-USERS"
const SET_TOTAL_ITEMS_COUNT = "socialNetwork/users/SET-TOTAL-ITEMS-COUNT"
const SET_CURRENT_PAGE = "socialNetwork/users/SET-CURRENT-PAGE"
const SET_COUNT_ITEMS_PER_PAGE = "socialNetwork/users/SET-COUNT-ITEMS-PER-PAGE"
const TOGGLE_IS_FOLLOWING = "socialNetwork/users/TOGGLE-IS-FOLLOWING"

export type UserType = {
    id: number
    name: string
    status: string | null
    photos: PhotosType
    followed: boolean
}

let initialState = {
    users: [] as Array<UserType | null>,
    currentPage: 1 as number,
    totalItemsCount: 0 as number,
    countItemsPerPage: 50 as number,
    isFollowing: [] as Array<number>,
    portionSize: 10 as number,
}

type InitialStateType = typeof initialState

type ActionsTypes = SetFollowType | setUnfollowType |
    SetUsersType | SetTotalItemsCountType | SetCurrentPageType |
    SetCountItemsPerPageType | ToggleIsFollowingType

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (!!u) {
                        if (u.id === action.userId) {
                            return {
                                ...u,
                                followed: true,
                            }
                        }
                        return u
                    } else return null
                }),
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (!!u) {
                        if (u.id === action.userId) {
                            return {
                                ...u,
                                followed: false,
                            }
                        }
                        return u
                    } else return null
                }),
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users,
            }
        }
        case SET_TOTAL_ITEMS_COUNT: {
            return {
                ...state,
                totalItemsCount: action.totalItemsCount,
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage,
            }
        }
        case SET_COUNT_ITEMS_PER_PAGE: {
            return {
                ...state,
                countItemsPerPage: action.countItemsPerPage,
            }
        }
        case TOGGLE_IS_FOLLOWING: {
            return {
                ...state,
                isFollowing: action.isFetching
                    ? [...state.isFollowing, action.userId]
                    : state.isFollowing.filter((id) => id !== action.userId),
            }
        }
        default:
            return { ...state }
    }
}

export default usersReducer

type SetFollowType = {
    type: typeof FOLLOW
    userId: number
}
export let setFollow = (userId: number): SetFollowType => {
    return {
        type: FOLLOW,
        userId: userId,
    }
}

type setUnfollowType = {
    type: typeof UNFOLLOW
    userId: number
}
export let setUnfollow = (userId: number): setUnfollowType => {
    return {
        type: UNFOLLOW,
        userId: userId,
    }
}

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export let setUsers = (users: Array<UserType>): SetUsersType => {
    return {
        type: SET_USERS,
        users,
    }
}

type SetTotalItemsCountType = {
    type: typeof SET_TOTAL_ITEMS_COUNT
    totalItemsCount: number
}
export let setTotalItemsCount = (totalItemsCount: number): SetTotalItemsCountType => {
    return {
        type: SET_TOTAL_ITEMS_COUNT,
        totalItemsCount,
    }
}

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export let setCurrentPage = (currentPage: number): SetCurrentPageType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    }
}

type SetCountItemsPerPageType = {
    type: typeof SET_COUNT_ITEMS_PER_PAGE
    countItemsPerPage: number
}
export let setCountItemsPerPage = (countItemsPerPage: number): SetCountItemsPerPageType => {
    return {
        type: SET_COUNT_ITEMS_PER_PAGE,
        countItemsPerPage,
    }
}

type ToggleIsFollowingType = {
    type: typeof TOGGLE_IS_FOLLOWING
    isFetching: boolean
    userId: number
}
export let toggleIsFollowing = (isFetching: boolean, userId: number): ToggleIsFollowingType => {
    return {
        type: TOGGLE_IS_FOLLOWING,
        isFetching,
        userId,
    }
}


type ThunkActionType = ThunkAction<Promise<any>, AppStateType, unknown, ActionsTypes | ToggleIsFetchingActionType>
//ThunkCreator
export const requestUsers = (countItemsPerPage: number, page: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        dispatch(setCountItemsPerPage(countItemsPerPage))
        let response = await usersAPI.getUsers(countItemsPerPage, page)
        dispatch(setUsers(response.data.items))
        dispatch(setTotalItemsCount(response.data.totalCount))
        dispatch(toggleIsFetching(false))
    }
}

export const follow = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(toggleIsFollowing(true, userId))
        let response = await usersAPI.followUsers(userId)

        if (response.data.resultCode === 0) {
            dispatch(setFollow(userId))
        }

        dispatch(toggleIsFollowing(false, userId))
    }
}

export const unfollow = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(toggleIsFollowing(true, userId))
        let response = await usersAPI.unfollowUsers(userId)

        if (response.data.resultCode === 0) {
            dispatch(setUnfollow(userId))
        }

        dispatch(toggleIsFollowing(false, userId))
    }
}
