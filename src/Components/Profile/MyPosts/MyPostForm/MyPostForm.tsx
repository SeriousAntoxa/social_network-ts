import { Field, InjectedFormProps, reduxForm } from "redux-form"
import s from "./../MyPosts.module.css"
import { maxLengthCreator } from "../../../../utils/validators/validators"
import { Textarea, createField } from "../../../common/FormControls/FormControls"
import { FC } from "react"

const maxLength20 = maxLengthCreator(20)

type MyPostFormDataType = {
    newPost: string
}
type PropsType = {}

let MyPostForm: FC<InjectedFormProps<MyPostFormDataType, PropsType> & PropsType> = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit} className={s.myPost_form}>
                <div className={s.form_field}>
                    <label htmlFor="newPost">New post</label>
                    {createField(undefined,"newPost",[maxLength20],Textarea)}
                </div>
                <div>
                    <button type="submit" className={s.form_btn}>Submit</button>
                </div>
            </form>
        </div>
    )
}

let MyPostFormRedux = reduxForm<MyPostFormDataType, PropsType>({
    form: "myPost",
})(MyPostForm)

export default MyPostFormRedux
