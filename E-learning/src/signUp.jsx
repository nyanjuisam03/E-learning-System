import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase'; // Assuming db is your Firestore instance

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const SignUp = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      // Validate password before signing up
      if (password.length < 6 || !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        throw new Error('Password must be at least 6 characters long and contain a capital letter and a special character.');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigate('/student');
    } catch (err) {
      console.log(err);
      alert(err.message); // Show error message to the user
    }
  };

  return (
    <div>
      <div className='justify-center p-28'>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={SignUp}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl">Sign Up</span>
              </label>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                className="input input-bordered"
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
                onChange={handlePassword}
                required
                value={password}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent text-white" >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
