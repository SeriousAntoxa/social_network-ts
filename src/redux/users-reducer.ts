import { ToggleIsFetchingActionType, toggleIsFetching } from "./common-reducer"
import { usersAPI } from "./../api/api"
import { PhotosType } from "./profile-reducer"
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "./redux-store"

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

const usersReducer = (state = initialState, action: UsersActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW': {
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
        case 'UNFOLLOW': {
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
        case 'SET_USERS': {
            return {
                ...state,
                users: action.users,
            }
        }
        case 'SET_TOTAL_ITEMS_COUNT': {
            return {
                ...state,
                totalItemsCount: action.totalItemsCount,
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage,
            }
        }
        case 'SET_COUNT_ITEMS_PER_PAGE': {
            return {
                ...state,
                countItemsPerPage: action.countItemsPerPage,
            }
        }
        case 'TOGGLE_IS_FOLLOWING': {
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

type UsersActionsTypes = InferActionsTypes<typeof usersActions>

export const usersActions = {
    setFollow: (userId: number) => {
        return {
            type: 'FOLLOW',
            userId: userId,
        } as const
    },
    setUnfollow: (userId: number) => {
        return {
            type: 'UNFOLLOW',
            userId: userId,
        } as const
    },
    setUsers: (users: Array<UserType>) => {
        return {
            type: 'SET_USERS',
            users,
        } as const
    },

    setTotalItemsCount: (totalItemsCount: number) => {
        return {
            type: 'SET_TOTAL_ITEMS_COUNT',
            totalItemsCount,
        } as const
    },

    setCurrentPage: (currentPage: number) => {
        return {
            type: 'SET_CURRENT_PAGE',
            currentPage,
        } as const
    },

    setCountItemsPerPage: (countItemsPerPage: number) => {
        return {
            type: 'SET_COUNT_ITEMS_PER_PAGE',
            countItemsPerPage,
        } as const
    },

    toggleIsFollowing: (isFetching: boolean, userId: number) => {
        return {
            type: 'TOGGLE_IS_FOLLOWING',
            isFetching,
            userId,
        } as const
    }
}




type ThunkActionType = ThunkAction<Promise<any>, AppStateType, unknown, UsersActionsTypes | ToggleIsFetchingActionType>
//ThunkCreator
export const requestUsers = (countItemsPerPage: number, page: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(usersActions.setCurrentPage(page))
        dispatch(usersActions.setCountItemsPerPage(countItemsPerPage))
        let response = await usersAPI.getUsers(countItemsPerPage, page)
        dispatch(usersActions.setUsers(response.data.items))
        dispatch(usersActions.setTotalItemsCount(response.data.totalCount))
        dispatch(toggleIsFetching(false))
    }
}

export const follow = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(usersActions.toggleIsFollowing(true, userId))
        let response = await usersAPI.followUsers(userId)

        if (response.data.resultCode === 0) {
            dispatch(usersActions.setFollow(userId))
        }

        dispatch(usersActions.toggleIsFollowing(false, userId))
    }
}

export const unfollow = (userId: number): ThunkActionType => {
    return async (dispatch) => {
        dispatch(usersActions.toggleIsFollowing(true, userId))
        let response = await usersAPI.unfollowUsers(userId)

        if (response.data.resultCode === 0) {
            dispatch(usersActions.setUnfollow(userId))
        }

        dispatch(usersActions.toggleIsFollowing(false, userId))
    }
}
