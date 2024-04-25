import React from 'react'
import { useState,useEffect } from 'react'
import { db } from '../firebase';

function CourseDetails() {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    duration: ''
    
  });
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add course data to Firestore
    db.collection('courses').add({
      name: courseData.name,
      description: courseData.description,
      duration: courseData.duration
    })
    .then(() => {
      console.log('Course data added successfully');
      // Clear the form after successful submission
      setCourseData({
        name: '',
        description: '',
        duration: ''
      });
    })
    .catch((error) => {
      console.error('Error adding course data: ', error);
      // You can add error handling here, such as displaying an error message to the user
    });
  };


  return (
    <div>
      course details
      <form action="" onSubmit={handleSubmit}>
      <label className='flex flex-col'>
        Course Name:
        <input type="text" placeholder="Name your course" name="name" value={courseData.name}  onChange={handleChange} className="input input-bordered w-full max-w-xs" required/>
      </label>
      <label className='flex flex-col'>
        Description:
        <textarea className="textarea textarea-bordered"  name="description" value={courseData.description} onChange={handleChange}   placeholder="Bio"   required></textarea>
      </label>
      <label className='flex flex-col'>
        Duration:
        <input type="text" placeholder="Type here" name="duration" value={courseData.duration} onChange={handleChange}  className="input input-bordered w-full max-w-xs"  required />
      </label>
      <button class="btn"type='submit'>Create course</button>
      </form>

      <h2>Display Data Here</h2>
      <h2>{courseData.name}</h2>
    </div>
  )
}

export default CourseDetails
