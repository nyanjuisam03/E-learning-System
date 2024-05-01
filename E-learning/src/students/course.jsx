import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Course() {
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
    <div>
    <h2>Which course do you want to join </h2>
    <ul>
        {courses.map((course) => (
          <div key={course.id} className="card w-80 bg-base-100 shadow-xl my-4 p-6">
          <h2 className="card-title">{course.name}</h2>
          <p> {course.description}</p>
        
      <button className="btn btn-outline btn-success my-4">Join Now</button>

  
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Course
