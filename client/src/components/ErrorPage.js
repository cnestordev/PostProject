import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = ({ status, message }) => {
  return (
    <div className="errorContainer">
      <h1 className="errorIcon">
        <i class="fas fa-exclamation-circle"></i>
      </h1>
      <h2 className="errorHeader">Something Went Wrong!</h2>
      <h3 className="errorStatus">Error {status}</h3>
      <p className="errorMessage">{message}</p>
      <Link to="/posts">
        <button className="errorBtn">Go Back</button>
      </Link>
    </div>
  )
}

export default ErrorPage
