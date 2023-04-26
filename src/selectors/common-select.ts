import { AppStateType } from "../redux/redux-store"

export const getIsFetching = (state: AppStateType) => {
    return state.common.isFetching
}
