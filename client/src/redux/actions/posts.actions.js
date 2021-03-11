import axios from 'axios'
import axiosCall from '../../api/axiosCall'

export const getPosts = () => async dispatch => {
  try {
    const response = await axiosCall.get(`/api/posts`)
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
  dispatch({
    type: 'FILTER_POSTS',
    payload: data,
  })
}
