import React from 'react'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'

import {
  Header,
  Container,
  ThemeContainer,
  IconBox,
  Icon,
  Button,
  AdminFlair,
} from '../styles/account'

const Account = ({ user, dark, toggler }) => {
  const handleAcctDelete = async () => {
    const response = await axiosCall.delete(`/${user._id}/delete`)
    // console.log(response.data)
  }

  return (
    <Container dark={dark}>
      <Header dark={dark}>Hello, {user.username}</Header>
      {user.isAdmin && <AdminFlair dark={dark}>Admin</AdminFlair>}
      <ThemeContainer>
        <IconBox dark={dark} onClick={() => toggler(false)}>
          <Icon className="fas fa-sun"></Icon>
        </IconBox>
        <IconBox dark={dark} onClick={() => toggler(true)}>
          <Icon className="fas fa-moon"></Icon>
        </IconBox>
      </ThemeContainer>
      <Button onClick={handleAcctDelete}>DELETE ACCOUNT</Button>
    </Container>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(Account)
