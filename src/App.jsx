import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { initializeApp } from "./redux/app-reducer";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import { Preloader } from "./components/common/Preloader/Preloader";
import store from './redux/redux-store'

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
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
              <DialogsContainer />
            </Route>
            <Route path="/profile/:userId?">
              <ProfileContainer />
            </Route>
            <Route path="/users">
              <UsersContainer />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
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
  return <BrowserRouter>
  <Provider store={store}>
      <AppContainer />
  </Provider>
</BrowserRouter>
}

export default AppWrapper