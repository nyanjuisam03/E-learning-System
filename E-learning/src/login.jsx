import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate('/student')
    } catch (err) {
      console.log('Error:', err.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      navigate('/student')
    } catch (err) {
      console.log('Error:', err.message);
    }
  };

  return (
    <>
      <div className="justify-center p-28">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleEmailLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl">Sign In</span>
              </label>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover ">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent text-white">
                Login
              </button>
              <button type="button" className="btn btn-neutral text-white mt-5" onClick={googleLogin}>
                <FaGoogle /> Sign with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
