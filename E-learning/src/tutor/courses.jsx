import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { FaBook } from "react-icons/fa";
import { PiStudentLight } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai"; 
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [userName, setUserName] = useState('');
  const userId = auth.currentUser.uid;
  const navigate = useNavigate(); // Get the navigate function from React Router

  useEffect(() => {
    const fetchUserName = async () => {
      const q = query(collection(db, 'courses'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const userData = querySnapshot.docs[0].data();
        setUserName(userData.tutor); // Set the userName state to the user's name from the first course
      }
    };

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
      fetchUserName();
      fetchCourses();
    }
  }, [userId]);

  const handleCourseClick = (courseId) => {
    navigate(`/tutor/${courseId}`); // Navigate to the course details page
  };

  return (
    <div className='flex'>
<div className='h-screen'>
<div className="flex flex-col h-full p-3 w-60 dark:bg-gray-200 dark:text-gray-800  ">
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h2>Dashboard</h2>
		</div>

		<div className="flex-1">
			<ul className="pt-2 pb-4 space-y-1 text-sm">
				<li className="rounded-sm">
					<a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
          <AiOutlineHome className='text-xl' />
						<span>Home</span>
					</a>
				</li>
				<li className="rounded-sm">
					<a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
          <FaBook className='text-xl'/>
          <span>Courses</span>
					</a>
				</li>
				<li className="rounded-sm">
					<a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
          <PiStudentLight className='text-xl' />
						<span>Students</span>
					</a>
				</li>
			</ul>
		</div>
	</div>

</div>
</div>

<div className='mx-7'>
<h2>Welcome back, {userName}</h2>
<h3>These are courses you created:</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id} onClick={() => handleCourseClick(course.id)}>
           
            <div key={course.id} className="card w-96 bg-base-100 shadow-xl my-4 p-6">
          <h2 className="card-title">{course.name}</h2>
          <p> {course.description}</p>
          </div>
           
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Courses;
