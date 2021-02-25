import axiosCall from '../../api/axiosCall'

export const logInUser = user => async dispatch => {
  // console.log('LOGIN USER ACTION DEPLOAYED')
  dispatch({
    type: 'LOGIN_USER',
    payload: user,
  })
}

export const logOutUser = () => async dispatch => {
  // console.log('LOGOUT USER ACTION DEPLOYED')
  dispatch({
    type: 'LOGOUT_USER',
    payload: {},
  })
}
