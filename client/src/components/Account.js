import React from 'react'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'

const Account = ({ user }) => {
  const handleAcctDelete = async () => {
    const response = await axiosCall.delete(`/${user._id}/delete`)
    console.log(response.data)
  }

  return (
    <div className="accountContainer">
      <h2 className="accountHeader">Welcome, {user.username}</h2>
      <button onClick={handleAcctDelete}>DELETE ACCOUNT</button>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(Account)
