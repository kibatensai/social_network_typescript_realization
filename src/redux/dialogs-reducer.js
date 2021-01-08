const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = { 
    dialogData: [
        { id: 1, name: 'David' },
        { id: 2, name: 'Mitch' },
        { id: 3, name: 'Sodah' },
        { id: 4, name: 'Reckful' },
        { id: 5, name: 'Cdew' },
        { id: 6, name: 'Eslint' },
    ],
    messageData: [
        { id: 1, message: 'goodbye' },
        { id: 2, message: 'well, maybe yes' },
        { id: 3, message: 'you can ask me tomorrow' },
        { id: 4, message: 'im so hungry' },
        { id: 5, message: 'what about telling me whats going on' },
        { id: 6, message: 'dobroho ranku ot ukrainianku' },
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return { 
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody
            return { 
                ...state,
                newMessageBody: '',
                messageData: [...state.messageData, {id: 6, message: body}]
            }
        default:
            return state
        }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body})

export default dialogsReducer