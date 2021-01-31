import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = (props: any) => {
   return (<header className="app_header">
      header
      <div className='loginBlock'>
         {props.isAuth ? props.login
            : <NavLink to={'/login'}>Login</NavLink> }
      </div>
   </header>
   )
}

export default Header