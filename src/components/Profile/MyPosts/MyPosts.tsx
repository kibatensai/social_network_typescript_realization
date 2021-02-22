import React, { memo } from 'react'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { Element } from '../../common/FormsControls/FormsControls'
import './MyPosts.css'
import { MyPostsConnectorPropsType } from './MyPostsContainer'
import Post from './Post/Post'

const MyPosts = memo(({postData, addPost}: MyPostsConnectorPropsType) => {
  let postsElements =
      postData.map( p => <Post key={p.id} postmsg={p.postmsg} likesCount={p.likesCount} />)

  let onAddPost = (values: any) => {
    addPost(values.newPostText)
  }

  return (
    <div className='posts_block'>
      <div>
        <h2>My post</h2>
          <AddNewPostFormRedux onSubmit={onAddPost} />
      </div>
      <div className='posts'>
        {postsElements}
      </div>
    </div>
  )
})

const maxLength10 =  maxLengthCreator(10)
const Textarea = Element('textarea')

const AddNewPostForm = (props: any) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} name={'newPostText'}
             validate={[required, maxLength10]}/>
      <button>Add post</button>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({form: 'newPostForm'})(AddNewPostForm)

export default MyPosts