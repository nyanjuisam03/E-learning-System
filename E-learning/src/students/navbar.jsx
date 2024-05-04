import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import { MdAddToPhotos } from 'react-icons/md';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  const handleBeforeUnload = () => {
    if (isLoggedIn) {
      auth.signOut();
    }
  };

  if (!isLoggedIn && location.pathname === '/student') {
    navigate('/');
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <Link to={isLoggedIn ? '/student' : '/'}>E-learning</Link>
          </a>
        </div>
        {isLoggedIn && (
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <div className="dropdown">
                <div tabIndex={0}>
                  <MdAddToPhotos className="text-2xl my-2 mx-12" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>
                      <Link to={'/student-join'}>Join a course</Link>
                    </a>
                  </li>
                  <li>
                    <a>
                      <Link to={'/tutor-add'}> Create a course</Link>
                    </a>
                  </li>
                </ul>
              </div>
              <li className="mx-3">
              <details className="dropdown">
  <summary className="m-1 btn">
    <RxAvatar className="text-2xl" />
  </summary>
  <ul className="p-3 bg-base-100 rounded-t-none z-[1]">
    <li>
      <a>Profile</a>
    </li>
    <li>
      <Link to={'/tutor-course'}>
        <a>Course</a>
      </Link>
    </li>
    <li>
      <a>
        <Link to={'/student-settings'}>Settings</Link>
      </a>
    </li>
    <li onClick={handleLogout}>
      <a>Logout</a>
    </li>
  </ul>
</details>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
