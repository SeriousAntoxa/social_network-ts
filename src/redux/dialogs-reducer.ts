const SEND_MESSAGE = "socialNetwork/dialogs/SEND-MESSAGE"

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
    who: number
}

export type InitialStateType = typeof initialState

let initialState = {
    dialogs: [
        { id: 1, name: "Valera" },
        { id: 2, name: "Nikita" },
        { id: 3, name: "Elena" },
        { id: 4, name: "Maria" },
        { id: 5, name: "Andrei" },
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: "Hello", who: 0 },
        { id: 1, message: "Hy", who: 1 },
        { id: 2, message: "Why are you?", who: 0 },
        { id: 3, message: "Thanks, and you?", who: 1 },
        { id: 3, message: "I'am finny!)", who: 0 },
        { id: 3, message: "Where are you from?", who: 0 },
    ] as Array<MessageType>,
}

type ActionsTypes = SendMessageActionType

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let messageData = {
                id: 5,
                message: action.newMessage,
                who: 1,
            }
            return {
                ...state,
                messages: [...state.messages, messageData],
            }
        }

        default:
            return { ...state }
    }
}

type SendMessageActionType = {
    type: typeof SEND_MESSAGE
    newMessage: string
}

export let sendMessage = (newMessage: string): SendMessageActionType => ({ type: SEND_MESSAGE, newMessage })

export default dialogsReducer
