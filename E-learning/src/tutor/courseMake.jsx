import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const CourseMake = () => {
  return (
    <div>
      <h2>Start creating your course today</h2>
    <Link to={'/tutor-create'}> <button className="btn btn-accent text-white">Start creating the cousre</button></Link> 
    </div>
  )
}

export default CourseMake
