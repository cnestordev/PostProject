import axiosCall from '../../api/axiosCall'

export const logInUser = user => async dispatch => {
  console.log('LOGIN USER ACTION DEPLOAYED')
  dispatch({
    type: 'LOGIN_USER',
    payload: user,
  })
}
