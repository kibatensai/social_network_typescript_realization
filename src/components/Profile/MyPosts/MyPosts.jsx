import React from 'react'
import './MyPosts.css'
import Post from './Post/Post'

const MyPosts = (props) => {
  let postsElements =
      props.postData.map( p => <Post key={p.id} message={p.postmsg} likeCount={p.likeCount} />)

  let newPostElement = React.createRef()

  let onAddPost = () => {
    props.addPost()
  }

  const onPostChange = () => {
    let text = newPostElement.current.value
    props.updateNewPostText(text)
  }

  return (
    <div className='posts_block'>
      <div>
        <h2>My post</h2>
          <div>
            <div>
            <textarea onChange={ onPostChange } 
                      ref={newPostElement}
                      value={props.newPostText}></textarea>
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