import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function CourseDetails() {
  const [courseData, setCourseData] = useState({
    name: '',
    tutor:'',
    category:'',
    description: '',
    duration: ''
  });
const navigate=useNavigate()

  const getCurrentUserId = () => {
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      // User is not logged in
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = getCurrentUserId();
    if (!userId) {
      // Handle case where user is not logged in
      return;
    }

    try {
      const courseRef = collection(db, 'courses');
      const newCourse = {
        ...courseData,
        userId: userId,
      };
      const docRef = await addDoc(courseRef, newCourse);
      console.log('Course added successfully');

      // Redirect to a new page with the course ID in the URL
      navigate(`/tutor/${docRef.id}`);
    }catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div>
      <h1>Course Details</h1>
      <form onSubmit={handleSubmit}>
        <label className='flex flex-col'>
          Course Name:
          <input
            type="text"
            placeholder="Name your course"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className='flex flex-col'>
          Tutor Name:
          <input
            type="text"
            placeholder="Your Name"
            name="tutor"
            value={courseData.tutor}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className='flex flex-col'>
          Category:
          <input
            type="text"
            placeholder="Name your category"
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className='flex flex-col'>
          Description:
          <textarea
            placeholder="Bio"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <label className='flex flex-col'>
          Duration:
          <input
            type="text"
            placeholder="Type here"
            name="duration"
            value={courseData.duration}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </label>
        <button type="submit" className="btn btn-neutral">Create course</button>
      </form>
    </div>
  );
}

export default CourseDetails;
