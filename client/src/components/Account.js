import React, { useState } from 'react'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import { useHistory } from 'react-router-dom'
import { logOutUser } from '../redux/actions/users.actions'
import Popup from './Popup'

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
  LinksContainer,
  PostLink,
} from '../styles/account'

import { Section } from '../styles'

const Account = ({ user, dark, toggler, logOutUser, errorMsg }) => {
  // toggles the confirmation message for deleting
  const [toDelete, setToDelete] = useState(false)

  const [deleting, setDeleting] = useState(false)

  // network errors
  const [error, setError] = useState(null)

  const history = useHistory()

  const handleAcctDelete = async () => {
    setDeleting(true)
    try {
      await axiosCall.delete(`/api/${user._id}/delete`)
      logOutUser()
      history.push('/posts')
    } catch (err) {
      setDeleting(false)
      setError('something went wrong!')
    }
  }

  const toggleDelete = val => {
    setToDelete(val)
  }

  return (
    <Section>
      {error && <Popup message={error} />}
      <Container dark={dark}>
        <Header dark={dark}>Hello, {user.username}</Header>
        {user.isAdmin && <AdminFlair dark={dark}>Admin</AdminFlair>}
        <LinksContainer>
          <PostLink dark={dark} to="/account/posts">
            My Posts
          </PostLink>
          <PostLink dark={dark} to="/account/comments">
            My Comments
          </PostLink>
        </LinksContainer>
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
            {/* {error && (
              <p
                style={{ color: '#ff2c2c', fontSize: '2rem', marginTop: '2%' }}
              >
                {error}
              </p>
            )} */}
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
