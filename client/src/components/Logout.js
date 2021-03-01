import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import { logOutUser } from '../redux/actions/users.actions'

const Logout = props => {
  const history = useHistory()

  const prevPage = props.location.state
    ? props.location.state.from.pathname
    : '/posts'

  useEffect(async () => {
    try {
      await axiosCall.get('/logout')
      props.logOutUser()
      props.toggler(false)
      history.push(prevPage)
    } catch (err) {
      console.log('error logging out user')
    }
  }, [])

  return <></>
}

export default connect(null, { logOutUser })(Logout)
