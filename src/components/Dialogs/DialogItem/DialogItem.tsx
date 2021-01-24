import React from 'react'
import './DialogItem.css'
import { NavLink } from 'react-router-dom'

type DialogItemType = {
    id: number
    name: string
}


const DialogItem = ({id, name}: DialogItemType) => {
    let path = '/dialogs/' + id

    return (
        <div className='dialog'>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}


export default DialogItem