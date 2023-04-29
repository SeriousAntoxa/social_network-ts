import { getAuthUserData } from "./auth-reducer"

const INITIALIZED_SUCCESS = "socialNetwork/app/INITIALIZED-SUCCESS"

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

type ActionsTypes = InitializedSuccessActionType

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default: {
            return { ...state }
        }
    }
}

export default appReducer

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS //typeof return "socialNetwork/app/INITIALIZED-SUCCESS"
}

export let initializedSuccess = (): InitializedSuccessActionType => {
    return {
        type: INITIALIZED_SUCCESS
    }
}

export const initialize = () => {
    return (dispatch: any): void => {
        let promise = dispatch(getAuthUserData())
        promise.then(() => {
            dispatch(initializedSuccess())
        })
    }
}
