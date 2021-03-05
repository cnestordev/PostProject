import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axiosCall from '../api/axiosCall'
import { useHistory } from 'react-router-dom'
import { logOutUser } from '../redux/actions/users.actions'

import Loader from 'react-loader-spinner'

import {
  Header,
  Container,
  ThemeContainer,
  IconBox,
  Icon,
  Button,
  AdminFlair,
  P,
} from '../styles/account'

import { Section } from '../styles'

const Account = ({ user, dark, toggler, logOutUser }) => {
  const [toDelete, setToDelete] = useState(false)

  const [deleting, setDeleting] = useState(false)

  const history = useHistory()

  const handleAcctDelete = async () => {
    setDeleting(true)
    const response = await axiosCall.delete(`/${user._id}/delete`)
    logOutUser()
    history.push('/posts')
    // console.log(response.data)
  }

  const toggleDelete = val => {
    setToDelete(val)
  }

  return (
    <Section>
      <Container dark={dark}>
        <Header dark={dark}>Hello, {user.username}</Header>
        {user.isAdmin && <AdminFlair dark={dark}>Admin</AdminFlair>}
        <div>
          <Link to="/account/posts">My Posts</Link>
          <Link to="/account/comments">My Comments</Link>
        </div>
        <ThemeContainer dark={dark}>
          <IconBox dark={dark} onClick={() => toggler(false)}>
            <Icon className="fas fa-lightbulb"></Icon>
          </IconBox>
          <IconBox dark={dark} onClick={() => toggler(true)}>
            <Icon className="fas fa-moon"></Icon>
          </IconBox>
        </ThemeContainer>
        {!toDelete ? (
          <Button onClick={() => toggleDelete(true)}>DELETE ACCOUNT</Button>
        ) : (
          <>
            <P>Are you sure?</P>
            <Button theme={'cancel'} onClick={() => toggleDelete(false)}>
              Cancel
            </Button>
            <Button onClick={handleAcctDelete}>
              {!deleting ? (
                'Confirm Deletion'
              ) : (
                <Loader
                  type="ThreeDots"
                  color="#f43636"
                  height={11}
                  width={100}
                  timeout={5000} //5 secs
                />
              )}
            </Button>
          </>
        )}
      </Container>
    </Section>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, { logOutUser })(Account)
