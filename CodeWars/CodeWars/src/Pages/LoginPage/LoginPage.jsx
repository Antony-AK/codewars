import React from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='login'>
      <Link to={'/rules'}><button>Next</button></Link>
    </div>
  )
}

export default LoginPage