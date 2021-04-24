import React, { Component, lazy, Suspense } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { HashRouter, BrowserRouter, Route, withRouter } from "react-router-dom";
import { UsersPage } from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { Login } from "./components/Login/Login";
import { initializeApp } from "./redux/app-reducer";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import { Preloader } from "./components/common/Preloader/Preloader";
import store from './redux/redux-store'
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = lazy(() => import('./pages/Chat/ChatPage'))

class App extends Component {

  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    console.log('REST query error')
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    } else {
      return <BrowserRouter>
        <div className="app_wrapper">
          <HeaderContainer />
          <Navigation />
          <div className="app_wrapper_content">
            <Route path="/dialogs">
              <Suspense fallback={<Preloader />}>
                <DialogsContainer />
              </Suspense>
            </Route>
            <Route path="/profile/:userId?">
              <Suspense fallback={<Preloader />}>
                <ProfileContainer />
              </Suspense>
            </Route>
            <Route path="/users">
              <UsersPage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
            <Route path='/chat'>
              <Suspense fallback={<Preloader />}>
                <ChatPage />
              </Suspense>
            </Route>
          </div>
        </div>
      </BrowserRouter>;
    }
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const AppWrapper = (props) => {
  return <HashRouter>
  <Provider store={store}>
      <AppContainer />
  </Provider>
</HashRouter>
}

export default AppWrapper