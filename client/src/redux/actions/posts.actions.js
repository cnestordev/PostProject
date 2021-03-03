import axios from 'axios'
import axiosCall from '../../api/axiosCall'

export const getPosts = () => async dispatch => {
  // console.log('GET POST ACTION DEPLOYED')
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

export const removePosts = () => async dispatch => {
  dispatch({
    type: 'REMOVE_POSTS',
  })
}

export const getFilteredPosts = data => async dispatch => {
  console.log('filter action deployed')
  dispatch({
    type: 'FILTER_POSTS',
    payload: data,
  })
}
