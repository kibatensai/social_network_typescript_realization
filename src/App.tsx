import React, { FC } from 'react'
import './App.css';
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './redux/redux-store';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';

const App: FC<any> = ( props ) => {

  return (
    <BrowserRouter>
      <div className="app_wrapper">
        <Header />
        <Navigation />
        <div className='app_wrapper_content'>
          <Route path='/dialogs'>
            <DialogsContainer store={store}/>
          </Route>
          <Route path='/profile'>
            <Profile store={store}/>  
          </Route>
          <Route path='/users'>
            <UsersContainer store={store} />
          </Route>
          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/settings' component={Settings} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
