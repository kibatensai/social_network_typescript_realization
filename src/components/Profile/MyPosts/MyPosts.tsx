import React from 'react'
import './MyPosts.css'
import { MyPostsConnectorPropsType } from './MyPostsContainer'
import Post from './Post/Post'

const MyPosts = ({postData, newPostText, addPost, updateNewPostText}: MyPostsConnectorPropsType) => {
  let postsElements =
      postData.map( p => <Post key={p.id} postmsg={p.postmsg} likesCount={p.likesCount} />)

  let newPostElement = React.createRef<HTMLTextAreaElement>()

  let onAddPost = () => {
    addPost()
  }

  const onPostChange = () => {
    let text = newPostElement.current!.value
    updateNewPostText(text)
  }

  return (
    <div className='posts_block'>
      <div>
        <h2>My post</h2>
          <div>
            <div>
            <textarea onChange={ onPostChange } 
                      ref={newPostElement}
                      value={newPostText}></textarea>
            </div>
            <div>
            <button onClick={ onAddPost }>Add post</button>
            </div> 
        </div>
      </div>
      <div className='posts'>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts