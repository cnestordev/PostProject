export const getPosts = () => {
  console.log('GET POST ACTION DEPLOYED')
  return {
    type: 'GET_POSTS',
    payload: [1, 2, 3],
  }
}
