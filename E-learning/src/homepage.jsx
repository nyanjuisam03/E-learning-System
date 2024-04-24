import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
      <h2>Join the e-portal</h2>
   <Link to={'/login'}><button className="btn btn-outline">Default</button></Link>
    </div>
  )
}

export default Homepage
