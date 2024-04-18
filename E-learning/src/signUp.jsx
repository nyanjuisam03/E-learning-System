import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const[role,setRole]=useState("student")


const handleEmail=(e)=>{
    setEmail(e.target.value)
}

const handlePassword = (e) =>{
    setPassword(e.target.value)}

 const handleRole=(e)=>{
        setRole(e.target.value)
    }

  return (
    <div>
       <div className='justify-center p-28'>
  <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label  className="label ">
          <span className="label-text text-xl">Sign Up</span>
          </label>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" 
          placeholder="Email" value={email} 
          onChange={handleEmail}
          className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="Password"
           className="input input-bordered"
           onChange={handlePassword} 
           required  value={password}/>
        </div>
        <div className="form-control mt-5">
        <select className="select select-bordered w-full max-w-xs" value={role} onChange={handleRole}>
            <option disabled selected>Which role are you?</option>
  <          option>Student</option>
            <option>Tutor</option>
        </select>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-accent text-white">Sign Up</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  )
}

export default SignUp
