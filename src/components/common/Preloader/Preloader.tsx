import React from 'react'
import preloader from '../../../assets/images/snpreloader.svg'

export const Preloader = () => {
    return <div>
        <img src={preloader} alt='Loading...'/>
    </div>
}