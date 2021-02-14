import axios from 'axios'
import axiosCall from '../../api/axiosCall'

// export const getPosts = () => {

//   return {
//     type: 'GET_POSTS',
//     payload: [1, 2, 3],
//   }
// }

export const getPosts = () => async dispatch => {
  console.log('GET POST ACTION DEPLOYED')
  try {
    const response = await axiosCall.get(`/posts`)
    dispatch({
      type: 'GET_POSTS',
      payload: response.data.data,
    })
  } catch (err) {
    console.log(err)
  }
}
