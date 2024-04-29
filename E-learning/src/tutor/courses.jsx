import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const userId = auth.currentUser.uid;
  const navigate = useNavigate(); // Get the navigate function from React Router

  useEffect(() => {
    const fetchCourses = async () => {
      const q = query(collection(db, 'courses'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const coursesData = [];
      querySnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() });
      });
      setCourses(coursesData);
    };

    if (userId) {
      fetchCourses();
    }
  }, [userId]);

  const handleCourseClick = (courseId) => {
    navigate(`/tutor/${courseId}`); // Navigate to the course details page
  };

  return (
    <div>
      <h2>These are courses you created:</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id} onClick={() => handleCourseClick(course.id)}>
           
            <div key={course.id} className="card w-96 bg-base-100 shadow-xl my-4 p-6">
          <h2 className="card-title">{course.name}</h2>
          <p> {course.description}</p>
          <div className="card-actions justify-end">
          <button className="btn btn-primary "><Link to={`/tutor/${course.id}`}>Join Now  </Link></button>
    </div>
          </div>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
