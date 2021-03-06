import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const RestrictedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!user._id) {
          return <Component {...props} />
        } else {
          // no user found, redirect to /posts
          return (
            <Redirect
              to={{
                pathname: '/posts',
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      }}
    />
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(RestrictedRoute)
