import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({
  component: Component,
  user,
  dark,
  toggler,
  ...rest
}) => {
  return (
    <Route
      dark={dark}
      toggler={toggler}
      {...rest}
      render={props => {
        if (user._id || user.id) {
          return <Component dark={dark} toggler={toggler} {...props} />
        } else {
          // No user found, redirect to login
          return (
            <Redirect
              to={{
                pathname: '/login',
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

export default connect(mapStateToProps, null)(PrivateRoute)
