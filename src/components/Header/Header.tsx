import {
   UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Col, Layout, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import './Header.css';

export const Header = (props: any) => {

   const dispatch = useDispatch()
   const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
   const login = useSelector<AppStateType, any>(state => state.auth.login)

   const { Header } = Layout

   const logoutCallback = () => {
      dispatch(logout())
   }

   return (
      <Header className="header">
         <Row>
            <Col span={18}></Col>
            {isAuth
               ?
               <>
                  <Col span={1}>
                     <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                  </Col>
                  <Col span={5}>
                     <Button onClick={logoutCallback}>Log Out</Button>
                  </Col>
               </>
               :
               <Col span={6}>
                  <Button>
                     <Link to={'/login'}>Login</Link>
                  </Button>
               </Col>
            }

         </Row>
      </Header>
   )
}

