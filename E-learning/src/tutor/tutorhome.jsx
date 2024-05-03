import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Tutorhome() {
  const { courseId } = useParams(); // Get the courseId parameter from the URL
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        const courseDoc = await getDoc(doc(db, 'courses', courseId)); // Fetch the course document
        if (courseDoc.exists()) {
          setCourseName(courseDoc.data().name); // Set the courseName state to the name of the course
        } else {
          console.error('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourseName();
  }, [courseId]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Handle file upload logic here
    console.log('Uploaded file:', file);
  };

  return (
    <div>
      <h2>Welcome Back Tutor</h2>
      <div className="card w-96 bg-base-100 shadow-xl mx-6 p-12 flex">
        <h2>Course Name: {courseName}</h2>
       </div>
    </div>
  );
}

export default Tutorhome;
