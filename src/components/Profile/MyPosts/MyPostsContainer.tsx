import React, { Dispatch } from 'react'
import MyPosts from './MyPosts'
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer'
import { connect, ConnectedProps } from 'react-redux' 
import { AppStateType } from '../../../redux/redux-store'


const mapStateToProps = (state: AppStateType) => {
    return {
      postData: state.profilePage.postData,
      newPostText: state.profilePage.newPostText 
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
      updateNewPostText: (text: string) => {
        dispatch(updateNewPostTextActionCreator(text))
      },
      addPost: () => {
        dispatch(addPostActionCreator())
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