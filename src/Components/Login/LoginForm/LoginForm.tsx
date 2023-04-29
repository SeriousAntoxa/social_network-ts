import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { requiredField } from "../../../utils/validators/validators"
import { Input, createField } from "../../common/FormControls/FormControls"
import s from "./../../common/FormControls/FormControls.module.css"
import { FC } from "react"

type PropsType = {
    captchaUrl: string | null
}

type LoginFormDataType = {
    login: string
    password: string
    remember: boolean
    captcha: string
}

type LoginFormDataKeysType = Extract<keyof LoginFormDataType, string>

let LoginForm: FC<
    InjectedFormProps<LoginFormDataType, PropsType> & PropsType
> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor="login">Login</label>
                    {createField<LoginFormDataKeysType>(
                        "login",
                        "login",
                        [requiredField],
                        Input
                    )}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    {createField<LoginFormDataKeysType>(
                        "password",
                        "password",
                        [requiredField],
                        Input
                    )}
                </div>
                <div>
                    <label htmlFor="remember">Remember me</label>
                    {createField<LoginFormDataKeysType>(
                        undefined,
                        "remember",
                        [requiredField],
                        Input,
                        { type: "checkbox" }
                    )}
                </div>
                {props.captchaUrl && (
                    <div className="">
                        <label htmlFor="remember">Please enter captcha</label>
                        <div>
                            <img src={props.captchaUrl} alt="captcha"></img>
                        </div>
                        {createField<LoginFormDataKeysType>(
                            undefined,
                            "captcha",
                            [requiredField],
                            Input,
                            { type: "checkbox" }
                        )}
                    </div>
                )}
                {props.error && (
                    <div className={s.form_error}>
                        <p>{props.error}</p>
                    </div>
                )}
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

let LoginFormRedux = reduxForm<LoginFormDataType, PropsType>({
    form: "login",
})(LoginForm)

export default LoginFormRedux
