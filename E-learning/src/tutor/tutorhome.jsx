import React, { useEffect, useState } from 'react';
import { FaBook } from "react-icons/fa";
import { PiStudentLight } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai"; 
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';

function Tutorhome() {
  const { courseId } = useParams(); // Get the courseId parameter from the URL
  const [courseName, setCourseName] = useState('');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        const courseDoc = await getDoc(doc(db, 'courses', courseId)); // Fetch the course document
        if (courseDoc.exists()) {
          setCourseName(courseDoc.data().name); // Set the courseName state to the name of the course
          setTopics(courseDoc.data().topics || []); // Set the topics state to the topics array in the course document
        } else {
          console.error('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourseName();
  }, [courseId]);

  const handleAddTopic = async () => {
    try {
      const topicName = `Topic ${topics.length + 1}`;
      await updateDoc(doc(db, 'courses', courseId), {
        topics: arrayUnion(topicName), // Add the new topic to the topics array in the course document
      });
      setTopics([...topics, topicName]); // Update the topics state with the new topic
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  };

  const handleDeleteTopic = async (topicName) => {
    try {
      await updateDoc(doc(db, 'courses', courseId), {
        topics: arrayRemove(topicName), // Remove the topic from the topics array in the course document
      });
      setTopics(topics.filter(topic => topic !== topicName)); // Update the topics state to remove the deleted topic
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  return (
    <div className='flex'>
      <div className='h-100%'>
        <div className="flex flex-col h-full p-3 w-60 dark:bg-gray-200 dark:text-gray-800  bg-red-300">
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
      
      <div className="card  bg-base-100 shadow-xl mx-6 p-12 flex flex-col ">
        <h2>Course Name: {courseName}</h2>
        <div>
          <button className='bg-sky-500/75 p-2' onClick={handleAddTopic}>Add Topic</button>
          <ul>
            {topics.map((topic, index) => (
              <details key={index} className="collapse bg-base-200 my-2">
                <summary className="collapse-title text-xl font-medium">{topic}</summary>
                <div className="collapse-content"> 
                  <p>content</p>
                  <button onClick={() => handleDeleteTopic(topic)} className="p-2 bg-red-700/70">Delete</button>
                </div>
              </details>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tutorhome;
