import { connect } from "react-redux"
import LoginFormRedux from "./LoginForm/LoginForm"
import { login } from "../../redux/auth-reducer"
import { Navigate } from "react-router-dom"
import { AppStateType } from "../../redux/redux-store"
import { FC } from "react"

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

type LoginFormDataType = {
    login: string
    password: string
    remember: boolean
    captcha: string
}

let Login: FC<PropsType> = (props) => {

    const onSubmit = (formData: LoginFormDataType): void => {
        props.login(formData.login, formData.password, formData.remember, formData.captcha)
    }
    if (props.isAuth) return <Navigate to="/profile" replace />
    return (
        <div>
            <h1>Login page</h1>
            <LoginFormRedux onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, any, AppStateType>(mapStateToProps, { login })(Login)
