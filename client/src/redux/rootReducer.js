import { combineReducers } from 'redux'

import postsReducer from './reducers/posts.reducer'
import usersReducer from './reducers/users.reducer'

const rootReducer = combineReducers({
  postsReducer,
  usersReducer,
})

export default rootReducer
