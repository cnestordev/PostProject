import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <header>
      <nav className="navbarContainer">
        <ul className="navbarList">
          <li>
            <Link to="/" className="navbarItem">
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className="navbarItem">
              Posts
            </Link>
          </li>
          <li>
            <Link to="/posts/new" className="navbarItem">
              +
            </Link>
          </li>
          <li>
            <Link to="/user/new" className="navbarItem">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavigationBar
