import React, { Dispatch } from 'react'
import MyPosts from './MyPosts'
import { addPostActionCreator } from '../../../redux/profile-reducer'
import { connect, ConnectedProps } from 'react-redux' 
import { AppStateType } from '../../../redux/redux-store'


const mapStateToProps = (state: AppStateType) => {
    return {
      postData: state.profilePage.postData
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
      addPost: (newPostText: string) => {
        dispatch(addPostActionCreator(newPostText))
      }

    }
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

export type MyPostsConnectorPropsType = ConnectedProps<typeof connector>

const MyPostsContainer = connector(MyPosts)

export default MyPostsContainer