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
        <div>
          <button className="btn btn-outline btn-success" onClick={() => document.getElementById('my_modal_1').showModal()}>Add a topic</button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3>Topic 1</h3>
              <h3 className="font-bold text-lg">Write a summary of the skill</h3>
              <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea>
              
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <button className="btn btn-outline btn-error">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Tutorhome;
