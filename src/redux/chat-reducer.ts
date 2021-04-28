import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { chatAPI, ChatMessageType } from "../api/chat-api";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
  messages: [] as ChatMessageType[],
};

const chatReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "sn/chat/MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: "sn/chat/MESSAGES_RECEIVED",
      payload: { messages },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
   return _newMessageHandler
}

export const startMessagesListening = (): ThunkAction<
  void,
  AppStateType,
  unknown,
  ActionsType
> => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
};

export const stopMessagesListening = (): ThunkAction<
  void,
  AppStateType,
  unknown,
  ActionsType
> => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
};

export const sendMessage = (message: string): ThunkAction<
  void,
  AppStateType,
  unknown,
  ActionsType
> => async (dispatch) => {
    chatAPI.sendMessage(message)
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

export default chatReducer
