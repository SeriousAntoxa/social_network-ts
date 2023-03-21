const TOGGLE_IS_FETCHING = "socialNetwork/common/TOGGLE-IS-FETCHING"

let initialState = {
    isFetching: false as boolean,
}

type InitialStateType = typeof initialState

const commonReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        default: {
            return { ...state }
        }
    }
}

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export let toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching,
    }
}

export default commonReducer
