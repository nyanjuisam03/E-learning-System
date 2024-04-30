import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db,auth } from '../firebase';
function Studenthome() {
  const [courses, setCourses] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email);
      }
    };


    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = [];
      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() });
      });
      setCourses(coursesData);
    };
    fetchUserEmail();
    fetchCourses();
  }, []);
  return (
    <div className='mx-12'>
    <h2>Welcome {userEmail}</h2> 
    <h3>Available Courses:</h3>
     <h2>Recent Course Additions: </h2>
        {courses.map((course) => (
          <div key={course.id} className="card w-72 bg-base-100 shadow-xl my-4 p-6 flex">
          <h2 className="card-title">{course.name}</h2>
          <p> {course.description}</p>
          <div className='justify-end'>
          <button className="btn btn-primary">Join Now</button>
          </div>
          </div>
        ))}
   
     
    </div>
  )
}

export default Studenthome
