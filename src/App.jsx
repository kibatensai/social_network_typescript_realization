import {
  LaptopOutlined,
  NotificationOutlined, UserOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { Component, lazy, Suspense } from "react";
import { connect, Provider } from "react-redux";
import {
  HashRouter,
  Link, Redirect, Route,
  Switch, withRouter
} from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import { Preloader } from "./components/common/Preloader/Preloader";
import { Login } from "./components/Login/Login";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import { UsersPage } from "./components/Users/UsersContainer";
import { initializeApp } from "./redux/app-reducer";
import store from "./redux/redux-store";
import { Header } from './components/Header/Header'


const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const DialogsContainer = lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const ChatPage = lazy(() => import("./pages/Chat/ChatPage"));

class App extends Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    console.log("REST query error");
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    } else {
      return (
        <Layout style={{minHeight:"100vh"}}>
        <Header />
          <Content style={{ padding: "50px 250px" }}>
            <Layout
              className="site-layout-background"
              style={{ padding: "24px 0" }}
            >
              <Sider className="site-layout-background" width={250}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%" }}
                >
                  <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                    <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/chat'>Chat</Link></Menu.Item>
                    <Menu.Item key="3"> <Link to='/dialogs'>Messages</Link></Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    icon={<LaptopOutlined />}
                    title="Users"
                  >
                    <Menu.Item key="5"><Link to='/users'>Users</Link></Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => <Redirect to={"/profile"} />}
                    />
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
                    <Route path="/chat">
                      <Suspense fallback={<Preloader />}>
                        <ChatPage />
                      </Suspense>
                    </Route>
                    <Route path="/news" component={News} />
                    <Route path="/music" component={Music} />
                    <Route path="/settings" component={Settings} />

                    <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                  </Switch>

              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Social Network ©2021 Created by David Pehshvelashvili
          </Footer>
        </Layout>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const AppWrapper = (props) => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};

export default AppWrapper;
