import React, { ChangeEvent, useEffect, useState } from 'react'

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatus = ({ status, updateStatus }: ProfileStatusType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(status)

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(inputValue)
    }

    useEffect(() => {
        setInputValue(status)
    }, [status])

    return (
        <div>
            {
                !editMode
                    ? <div>
                        <span onDoubleClick={activateEditMode}>
                            <b>Status</b>: {status || 'Im an empty status'}
                        </span>
                    </div>
                    : <div>
                        <input autoFocus
                            value={inputValue}
                            onChange={onInputChangeHandler}
                            onBlur={deactivateEditMode} />
                    </div>
            }
        </div>

    )
}