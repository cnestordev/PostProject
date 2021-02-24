import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const LoginPrompt = () => {
  const location = useLocation()

  return (
    <div className="loginPromptContainer">
      <h3 className="loginPromptHeader">
        You must be logged in to post a comment
      </h3>
      <div className="loginPromptLinkContainer">
        <Link
          className="loginPromptLink"
          to={{
            pathname: '/login',
            state: { from: { pathname: location.pathname } },
          }}
        >
          Login
        </Link>
        <Link
          className="loginPromptLink"
          to={{
            pathname: '/register',
            state: { from: { pathname: location.pathname } },
          }}
        >
          Register
        </Link>
      </div>
    </div>
  )
}

export default LoginPrompt
