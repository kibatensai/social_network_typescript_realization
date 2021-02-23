import React from 'react'
import { Redirect } from 'react-router-dom'
import './Header.css'

const Header = (props: any) => {
   return (<header className="app_header">
      header
      <div className='loginBlock'>
         {props.isAuth 
            ? <div>{props.login} - <button onClick={props.logout}>Log Out</button></div>
            : <Redirect to={'/login'}>Login</Redirect> }
      </div>
   </header>
   )
}

export default Header