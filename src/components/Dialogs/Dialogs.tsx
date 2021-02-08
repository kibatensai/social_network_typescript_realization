import React from 'react'
import './Dialogs.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { DialogsConnectorPropsType } from './DialogsContainer'
import { Field, reduxForm } from 'redux-form'
import { Element } from '../common/FormsControls/FormsControls'
import { maxLengthCreator, required } from '../../utils/validators/validators'



const Dialogs = ({ dialogsPage, sendMessage }: DialogsConnectorPropsType) => {

    let dialogElements =
        dialogsPage.dialogData.map(i => <DialogItem key={i.id} name={i.name} id={i.id}/>)
    let messagesElements =
        dialogsPage.messageData.map(m => <Message key={m.id} message={m.message} id={m.id}/>)


    const addNewMessage = (values: any) => {
        sendMessage(values.newMessageBody)
    }
    
    return (
        <div className='dialogs'>
            <div className='dialogs-items'>
                {dialogElements}
            </div>
            <div className='messages'>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)
const Textarea = Element('textarea')

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea}
                   validate={ [required, maxLength50] } name='newMessageBody' placeholder='Enter your message' />
            <button>send</button>
        </form>
 )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs