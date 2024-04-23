import React from 'react'
import { Link } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import { MdAddToPhotos } from "react-icons/md";
function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl"><Link to={'/student'}>E-learning</Link></a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
    <div className="dropdown">
  <div tabIndex={0} ><MdAddToPhotos className='text-2xl my-2 mx-12'/></div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a><Link to={'/student-join'}>Join a course</Link> </a></li>
    <li><a><Link to={'/tutor-add'}> Create a course</Link></a></li>
  </ul>
   </div>
      <li className='mx-3'>
        <details>
          <summary>
            <RxAvatar className='text-2xl'/>
          </summary>
          <ul className="p-2 bg-base-100 rounded-t-none ">
            <li><a>Profile</a></li>
            <li><a><Link to={'/student-settings'}>Settings</Link></a></li>
            <li><a>Logout</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
    </div>
  )
}

export default Navbar
