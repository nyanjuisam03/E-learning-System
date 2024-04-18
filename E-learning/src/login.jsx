import React from 'react'
import { useState } from 'react'
import { GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword } from 'firebase/auth'
import { FaGoogle } from "react-icons/fa";
import { auth } from './firebase'
function Login() {
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
  
    const googleProvider=new GoogleAuthProvider()
    const googleLogin=async()=>{
        try{
            const results=await signInWithPopup(auth,googleProvider)
            alert("user logged")
        }
        catch(err){
console.log("error")
        }
    }
  return (
    <>
    <div className='justify-center p-28'>
  <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label  className="label ">
          <span className="label-text text-xl">Sign In</span>
          </label>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="Password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover ">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-accent text-white">Login</button>
          <button className="btn btn-neutral text-white mt-5 " onClick={googleLogin} > <FaGoogle /> Sign with Google</button>
        </div>
      </form>
      
    </div>
    </div>
    </>
  )
}

export default Login
