import axiosCall from '../../api/axiosCall'

export const logInUser = user => async dispatch => {
  dispatch({
    type: 'LOGIN_USER',
    payload: user,
  })
}

export const logOutUser = () => async dispatch => {
  dispatch({
    type: 'LOGOUT_USER',
  })
}

export const updateUser = user => async dispatch => {
  dispatch({
    type: 'UPDATE_USER',
    payload: user,
  })
}
