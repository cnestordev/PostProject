import React from 'react'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'

import { Header, Container } from '../styles/account'

const Account = ({ user }) => {
  const handleAcctDelete = async () => {
    const response = await axiosCall.delete(`/${user._id}/delete`)
    console.log(response.data)
  }

  return (
    <Container>
      <Header>Welcome, {user.username}</Header>
      <button onClick={handleAcctDelete}>DELETE ACCOUNT</button>
    </Container>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(Account)
