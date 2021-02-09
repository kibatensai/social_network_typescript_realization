const SEND_MESSAGE = 'SEND-MESSAGE'

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = { 
    dialogData: [
        { id: 1, name: 'David' },
        { id: 2, name: 'Mitch' },
        { id: 3, name: 'Sodah' },
        { id: 4, name: 'Reckful' },
        { id: 5, name: 'Cdew' },
        { id: 6, name: 'Eslint' },
    ] as Array<DialogType>,
    messageData: [
        { id: 1, message: 'goodbye' },
        { id: 2, message: 'well, maybe yes' },
        { id: 3, message: 'you can ask me tomorrow' },
        { id: 4, message: 'im so hungry' },
        { id: 5, message: 'what about telling me whats going on' },
        { id: 6, message: 'dobroho ranku ot ukrainianku' },
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return { 
                ...state,
                messageData: [...state.messageData, {id: 6, message: body}]
            }
        default:
            return state
        }
}

type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}


export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorType => ({type: SEND_MESSAGE, newMessageBody})
export default dialogsReducer