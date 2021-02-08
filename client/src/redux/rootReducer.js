import { combineReducers } from 'redux'

import postsReducer from './reducers/posts.reducer'

const rootReducer = combineReducers({
  postsReducer,
})

export default rootReducer
