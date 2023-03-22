import { AppStateType } from "../redux/redux-store"

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getTotalItemsCount = (state: AppStateType) => {
    return state.usersPage.totalItemsCount
}

export const getCountItemsPerPage = (state: AppStateType) => {
    return state.usersPage.countItemsPerPage
}

export const getIsFollowing = (state: AppStateType) => {
    return state.usersPage.isFollowing
}

export const getPortionSize = (state: AppStateType) => {
    return state.usersPage.portionSize
}
