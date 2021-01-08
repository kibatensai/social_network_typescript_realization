import React from 'react'
import './Post.css'

const Post = (props) => {
  return (
    <div className='posts'>
      <div className='post-item'>
        <img src='https://i.pinimg.com/originals/ca/0e/b6/ca0eb690fd46ac38e4f26a53718d39bb.jpg'></img>
        {props.message}
        <div className ='like_item'>
          <input type='image' id='like_img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2fYWDbwgl4yhQiy2bqCfH21uWM2OGFxHtBA&usqp=CAU'></input>
          {props.likeCount}
        </div>
      </div>
    </div>

  )
}

export default Post