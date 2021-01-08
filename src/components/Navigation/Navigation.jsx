import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className='app_nav'>
      <div className='nav_item'>
        <NavLink to='/profile'>Profile</NavLink>
      </div>
      <div className='nav_item'>
        <NavLink to='/dialogs'>Messages</NavLink>
      </div>
      <div className='nav_item'>
        <NavLink to='/news'>News</NavLink>
      </div>
      <div className='nav_item'>
        <NavLink to='/music'>Music</NavLink>
      </div>
      <div className='nav_item'>
        <NavLink to='/settings'>Settings</NavLink>
      </div>
    </nav>
  )
}

export default Navigation