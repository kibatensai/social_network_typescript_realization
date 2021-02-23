import { ProfileType } from "../types/types";
import profileReducer, { addPostActionCreator, deletePost, PostDataType } from "./profile-reducer";

let state = {
    postData: [
        { id: 1, postmsg: 'Its my first post', likesCount: 10 },
        { id: 2, postmsg: 'Its my second post', likesCount: 15 },
        { id: 3, postmsg: 'Its my third post', likesCount: 7 },
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: ''
}


it('new post should be added', () => {

    const action = addPostActionCreator('test text')
   
    
    const newState = profileReducer(state, action)


    expect(newState.postData.length).toBe(4)
})

it('message of post should be correct', () => {

    const action = addPostActionCreator('test text')
   
    
    const newState = profileReducer(state, action)


    expect(newState.postData[3].postmsg).toBe('test text')
})

it('decrementing length of messages through deleting', () => {

    const action = deletePost(1)
   
    
    const newState = profileReducer(state, action)


    expect(newState.postData.length).toBe(2)
})

it('length shouldnt be decremented if id is incorrect', () => {

    const action = deletePost(1000)
   
    
    const newState = profileReducer(state, action)


    expect(newState.postData.length).toBe(3)
})