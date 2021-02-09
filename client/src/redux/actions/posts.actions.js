import axios from 'axios'

// export const getPosts = () => {

//   return {
//     type: 'GET_POSTS',
//     payload: [1, 2, 3],
//   }
// }

export const getPosts = () => async dispatch => {
  console.log('GET POST ACTION DEPLOYED')
  try {
    const response = await axios.get('http://localhost:3001/posts')
    dispatch({
      type: 'GET_POSTS',
      payload: response.data.data,
    })
  } catch (err) {
    console.log(err)
  }
}
