import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
function Studenthome() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = [];
      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() });
      });
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);
  return (
    <div className='mx-12'>
    <h2>Welcome student</h2> 
    <h3>Available Courses:</h3>
     
        {courses.map((course) => (
          <div key={course.id} className="card w-96 bg-base-100 shadow-xl my-4 p-6 flex">
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
