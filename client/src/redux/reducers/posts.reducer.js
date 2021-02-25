const initialState = {
  posts: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      // console.log('GET POSTS REDUCER DEPLOYED')
      return {
        ...state,
        posts: action.payload,
      }

    case 'REMOVE_POSTS':
      // console.log('emptying out all posts')
      return initialState
    default:
      // console.log('DEFAULT REDUCER DEPLOYED')
      return state
  }
}

export default reducer
