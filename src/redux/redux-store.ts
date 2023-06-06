import { applyMiddleware, combineReducers, createStore, compose, Action } from "redux"
import { reducer as formReducer } from "redux-form"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reducer"
import usersReducer from "./users-reducer"
import commonReducer from "./common-reducer"
import authReducer from "./auth-reducer"
import appReducer from "./app-reducer"
import thunk, { ThunkAction } from "redux-thunk"

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    common: commonReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any)=>any}> = ReturnType<PropertiesType<T>>

export type BaseThunkType<AT extends Action, RT = Promise<any>> = ThunkAction<RT, AppStateType, unknown, AT>

type ReducersType = typeof reducers
export type AppStateType = ReturnType<ReducersType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

//@ts-ignore
window._store_ = store

export default store