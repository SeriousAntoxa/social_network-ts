import { FC } from "react"
import s from "./Message.module.css"
import { MessageType } from "../../../redux/dialogs-reducer"

type PropsType = {
    messageData: MessageType
}

const Message: FC<PropsType> = (props) => {
    return (
        <div
            className={`${s.message} ${
                !props.messageData.who ? s.myMessage : s.otherMessage
            }`}
        >
            {props.messageData.message}
        </div>
    )
}

export default Message
