import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import { useHistory } from 'react-router-dom'
import { logOutUser } from '../redux/actions/users.actions'
import Popup from './Popup'
import {popup_timer} from '../util/shared'

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

  // for all users
  const [deletingAll, setDeletingAll] = useState(false)
  const [buttonMessage, setButtonMessage] = useState('DELETE ALL USERS')

  const [confirm, setConfirming] = useState(false)

  // network errors
  const [error, setError] = useState(null)

  // seeding response
  const [seeding, setSeeding] = useState(false)

  const history = useHistory()

  // unmount popup after 5 seconds
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('')
      }, [popup_timer])
    }
  }, [error])

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

  const handleDeleteAllUsers = async () => {
    setDeleting(true)
    try {
      await axiosCall.delete(`/api/${user._id}/deleteAllUsers`)
      toggleConfirm(false)
      setError('All users have been deleted from the database.')
    } catch (err) {
      setDeleting(false)
      setError('something went wrong!')
    }
  }
  

  const toggleDelete = val => {
    setToDelete(val)
  }

  const toggleConfirm = val => {
    setConfirming(val)
  }

  const handleSeeds = async e => {
    e.preventDefault()
    const domain = prompt('sub to seed from?')
    setSeeding(true)
    try {
      await axiosCall.get(`/api/posts/admin/moderation/${domain}`)
      setError('Seeds loaded successfully')
    } catch (err) {
      console.dir(err)
      setError('something went wrong!')
    }
    setSeeding(false)
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
        {!confirm ? (
          <Button onClick={() => toggleConfirm(true)}>DELETE ALL USERS</Button>
        ) : (
          <>
            <P>Are you sure?</P>
            <Button theme={'cancel'} onClick={() => toggleConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteAllUsers}>
              {!deletingAll ? (
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
        {user.isAdmin && (
          <Button onClick={handleSeeds}>
            {seeding ? 'Seeding...' : 'Seed'}
          </Button>
        )}
      </Container>
    </Section>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, { logOutUser })(Account)
