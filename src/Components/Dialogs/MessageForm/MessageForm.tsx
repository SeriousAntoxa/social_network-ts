import { Field, InjectedFormProps, reduxForm } from "redux-form"
import s from "./../Dialogs.module.css"
import { maxLengthCreator } from "../../../utils/validators/validators"
import { Textarea, createField } from "../../common/FormControls/FormControls"
import { FC } from "react"

const maxLength20 = maxLengthCreator(20)

type MessageFormDataType = {
    newMessage: string
}
type PropsType = {}

let MessageForm: FC<InjectedFormProps<MessageFormDataType, PropsType> & PropsType> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit} className={s.messages_form}>
                <div className={s.form_field}>
                    <label htmlFor="newMessage">New message</label>
                    {createField(undefined,"newMessage",[maxLength20],Textarea)}
                </div>
                <div>
                    <button type="submit" className={s.form_btn}>Submit</button>
                </div>
            </form>
        </div>
    )
}

let MessageFormReact = reduxForm<MessageFormDataType, PropsType>({
    form: "message",
})(MessageForm)

export default MessageFormReact
