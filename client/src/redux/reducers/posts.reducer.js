const initialState = {
  posts: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return {
        ...state,
        posts: action.payload,
      }

    case 'FILTER_POSTS':
      return {
        posts: action.payload,
      }

    case 'REMOVE_POSTS':
      return initialState
    default:
      return state
  }
}

export default reducer
