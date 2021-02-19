import React from 'react'
import { Link } from 'react-router-dom'

const LoginPrompt = () => {
  return (
    <div className="loginPromptContainer">
      <h3 className="loginPromptHeader">
        You must be logged in to post a comment
      </h3>
      <div className="loginPromptLinkContainer">
        <Link className="loginPromptLink" to="/login">
          Login
        </Link>
        <Link className="loginPromptLink" to="/register">
          Register
        </Link>
      </div>
    </div>
  )
}

export default LoginPrompt
