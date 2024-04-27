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
          <li key={course.id}>
            <strong>{course.name}</strong> - {course.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Course
