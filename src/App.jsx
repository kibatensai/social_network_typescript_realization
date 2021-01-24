import React from 'react'
import './App.css';
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { BrowserRouter, Route } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

const App = () => {

  return (
    <BrowserRouter>
      <div className="app_wrapper">
        <Header />
        <Navigation />
        <div className='app_wrapper_content'>
          <Route path='/dialogs'>
            <DialogsContainer />
          </Route>
          <Route path='/profile'>
            <ProfileContainer />  
          </Route>
          <Route path='/users'>
            <UsersContainer  />
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
